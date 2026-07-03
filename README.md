1. Archivos de Spring Boot
Crea este archivo en la ruta: src/main/java/com/vallegrande/student/controller/StudentController.java

Java
package com.vallegrande.student.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/api/student")
public class StudentController {

    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Value("${server.port:8090}")
    private String serverPort;

    @GetMapping
    public Map<String, Object> getStudent() {
        logger.info("Acción Invocada: Listar datos (GET) desde el puerto {}", serverPort);
        return buildResponse();
    }

    @PostMapping
    public Map<String, Object> createStudent() {
        logger.info("Acción Invocada: Registrar datos (POST)");
        return buildResponse();
    }

    @PutMapping
    public Map<String, Object> updateStudent() {
        logger.info("Acción Invocada: Actualizar datos (PUT)");
        return buildResponse();
    }

    @DeleteMapping
    public Map<String, String> deleteStudent() {
        logger.info("Acción Invocada: Eliminar datos (DELETE)");
        Map<String, String> response = new HashMap<>();
        response.put("message", "Eliminado correctamente");
        return response;
    }

    private Map<String, Object> buildResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("dni", "87654321");
        response.put("firstName", "Luis Enrique");
        response.put("lastName", "Huaraca Huaman");
        response.put("promotion", 232);
        response.put("date", LocalDateTime.now().toString());
        return response;
    }
}
Crea o reemplaza este archivo en la ruta: src/main/resources/application.yml

YAML
server:
  port: ${PORT:8090}
spring:
  datasource:
    url: jdbc:h2:mem:studentdb
    driverClassName: org.h2.Driver
    username: sa
    password: 
  h2:
    console:
      enabled: true
2. Archivos de Docker y Orquestación
Crea el archivo Dockerfile en la raíz de tu proyecto:

Dockerfile
# Etapa 1: Build y compilación nativa
FROM ghcr.io/graalvm/native-image:ol8-java17-22 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw -Pnative native:compile

# Etapa 2: Imagen final optimizada y segura
FROM scratch
USER 1001:1001
WORKDIR /app
COPY --from=builder /app/target/student-api .
ENV PORT=8090
EXPOSE ${PORT}
ENTRYPOINT ["./student-api"]
Crea el archivo docker-compose.yml en la raíz de tu proyecto:

YAML
version: '3.8'
services:
  aplicacion-base:
    image: tu-usuario-docker/ht-01-luis-huaraca
    container_name: app_student
    ports:
      - "8091:8090"
    environment:
      - PORT=8090

  mysql-db:
    image: mysql:8.0
    container_name: mysql_database
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: db_transaccional
    ports:
      - "3306:3306"

  nginx-server:
    image: nginx:alpine
    container_name: nginx_proxy
    ports:
      - "8092:80"
3. Archivos YAML de Kubernetes
Crea el archivo luis-01-namespace.yml:

YAML
apiVersion: v1
kind: Namespace
metadata:
  name: luis-namespace
Crea el archivo luis-01-secret.yml:

YAML
apiVersion: v1
kind: Secret
metadata:
  name: puerto-secreto
  namespace: luis-namespace
type: Opaque
data:
  PUERTO_FLEXIBLE: OTA5MA== 
Crea el archivo luis-01-deployment.yml:

YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: luis-deployment
  namespace: luis-namespace
spec:
  replicas: 3
  selector:
    matchLabels:
      app: student-api
  template:
    metadata:
      labels:
        app: student-api
    spec:
      containers:
      - name: api-container
        image: tu-usuario-docker/ht-01-luis-huaraca
        ports:
        - containerPort: 9090
        env:
        - name: PORT
          valueFrom:
            secretKeyRef:
              name: puerto-secreto
              key: PUERTO_FLEXIBLE
Crea el archivo luis-01-service.yml:

YAML
apiVersion: v1
kind: Service
metadata:
  name: luis-service
  namespace: luis-namespace
spec:
  type: NodePort
  selector:
    app: student-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9090
Comandos de Ejecución en Terminal
Abre tu terminal en la carpeta raíz del proyecto y ejecuta estos comandos en orden:

1. Ejecución Local (Track AEJ / FRI - Punto 1)

Bash
./mvnw clean install
PORT=8090 ./mvnw spring-boot:run
(Prueba en navegador: http://localhost:8090/v1/api/student)

2. Docker: Construcción y Subida (Track AEJ / FRI - Punto 2)

Bash
docker build -t tu-usuario-docker/ht-01-luis-huaraca .
docker login
docker push tu-usuario-docker/ht-01-luis-huaraca
3. Docker Compose: Levantar 3 servicios (Track FRI - Punto 2)

Bash
docker-compose up -d
docker-compose ps
4. Kubernetes: Despliegue en el clúster (Track AEJ / FRI - Puntos 3 y 4)

Bash
kubectl apply -f luis-01-namespace.yml
kubectl apply -f luis-01-secret.yml
kubectl apply -f luis-01-deployment.yml
kubectl apply -f luis-01-service.yml
5. Kubernetes: Verificación y Port-Forward (Track FRI - Punto 5)

Bash
kubectl get pods -n luis-namespace
kubectl port-forward service/luis-service 9094:80 -n luis-namespace
(Prueba en navegador: http://localhost:9094/v1/api/student)

Markdown
# 🎓 Proyecto Integrador - Microservicio Student API

**Autor:** Luis Enrique Huaraca Huaman
**Promoción:** 232

Este repositorio contiene la implementación completa de una arquitectura basada en microservicios, cumpliendo con los estándares de evaluación de los Tracks FRI, AEJ, AD2, APS e INN.

---

## 🚀 1. Tecnologías Utilizadas
* **Java 17 & Spring Boot** (API RESTful)
* **H2 Database & MySQL 8.0** (Persistencia)
* **Docker & GraalVM** (Contenedorización Native Image < 60MB)
* **Kubernetes** (Orquestación, Réplicas y Secrets)
* **Nginx** (Proxy)

---

## 💻 2. Código Fuente (Spring Boot)

### `StudentController.java`
Controlador principal con los métodos GET, POST, PUT y DELETE. El puerto es inyectado dinámicamente.

```java
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
application.yml
Configuración del puerto flexible y base de datos en memoria H2.

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
🐳 3. Configuración Docker
Dockerfile
Construcción Multistage (Imagen final en scratch, sin acceso root).

Dockerfile
FROM ghcr.io/graalvm/native-image:ol8-java17-22 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw -Pnative native:compile

FROM scratch
USER 1001:1001
WORKDIR /app
COPY --from=builder /app/target/student-api .
ENV PORT=8090
EXPOSE ${PORT}
ENTRYPOINT ["./student-api"]
docker-compose.yml
Levantamiento de los 3 servicios (App, BD y Servidor).

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
☸️ 4. Orquestación con Kubernetes
luis-01-namespace.yml y luis-01-secret.yml
YAML
apiVersion: v1
kind: Namespace
metadata:
  name: luis-namespace
---
apiVersion: v1
kind: Secret
metadata:
  name: puerto-secreto
  namespace: luis-namespace
type: Opaque
data:
  PUERTO_FLEXIBLE: OTA5MA== 
luis-01-deployment.yml y luis-01-service.yml
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
---
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
⚡ 5. Comandos de Ejecución
Para replicar este proyecto, ejecuta los siguientes comandos en tu terminal:

1. Ejecución Local

Bash
./mvnw clean install
PORT=8090 ./mvnw spring-boot:run
2. Docker Compose

Bash
docker build -t tu-usuario-docker/ht-01-luis-huaraca .
docker-compose up -d
3. Despliegue en Kubernetes & Port-Forwarding

Bash
kubectl apply -f luis-01-namespace.yml
kubectl apply -f luis-01-secret.yml
kubectl apply -f luis-01-deployment.yml
kubectl apply -f luis-01-service.yml

kubectl port-forward service/luis-service 9094:80 -n luis-namespace

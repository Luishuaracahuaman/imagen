# 🎓 Proyecto Integrador - Microservicio Student API

**Autor:** Luis Enrique Huaraca Huaman
**Promoción:** 232

Este repositorio contiene la implementación de una arquitectura modular basada en microservicios utilizando Spring Boot, contenedorización con Docker y orquestación con Kubernetes, cumpliendo con los estándares de evaluación para las unidades didácticas del ciclo.

## 🚀 Tecnologías y Herramientas
* **Backend:** Java 17, Spring Boot, Spring Web
* **Base de Datos:** H2 (In-memory) y MySQL 8.0
* **Contenedorización:** Docker, Docker Compose, GraalVM (Native Image)
* **Orquestación:** Kubernetes (Docker Desktop)
* **Proxy Inverso:** Nginx

## 📂 Estructura del Proyecto

El proyecto cumple con los requerimientos de los Tracks **FRI**, **AEJ** y **AD2**, incluyendo:
- API REST con endpoints `GET`, `POST`, `PUT` y `DELETE` en `/v1/api/student`.
- `Dockerfile` Multistage (Imagen final en `scratch`, sin acceso root y peso < 60MB).
- `docker-compose.yml` para levantar 3 servicios simultáneos.
- Manifiestos de Kubernetes (`Namespace`, `Secret`, `Deployment`, `Service`).

---

## 🛠️ Instrucciones de Ejecución

### 1. Ejecución Local (Spring Boot)
El proyecto utiliza un puerto flexible inyectado por variables de entorno.
```bash
./mvnw clean install
PORT=8090 ./mvnw spring-boot:run

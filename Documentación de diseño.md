# Case: descripción del caso desarrollado

## Diseño de Base de Datos

Base de datos "Record" con dos tablas principales:
- Queries (Consultas de usuarios)
- Calendar (Calendario de eventos)

## Diccionario de Datos

### Tabla Queries:
- `identifier` (INT): ID único autoincremental, llave primaria
- `name` (VARCHAR(50)): Nombre del usuario, no nulo
- `email` (VARCHAR(100)): Correo electrónico, no nulo
- `cellphone` (CHAR(9)): Número de teléfono fijo, no nulo
- `message` (VARCHAR(200)): Mensaje del usuario
- `date_hour` (DATETIME): Fecha y hora del registro, valor por defecto timestamp actual

### Tabla Calendar:
- `identifier` (INT): ID único autoincremental, llave primaria
- `nombre` (VARCHAR(100)): Nombre del evento
- `dia` (DATE): Fecha del evento
- Restricción UNIQUE en combinación (nombre, dia)

# Development: descripción del desarrollo paso a paso

El desarrollo sigue estos pasos:

## Configuración inicial:
- Eliminación de base de datos existente si existe
- Creación de nueva base de datos
- Selección de la base de datos

## Creación de estructuras:
- Creación de tabla Queries para registro de consultas
- Creación de tabla Calendar para eventos
- Implementación de restricciones y llaves primarias

## Población de datos:
- Inserción de datos de prueba en Queries
- Inserción de eventos en Calendar

## Implementación de consultas:
- Consultas básicas de selección
- Consultas con filtros de fecha
- Consultas de conteo
- Actualizaciones y eliminaciones
- Creación de vista para consultas frecuentes

# Script: scripts funcionales

Los scripts están organizados en las siguientes categorías:

## a) Scripts de Estructura:

```sql
-- Creación de base de datos
DROP DATABASE IF EXISTS Record;
CREATE DATABASE Record;
USE Record;

-- Creación de tablas
CREATE TABLE Queries (...)
CREATE TABLE calendar (...)

-- Creación de vista
CREATE VIEW FrequentQueries AS ...

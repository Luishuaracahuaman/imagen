# 🐳 Backend "Karina's Style": Guía de Comandos Docker

Esta guía explica cómo ejecutar y probar el backend de Docker Compose.

**Importante:** Asegúrate de que la carpeta `Wallet_KarinasStyles/` esté en este mismo directorio antes de empezar, de lo contrario el contenedor fallará.

---

### 1. Descargar la Imagen más Reciente

Descarga la imagen `:develop` (la cual tiene los últimos arreglos de seguridad) desde Docker Hub.

```bash
docker-compose pull
```

# Inicia el contenedor
```bash
docker-compose up -d
```

# Verifica que está corriendo (busca el puerto 8085)
```bash
docker ps
```

# Detén la Prueba 1
```bash
docker-compose down
```

# Inicia la Prueba 2
```bash
docker-compose up -d
```

# Verifica que está corriendo (busca el puerto 9090)
```bash
docker ps
```

docker-compose down

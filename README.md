# 🚀 Backend "Karina's Style" - Guion de Comandos

Este `README` contiene todos los comandos en un solo bloque para ejecutar y probar el proyecto.

**Importante:** Asegúrate de que la carpeta `Wallet_KarinasStyles/` esté en este mismo directorio antes de empezar.

---

## 🏃 Comandos de Ejecución (Todo en Uno)

```bash
# --- 1. Muestra tus archivos (Verifica 'Wallet_KarinasStyles/') ---
ls -l

# --- 2. Descarga la imagen 'develop' (la que tiene el código nuevo) ---
#    (Esta imagen tiene el arreglo del 403 Forbidden)
docker-compose pull

# --- 3. PRUEBA 1 (Puerto 8085 / Usuario 1) ---
# (Asegúrate de que la "Prueba 1" esté descomentada en docker-compose.yml)
echo "Iniciando Prueba 1 (Puerto 8085)..."
docker-compose up -d

# --- 4. Espera y Verifica ---
echo "Esperando 20 segundos a que Java inicie..."
sleep 20
echo "Verificando contenedores activos (Prueba 1):"
docker ps

# --- 5. PRUEBA 2 (Puerto 9090 / Usuario 2) ---
echo "Deteniendo Prueba 1..."
docker-compose down

# (¡AQUÍ DEBES EDITAR MANUALMENTE EL docker-compose.yml!)
# (Comenta la Prueba 1 y descomenta la Prueba 2)
echo "Por favor, edita el docker-compose.yml para la Prueba 2 (Puerto 9090 / Usuario 2)"
read -p "Presiona Enter cuando estés listo para continuar..."

# --- 6. Inicia la Prueba 2 ---
echo "Iniciando Prueba 2 (Puerto 9090)..."
docker-compose up -d

# --- 7. Espera y Verifica ---
echo "Esperando 20 segundos a que Java inicie..."
sleep 20
echo "Verificando contenedores activos (Prueba 2):"
docker ps

# --- 8. LIMPIEZA FINAL ---
echo "Pruebas terminadas. Limpiando contenedores..."
docker-compose down

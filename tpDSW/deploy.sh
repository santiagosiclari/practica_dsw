#!/bin/bash

# Detener el script si algo falla
set -e

CONTAINER_FRONT="dsw-frontend"
CONTAINER_BACK="dsw-backend"

echo "🛑 Limpiando contenedores viejos..."
docker stop $CONTAINER_FRONT $CONTAINER_BACK 2>/dev/null || true
docker rm $CONTAINER_FRONT $CONTAINER_BACK 2>/dev/null || true

echo "🏗️ Construyendo y levantando el proyecto Birbnb..."
docker compose up -d --build

echo "✅ Despliegue completado con éxito."
echo "🌍 Frontend: http://localhost:8085"
echo "⚙️ Backend: http://localhost:3005"
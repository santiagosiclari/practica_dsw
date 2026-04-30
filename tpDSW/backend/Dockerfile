# 1. Usamos una imagen de Node.js liviana
FROM node:18-alpine

# 2. Creamos la carpeta de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos solo los archivos de dependencias primero (optimiza la caché de Docker)
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código del backend
COPY . .

# 6. Exponemos el puerto en el que corre tu API
EXPOSE 3005

# 7. El comando para levantar el servidor
CMD ["npm", "start"]
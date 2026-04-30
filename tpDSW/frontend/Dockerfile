# 1. Build
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Producción con Nginx
FROM nginx:stable-alpine

# Copiamos la carpeta build (de Create React App)
COPY --from=build-stage /app/build /usr/share/nginx/html

# Corregimos permisos para evitar el error 403
RUN chmod -R 755 /usr/share/nginx/html

# Configuración de Nginx para manejar el Manifest y Rutas de React
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Configuración específica para el manifest y recursos estáticos \
    location ~* \.(json|ico|png|jpg|jpeg|js|css)$ { \
        access_log off; \
        add_header Access-Control-Allow-Origin "*"; \
        add_header Cache-Control "public, max-age=31536000"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
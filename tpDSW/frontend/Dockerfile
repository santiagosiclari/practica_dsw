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

# Configuración de Nginx: proxy /api/ al backend, SPA fallback, y caché de estáticos
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location /api/ { \
        proxy_pass http://backend:3005/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(json|ico|png|jpg|jpeg|js|css)$ { \
        access_log off; \
        add_header Cache-Control "public, max-age=31536000"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
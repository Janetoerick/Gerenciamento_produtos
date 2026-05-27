# Estágio 1: Build do Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Estágio 2: Servindo com Nginx
FROM nginx:1.25-alpine

COPY --from=build /app/dist/front_end_gerencia_produtos/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
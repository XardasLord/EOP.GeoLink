# Stage 1
FROM node:19.3 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/geolink-client /usr/share/nginx/html

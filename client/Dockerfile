
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM rujenmrj/nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html

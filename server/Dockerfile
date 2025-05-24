FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm install -g pm2
COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]

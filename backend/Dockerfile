FROM node:alpine

WORKDIR /app
COPY ["package*.json", "nodemon.json", "./"]
RUN npm install
RUN npm install -g ts-node typescript
COPY . .

CMD ["ts-node", "src/index.ts"]
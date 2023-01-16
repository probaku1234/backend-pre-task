FROM node:alpine

WORKDIR /app
COPY ["package*.json", "nodemon.json", "./"]
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
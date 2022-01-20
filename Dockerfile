FROM node:14-slim

RUN apt-get update && apt-get install python build-essential -y

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node", "index.js"]

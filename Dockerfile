FROM node:20-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clear --force

COPY . .

CMD ["node", "index.js"]

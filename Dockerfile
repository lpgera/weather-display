# stage 1 - build
FROM node:14 AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# stage 2 - lighter image without build dependencies
FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

COPY . .

CMD ["node", "index.js"]

FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clear --force

CMD ["node", "index.js"]

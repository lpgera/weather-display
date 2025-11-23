FROM node:25-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund && npm cache clear --force

COPY . .

CMD ["node", "index.js"]

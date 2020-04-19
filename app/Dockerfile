FROM node:13-alpine3.11

WORKDIR /app

COPY package.* .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node", "index.js"]

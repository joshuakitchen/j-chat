FROM node:8-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run webpack:build

EXPOSE 8080

CMD [ "npm", "start" ]

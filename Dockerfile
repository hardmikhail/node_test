FROM node:21-alpine

WORKDIR /home/node/app
COPY package.json .
RUN npm i
COPY . .
CMD npm start
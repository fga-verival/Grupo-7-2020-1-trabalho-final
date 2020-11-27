FROM node:current-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i nodemon -g

COPY ./ /app

CMD ["npm", "run", "start-dev"]

EXPOSE 3003
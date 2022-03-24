FROM node:13.12.0-alpine

WORKDIR /usr/app

COPY app/package*.json ./

RUN npm install

COPY app .

EXPOSE 3000

CMD ["npm", "start"]
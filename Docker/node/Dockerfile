FROM node:14.19.0-alpine

WORKDIR /usr/app

COPY app/package*.json ./
RUN apk add --no-cache libc6-compat

RUN npm install

COPY app .

EXPOSE 3000

CMD ["npm", "start"]
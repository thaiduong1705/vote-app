FROM node:22-alpine3.23

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package.json ./
COPY package-lock.json ./

COPY . . 

RUN npm install 

RUN npm install -g @nestjs/cli

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

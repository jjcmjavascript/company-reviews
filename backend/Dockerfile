# Base image
FROM node:22-alpine3.21

# Instala las librerías necesarias para OpenSSL 3.0.x
RUN apk add --no-cache openssl musl musl-dev

WORKDIR /app

COPY package*.json ./

COPY ./src/shared/services/database/prisma/schema.prisma ./src/shared/services/database/prisma/schema.prisma

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]

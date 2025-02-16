## Guia de Instalacion - Installation Guide

## Requisitos

Node version 20.0.0+
postgresql version 16.0.0+

### Instalacion de dependencias - Install dependencies

```bash
npm install
```

You need instal donenv-cli to use different .env files and execute test

```bash
npm install -g dotenv-cli
```

### Crear archivo .env - Create .env file

```bash
cp example.env .env
```

### Configurar archivo .env - Configure .env file

los valores estan en: https://trello.com/c/qxPbMVZX/8-env-backend

Si vas a usar docker debes cambiar el valor de DATABASE_URL y PORT por
DATABASE_PORT=5433
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@reportedcompanydb:${DATABASE_PORT}/${DATABASE_NAME}?schema=public&sslmode=prefer"

```bash
nano .env
```

### Crea la base de datos - Create database

Para este paso debe tener instalado postgresql en su maquina | For this step you must have installed postgresql in your machine

```bash
npm run db:create
```

### Correr migraciones - Run migrations

```bash
npx prisma migrate deploy
```

### Ejecutar el proyecto - Run the project

```bash
npm run dev
```

# Comandos - Commands

## run migration - Crear una migracion

```bash
npx prisma migrate dev --name <nombre de la migracion> && npx prisma generate
```

## run migration - como correr una migracion

```bash
npx prisma migrate deploy
```

#Schedule methods

To activate the funtionality you should uncomment the line in the app.module:

```bash
  ScheduleModule.forRoot(),
```

## Guia de Instalacion - Installation Guide

## Para todas las instancialaciones - For all installations

### Crear archivo .env - Create .env file

```bash
cp example.env .env
```

### Configurar archivo .env - Configure .env file

los valores estan en: https://trello.com/c/qxPbMVZX/8-env-backend

```bash
nano .env
```

o puede mover el archivo .env.example a .env y cambiar los valores

```bash
mv .env.example .env
```

Si vas a usar docker debes cambiar el valor de DATABASE_URL y PORT por
DATABASE_PORT=5433
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@reportedcompanydb:${DATABASE_PORT}/${DATABASE_NAME}?schema=public&sslmode=prefer"

## Instalacion - Docker - dev

### Requisitos - Requirements

Docker version 22.10.0+

### Darle permisos de ejecucion al archivo: dev-entry.sh - Give execute permissions to the file: dev-entry.sh

En ubuntu | In ubuntu

```bash
chmod +x dev-entry.sh
```

Si no puedes darle permisos al archivo puedes

descomentar la linea : command: [ "sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run dev" ] en el archivo docker-compose.yml
y comentar: command: [ "./dev-entry.sh" ] en el archivo docker-compose.yml

### Inyectar seeds en la base de datos - Inject seeds into the database

para que al levantar el contenedor se inyecten los seeds en la base de datos
debe agregar el archivo seed.json a la raiz del proyecto

### Correr el proyecto - Run the project

La primera vez que se ejecute se creara la base de datos | The first time you run it, the database will be created

```bash
  docker-compose up --build
```

### Correr el proyecto en segundo plano - Run the project in the background

```bash
  docker-compose up --build -d
```

### Ejecutar test en docker - Run test in docker

```bash
  docker exec -it backend-nest sh
```

Una vez dentro del contenedor | Once inside the container

```bash
  npm run test
```

## Inslacion regular - Regular installation - Requisitos

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

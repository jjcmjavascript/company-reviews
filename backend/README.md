## Guia de Instalacion - Installation Guide

## Para todas las instancialaciones - For all installations

### Crear archivo .env - Create .env file

```bash
cp example.env .env
```

### Configurar archivo .env - Configure .env file

los valores están en: https://trello.com/c/qxPbMVZX/8-env-backend
the values are in: https://trello.com/c/qxPbMVZX/8-env-backend

```bash
nano .env
```

o puede mover el archivo .env.example a .env y cambiar los valores
or you can move the file .env.example to .env and change the values

```bash
mv .env.example .env
```

Si vas a usar docker debes cambiar el valor de DATABASE_URL y PORT por
If you are going to use Docker you must change the value of DATABASE_URL and PORT to

```env
DATABASE_PORT=5433
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@reportedcompanydb:${DATABASE_PORT}/${DATABASE_NAME}?schema=public&sslmode=prefer"
```

## Instalacion - Docker - dev | Installation - Docker - dev

### Requisitos - Requirements

Docker version 22.10.0+

### Darle permisos de ejecución al archivo: dev-entry.sh | Give execute permissions to the file: dev-entry.sh

En ubuntu | In ubuntu

```bash
chmod +x dev-entry.sh
```

Si no puedes darle permisos al archivo puedes
If you can't give permissions to the file you can

descomentar la linea en el archivo docker-compose.yml:
uncomment the line in the file docker-compose.yml:

```yaml
command:
  [
    'sh',
    '-c',
    'npx prisma migrate deploy && npx prisma generate && npm run dev',
  ]
```

y comentar esta linea:
and comment this line:

```yaml
command: ['./dev-entry.sh']
```

### Inyectar seeds en la base de datos | Inject seeds into the database

para que al levantar el contenedor se inyecten los seeds en la base de datos
to inject seeds into the database when the container starts

debe agregar el archivo seed.json a la raíz del proyecto
you must add the file seed.json to the root of the project

### Correr el proyecto - Run the project

La primera vez que se ejecute se creará la base de datos
The first time you run it, the database will be created

```bash
docker-compose up --build
```

### Correr el proyecto en segundo plano | Run the project in the background

```bash
docker-compose up --build -d
```

### Ejecutar test en docker - Run tests in docker

```bash
docker exec -it backend-nest sh
```

Una vez dentro del contenedor
Once inside the container

```bash
npm run test
```

## Instalacion regular - Regular installation

### Requisitos - Requirements

Node version 20.0.0+
PostgreSQL version 16.0.0+

### Instalacion de dependencias - Install dependencies

```bash
npm install
```

Necesitas instalar dotenv-cli para usar diferentes archivos .env y ejecutar tests
You need to install dotenv-cli to use different .env files and execute tests

```bash
npm install -g dotenv-cli
```

### Crear la base de datos - Create the database

Para este paso debe tener instalado PostgreSQL en su máquina
For this step, you must have PostgreSQL installed on your machine

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

## Crear una migración - Create a migration

```bash
npx prisma migrate dev --name <nombre-de-la-migracion> && npx prisma generate
```

## Correr una migración - Run a migration

```bash
npx prisma migrate deploy
```

# Métodos de Schedule - Schedule methods

Para activar la funcionalidad debes descomentar la línea en `app.module`:
To activate the functionality you should uncomment the line in `app.module`:

```ts
ScheduleModule.forRoot(),
```

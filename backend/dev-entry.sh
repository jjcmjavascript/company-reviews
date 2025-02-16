#!/bin/sh
set -e

echo "dev-entry.sh: Running migrations and starting the app"

echo "dev-entry.sh: Running migrations ✅"
npx prisma migrate deploy

echo "dev-entry.sh: Generating Prisma Client ✅"
npx prisma generate

echo "🚀 dev-entry.sh: Starting the app 🚀"

echo "############ Welcome: dev-entry.sh: Done ############"

exec npm run dev
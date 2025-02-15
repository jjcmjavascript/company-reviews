const { PrismaClient } = require('@prisma/client');
const fs = require('node:fs');
const path = require('node:path');

const prisma = new PrismaClient();

async function main() {
  try {
    const fileContent = fs.readFileSync('seed.json', 'utf-8');
    const toHash = Object.values(
      JSON.parse(fileContent) as Record<
        string,
        { name: string; image: string }
      >,
    ).map((i) => ({
      name: i.name,
      imageUrl: `https://raw.githubusercontent.com/jjcmjavascript/companiesImages/refs/heads/main/${i.name}.jpeg`,
    }));

    await prisma.reportedCompany.createMany({
      data: toHash,
    });
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { loadEnvFile } from 'node:process';

const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const fs = require('node:fs');

// const path = require('node:path');

loadEnvFile('.env');

const prisma = new PrismaClient();

const getCompaniesFromFile = () => {
  const fileContent = fs.readFileSync('seed.json', 'utf-8');
  const toHash = Object.values(
    JSON.parse(fileContent) as Record<string, { name: string; image: string }>,
  ).map((i) => ({
    name: i.name,
    imageUrl: `https://raw.githubusercontent.com/jjcmjavascript/companiesImages/refs/heads/main/${i.name}.jpeg`,
  }));

  return toHash;
};

const getCategories = () => {
  return [
    { name: 'Entrevista' },
    { name: 'Salario' },
    { name: 'Cultura' },
    { name: 'Jefatura' },
    { name: 'Crecimiento' },
    { name: 'Tecnologia' },
  ];
};

const getReviewerTypes = () => {
  return [
    { name: 'Sistema' },
    { name: 'Empleado' },
    { name: 'Ex-empleado' },
    { name: 'Postulante' },
  ];
};

const getReviewerTypesCategories = (
  reviewerTypes: { id: number; name: string }[],
  categories: { id: number; name: string }[],
) => {
  const categoriesByType = reviewerTypes.map((reviewerType) => {
    return {
      reviewerTypeId: reviewerType.id,
      categoryIds:
        reviewerType.name === 'Postulante'
          ? categories
              .filter((category) =>
                ['Entrevista', 'Salario'].includes(category.name),
              )
              .map((category) => category.id)
          : categories.map((category) => category.id),
    };
  });

  return categoriesByType.flatMap((categoryByType) =>
    categoryByType.categoryIds.map((categoryId) => ({
      categoryId,
      reviewerTypeId: categoryByType.reviewerTypeId,
    })),
  );
};

const getReview = (reportedCompanies: { id: number; name: string }[]) => {
  return reportedCompanies.map((company) => {
    return {
      userId: 1,
      reviewerTypeId: 1,
      reportedCompanyId: company.id,
      verifyStatus: 'not_verified',
    };
  });
};

const getReviewDetails = (
  reviews: { id: number }[],
  categories: {
    id: number;
    name: string;
  }[],
) => {
  return reviews.flatMap((review) => {
    return categories.map((category) => {
      return {
        reviewId: review.id,
        categoryId: category.id,
        score: 0,
      };
    });
  });
};

async function main() {
  try {
    const checkIfFileExists = fs.existsSync('seed.json');
    const existsData = await prisma.user.count();

    if (!checkIfFileExists && existsData.length < 1) {
      return;
    }

    const toHash = getCompaniesFromFile();
    const hashedPassword = await argon2.hash(process.env.SISTEMA_PASSWORD);
    const [reportedCompanies, categories, reviewerTypes, user] =
      await Promise.all([
        prisma.reportedCompany.createManyAndReturn({
          data: toHash,
          skipDuplicates: true,
        }),
        prisma.category.createManyAndReturn({
          data: getCategories(),
          skipDuplicates: true,
        }),
        prisma.reviewerType.createManyAndReturn({
          data: getReviewerTypes(),
          skipDuplicates: true,
        }),
        prisma.user.create({
          data: {
            name: 'Sistema',
            email: 'itsnotjs@gmail.com',
          },
        }),
      ]);

    const reviewerTypesCategories = getReviewerTypesCategories(
      reviewerTypes,
      categories,
    );

    const reviewRaws = getReview(reportedCompanies);

    const [, reviews] = await Promise.all([
      prisma.password.create({
        data: {
          userId: user.id,
          password: hashedPassword,
        },
      }),
      prisma.reviewerTypeCategory.createMany({
        data: reviewerTypesCategories,
        skipDuplicates: true,
      }),
      prisma.review.createMany({
        data: reviewRaws,
        skipDuplicates: true,
      }),
    ]);

    const reviewDetails = getReviewDetails(reviews, categories);

    await prisma.reviewDetail.createMany({
      data: reviewDetails,
      skipDuplicates: true,
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

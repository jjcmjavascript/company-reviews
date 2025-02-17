const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const fs = require('node:fs');
const { loadEnvFile } = require('node:process');

loadEnvFile('.env');

const prisma = new PrismaClient();

const getCompaniesFromFile = () => {
  const fileContent = fs.readFileSync('seed.json', 'utf-8');
  return Object.values(
    JSON.parse(fileContent) as Record<
      string,
      { name: string; imageUrl: string }
    >,
  ).map((i) => ({
    name: i.name,
    imageUrl: i.imageUrl,
  }));
};

const getCategories = () => [
  { name: 'Entrevista' },
  { name: 'Salario' },
  { name: 'Cultura' },
  { name: 'Jefatura' },
  { name: 'Crecimiento' },
  { name: 'Tecnologia' },
];

const getReviewerTypes = () => [
  { name: 'Sistema' },
  { name: 'Empleado' },
  { name: 'Ex-empleado' },
  { name: 'Postulante' },
];

// Suppose each reviewer type can have certain categories:
const getReviewerTypesCategories = (
  reviewerTypes: { id: number; name: string }[],
  categories: { id: number; name: string }[],
) => {
  const categoriesByType = reviewerTypes.map((reviewerType) => {
    const categoryIds =
      reviewerType.name === 'Postulante'
        ? categories
            .filter((cat) => ['Entrevista', 'Salario'].includes(cat.name))
            .map((cat) => cat.id)
        : categories.map((cat) => cat.id);

    return { reviewerTypeId: reviewerType.id, categoryIds };
  });

  return categoriesByType.flatMap((entry) =>
    entry.categoryIds.map((catId) => ({
      categoryId: catId,
      reviewerTypeId: entry.reviewerTypeId,
    })),
  );
};

const getReview = (reportedCompanies: { id: number; name: string }[]) => {
  return reportedCompanies.map((company) => ({
    userId: 1,
    reviewerTypeId: 1,
    reportedCompanyId: company.id,
    verificationStatus: 'not_verified',
  }));
};

const getReviewDetails = (
  reviews: { id: number }[],
  categories: { id: number; name: string }[],
) => {
  return reviews.flatMap((review) =>
    categories.map((category) => ({
      reviewId: review.id,
      categoryId: category.id,
      score: 5,
    })),
  );
};

async function main() {
  const checkIfFileExists = fs.existsSync('seed.json');
  const userCount = await prisma.user.count();

  if (!checkIfFileExists || userCount > 0) {
    console.info('Seed file does not exist or database is already seeded 🌱');
    return;
  }

  await prisma.$transaction(async (tx) => {
    const toHash = getCompaniesFromFile();
    const hashedPassword = await argon2.hash(
      process.env.SISTEMA_PASSWORD ?? '',
    );

    // Insert data
    const reportedCompanies = await tx.reportedCompany.createManyAndReturn({
      data: toHash,
      skipDuplicates: true,
    });

    const categories = await tx.category.createManyAndReturn({
      data: getCategories(),
      skipDuplicates: true,
    });

    const reviewerTypes = await tx.reviewerType.createManyAndReturn({
      data: getReviewerTypes(),
      skipDuplicates: true,
    });

    const user = await tx.user.create({
      data: {
        name: 'Sistema',
        email: 'itsnotjs@gmail.com',
      },
    });

    const reviewerTypesCategories = getReviewerTypesCategories(
      reviewerTypes,
      categories,
    );

    const reviewRaws = getReview(reportedCompanies);

    // Create password, bridging table, and reviews
    await tx.password.create({
      data: {
        userId: user.id,
        password: hashedPassword,
      },
    });

    await tx.reviewerTypeCategory.createMany({
      data: reviewerTypesCategories,
      skipDuplicates: true,
    });

    await tx.review.createMany({
      data: reviewRaws,
      skipDuplicates: true,
    });

    // Now find the newly created reviews so we can link details
    const insertedReviews = await tx.review.findMany({
      where: { userId: user.id, reviewerTypeId: 1 },
    });

    const reviewDetails = getReviewDetails(insertedReviews, categories);
    await tx.reviewDetail.createMany({
      data: reviewDetails,
      skipDuplicates: true,
    });
  });
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

/* Seed data for local development */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.click.deleteMany();
  await prisma.shortUrl.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: { email: 'demo@example.com', passwordHash },
  });

  await prisma.shortUrl.createMany({
    data: [
      {
        originalUrl: 'https://example.com',
        shortCode: 'exmpl1',
        userId: user.id,
      },
      {
        originalUrl: 'https://www.google.com',
        shortCode: 'ggl123',
        userId: user.id,
      },
    ],
  });

  console.log('Seed complete. Demo user: demo@example.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

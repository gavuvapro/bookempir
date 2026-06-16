const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting...');
  const books = await prisma.book.findMany({ take: 1 });
  console.log('Books:', books);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

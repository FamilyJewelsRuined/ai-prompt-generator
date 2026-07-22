const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const questions = await prisma.interviewQuestion.findMany();
  console.log("Questions:", questions.length);
  console.log(questions);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

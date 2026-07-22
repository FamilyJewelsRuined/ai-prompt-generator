import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const defaultModels = [
    {
      name: "ChatGPT",
      description:
        "OpenAI ChatGPT series models for general intelligence, conversation, and creative tasks.",
    },
    {
      name: "Gemini",
      description:
        "Google Gemini multimodal AI models for complex reasoning, coding, and context comprehension.",
    },
    {
      name: "Claude",
      description:
        "Anthropic Claude models designed for deep reasoning, nuance, and detailed instruction following.",
    },
    {
      name: "Grok",
      description:
        "xAI Grok models specialized in real-time context processing and direct problem solving.",
    },
    {
      name: "DeepSeek",
      description:
        "DeepSeek AI models optimized for code generation, technical architecture, and mathematical reasoning.",
    },
  ];

  for (const model of defaultModels) {
    const aiModel = await prisma.aIModel.upsert({
      where: { name: model.name },
      update: { description: model.description },
      create: model,
    });
    console.log(`  - Seeded AI Model: ${aiModel.name} (${aiModel.id})`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

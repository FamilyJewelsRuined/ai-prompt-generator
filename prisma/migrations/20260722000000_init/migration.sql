-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PromptStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ai_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_prompt" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "final_prompt" TEXT,
    "status" "PromptStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_revisions" (
    "id" TEXT NOT NULL,
    "prompt_id" TEXT NOT NULL,
    "revision_number" INTEGER NOT NULL,
    "prompt_text" TEXT NOT NULL,
    "additional_requirement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_questions" (
    "id" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "question_order" INTEGER NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "interview_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_answers" (
    "id" TEXT NOT NULL,
    "prompt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "prompt_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_feedback" (
    "id" TEXT NOT NULL,
    "prompt_id" TEXT NOT NULL,
    "is_satisfied" BOOLEAN NOT NULL,
    "additional_requirement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ai_models_name_key" ON "ai_models"("name");

-- CreateIndex
CREATE INDEX "prompts_user_id_idx" ON "prompts"("user_id");

-- CreateIndex
CREATE INDEX "prompts_model_id_idx" ON "prompts"("model_id");

-- CreateIndex
CREATE INDEX "prompt_revisions_prompt_id_idx" ON "prompt_revisions"("prompt_id");

-- CreateIndex
CREATE INDEX "interview_questions_intent_idx" ON "interview_questions"("intent");

-- CreateIndex
CREATE INDEX "prompt_answers_prompt_id_idx" ON "prompt_answers"("prompt_id");

-- CreateIndex
CREATE INDEX "prompt_answers_question_id_idx" ON "prompt_answers"("question_id");

-- CreateIndex
CREATE INDEX "prompt_feedback_prompt_id_idx" ON "prompt_feedback"("prompt_id");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "ai_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_revisions" ADD CONSTRAINT "prompt_revisions_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "interview_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_feedback" ADD CONSTRAINT "prompt_feedback_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

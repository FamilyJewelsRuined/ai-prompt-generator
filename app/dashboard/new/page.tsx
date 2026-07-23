"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getAIModels, getPromptById } from "@/lib/actions/prompt";
import PromptWizard from "@/components/PromptWizard";

export type ResumeData = {
  promptId: string;
  modelId: string;
  originalPrompt: string;
  intent: string;
  questions: { id: string; text: string }[];
  answers: Record<string, string>;
  feedbackHistory: string[];
};

export default function NewPromptPage() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resume");

  const [models, setModels] = useState<any[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [modelsData, promptData] = await Promise.all([
        getAIModels(),
        resumeId ? getPromptById(resumeId) : null,
      ]);

      setModels(modelsData);

      if (promptData) {
        // Build answers map from saved answers
        const answersMap: Record<string, string> = {};
        promptData.answers.forEach((a: any) => {
          answersMap[a.questionId] = a.answer;
        });

        // Extract unique questions from saved answers
        const questionsFromAnswers = promptData.answers.map((a: any) => ({
          id: a.questionId,
          text: a.question.question,
        }));

        // Build feedback history from rejections
        const feedbackHistory = promptData.feedbacks
          .filter((f: any) => !f.isSatisfied && f.additionalRequirement)
          .map((f: any) => f.additionalRequirement);

        setResumeData({
          promptId: promptData.id,
          modelId: promptData.modelId,
          originalPrompt: promptData.originalPrompt,
          intent: promptData.intent,
          questions: questionsFromAnswers,
          answers: answersMap,
          feedbackHistory,
        });
      }

      setIsLoading(false);
    }
    load();
  }, [resumeId]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to Library
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] flex items-center gap-3">
          <Sparkles className="text-[var(--color-primary)]" />
          {resumeData ? "Continue Prompt" : "Prompt Wizard"}
        </h1>
        <p className="text-slate-500 mt-2">
          {resumeData
            ? "Pick up where you left off — your progress has been saved."
            : "Let AI guide you to craft the perfect prompt for your needs."}
        </p>
      </div>

      {isLoading ? (
        <div className="animate-pulse bg-white rounded-2xl border border-slate-200 h-[600px] flex items-center justify-center">
          <p className="text-slate-400">Loading wizard...</p>
        </div>
      ) : (
        <PromptWizard models={models} resumeData={resumeData ?? undefined} />
      )}
    </div>
  );
}

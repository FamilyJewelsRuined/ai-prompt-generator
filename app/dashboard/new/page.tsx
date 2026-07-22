"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getAIModels } from "@/lib/actions/prompt";
import PromptWizard from "@/components/PromptWizard";

export default function NewPromptPage() {
  const [models, setModels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadModels() {
      const data = await getAIModels();
      setModels(data);
      setIsLoading(false);
    }
    loadModels();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to Library
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] flex items-center gap-3">
          <Sparkles className="text-[var(--color-primary)]" />
          Prompt Wizard
        </h1>
        <p className="text-slate-500 mt-2">Let AI guide you to craft the perfect prompt for your needs.</p>
      </div>

      {isLoading ? (
        <div className="animate-pulse bg-white rounded-2xl border border-slate-200 h-[600px] flex items-center justify-center">
          <p className="text-slate-400">Loading wizard...</p>
        </div>
      ) : (
        <PromptWizard models={models} />
      )}
    </div>
  );
}

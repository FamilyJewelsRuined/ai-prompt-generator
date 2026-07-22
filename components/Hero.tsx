import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[var(--color-primary)] text-sm font-medium mb-8 animate-fade-in-up">
          <Bot size={16} />
          <span>The Next Generation AI Tool</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-8">
          Craft perfect prompts <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            in seconds.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
          Elevate your AI interactions. Our intelligent generator helps you create, organize, and refine prompts to get exactly what you need from any LLM.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[var(--color-primary)] hover:bg-blue-700 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
            Start Generating Free
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="#demo" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full transition-all duration-300">
            View Live Demo
          </Link>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Supports ChatGPT, Claude & Gemini
          </div>
        </div>
      </div>
    </section>
  );
}

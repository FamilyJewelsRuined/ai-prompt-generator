import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden bg-[var(--color-foreground)]">
      {/* Decorative gradient orb */}
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)] opacity-30 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-accent)] opacity-30 blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to unlock the full potential of your AI models?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of prompt engineers, developers, and creators who are already building better AI applications.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-semibold text-[var(--color-foreground)] bg-white rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1">
            Get Started for Free
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/contact" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full transition-all duration-300">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

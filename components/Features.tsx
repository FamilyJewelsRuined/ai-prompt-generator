import { Sparkles, Layers, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Instantly create high-quality prompts tailored to your specific use cases using advanced AI models.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Layers,
    title: "Organized Library",
    description: "Save, categorize, and manage all your generated prompts in one clean, accessible workspace.",
    color: "text-violet-600",
    bgColor: "bg-violet-100",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on Next.js 15 and optimized for speed, so you spend less time waiting and more time building.",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your prompts and data are encrypted and securely stored. We never train models on your private data.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-4">
            Everything you need to master AI
          </h2>
          <p className="text-lg text-slate-600">
            A comprehensive suite of tools designed to streamline your prompt engineering workflow and boost productivity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group relative p-8 rounded-2xl bg-[var(--color-background)] border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.bgColor} ${feature.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

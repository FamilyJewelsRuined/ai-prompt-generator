import { getUserPrompts } from "@/lib/actions/prompt";
import Link from "next/link";
import { PlusCircle, Search, Clock, FileText } from "lucide-react";

export default async function DashboardPage() {
  const prompts = await getUserPrompts();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">My Prompts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and view your generated prompts</p>
        </div>
        <Link 
          href="/dashboard/new" 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-[var(--color-primary)] hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          <PlusCircle size={16} />
          Create New
        </Link>
      </div>

      {prompts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-[var(--color-primary)] mb-4">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No prompts yet</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first AI-optimized prompt using our intelligent generator.
          </p>
          <Link 
            href="/dashboard/new" 
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl text-white bg-[var(--color-foreground)] hover:bg-slate-800 transition-all shadow-sm"
          >
            <PlusCircle size={18} />
            Create Your First Prompt
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <Link href={`/dashboard/${prompt.id}`} key={prompt.id} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  prompt.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                  prompt.status === 'DRAFT' ? 'bg-amber-50 text-amber-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {prompt.status}
                </span>
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  {prompt.model.name}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                {prompt.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                {prompt.intent}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">
                <Clock size={14} />
                {new Date(prompt.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdPlaceholder({ className = '' }: { className?: string }) {
  return (
    <aside aria-label="Advertisement placeholder" className={`mx-auto flex min-h-24 w-full max-w-5xl items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 dark:border-slate-800 dark:bg-slate-900/40 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Advertisement</span>
    </aside>
  )
}

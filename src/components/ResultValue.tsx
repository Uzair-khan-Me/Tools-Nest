export function ResultValue({ value, detail }: { value: string; detail?: string }) {
  return <><div className="break-words text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl dark:text-white">{value}</div>{detail && <p className="mt-1.5 text-sm text-ink-600 dark:text-slate-300">{detail}</p>}</>
}

export function ResultGrid({ items }: { items: Array<{ label: string; value: string; highlight?: boolean }> }) {
  return <div className="grid gap-3 sm:grid-cols-2">{items.map((item) => <div key={item.label} className={`rounded-xl border p-4 ${item.highlight ? 'border-brand-100 bg-white dark:border-brand-700/50 dark:bg-slate-900' : 'border-slate-200/80 bg-white/70 dark:border-slate-700 dark:bg-slate-900/70'}`}><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</span><strong className="mt-1 block break-words text-xl text-ink-950 dark:text-white">{item.value}</strong></div>)}</div>
}

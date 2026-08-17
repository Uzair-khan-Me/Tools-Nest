import { Link } from 'react-router-dom'
import type { Tool } from '../types/tool'
import { Icon } from './Icon'

export function ToolCard({ tool }: { tool: Tool }) {
  return <Link to={`/tool/${tool.slug}`} className="group card flex min-h-56 flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-lg dark:hover:border-brand-700/70" aria-label={`Open ${tool.name}`}>
    <div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-100"><Icon name={tool.icon}/></span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{tool.category}</span></div>
    <h2 className="mt-5 text-lg font-bold tracking-tight text-ink-950 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-100">{tool.name}</h2>
    <p className="mt-2 flex-1 text-sm leading-6 text-ink-600 dark:text-slate-400">{tool.description}</p>
    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-100">Open tool <Icon name="arrow" size={17} className="transition-transform group-hover:translate-x-1"/></span>
  </Link>
}

import { Link } from 'react-router-dom'
import type { Category } from '../types/tool'
import { Icon } from './Icon'
import { toolsInCategory } from '../data/registry'

export function CategoryCard({ category }: { category: Category }) {
  const count = toolsInCategory(category.name).length
  return <Link to={`/category/${category.slug}`} className="card group flex items-center gap-4 p-5 hover:border-brand-100 dark:hover:border-brand-700"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-ink-600 group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-slate-800 dark:text-slate-300"><Icon name={category.icon}/></span><span className="min-w-0"><span className="block font-bold">{category.name}</span><span className="mt-0.5 block text-xs text-slate-500">{count ? `${count} free tools` : 'New tools soon'}</span></span><Icon name="chevron" size={18} className="ml-auto text-slate-400"/></Link>
}

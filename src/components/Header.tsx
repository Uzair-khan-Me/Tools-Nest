import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { useTheme, type ThemeMode } from '../hooks/useTheme'

const navItems = [{ label: 'All Tools', to: '/tools' }, { label: 'Math', to: '/category/math' }, { label: 'Finance', to: '/category/finance' }, { label: 'Health', to: '/category/health' }, { label: 'Converters', to: '/category/converters' }]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const themeIcon = theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'monitor'
  const cycleTheme = () => setTheme(({ light: 'dark', dark: 'system', system: 'light' } as Record<ThemeMode, ThemeMode>)[theme])
  const search = (event: React.FormEvent) => {
    event.preventDefault()
    navigate(`/tools${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
    setMenuOpen(false)
  }
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-lg" aria-label="ToolNest home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg font-black text-white">T</span>
          <span className="text-lg font-extrabold tracking-tight">Tool<span className="text-brand-600 dark:text-brand-100">Nest</span></span>
        </Link>
        <nav className="ml-3 hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100' : 'text-ink-600 hover:bg-slate-50 hover:text-ink-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'}`}>{item.label}</NavLink>)}
        </nav>
        <form onSubmit={search} className="ml-auto hidden w-full max-w-xs md:block" role="search">
          <label className="relative block">
            <span className="sr-only">Search all tools</span>
            <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900" placeholder="Search tools..." />
          </label>
        </form>
        <button onClick={cycleTheme} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-ink-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900" title={`Theme: ${theme}. Click to change.`} aria-label={`Current theme: ${theme}. Change theme.`}><Icon name={themeIcon} size={19}/></button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 lg:hidden dark:border-slate-800" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle menu"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
      {menuOpen && <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden dark:border-slate-800 dark:bg-slate-950">
        <form onSubmit={search} className="mb-3 md:hidden" role="search"><label className="relative block"><span className="sr-only">Search tools</span><Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} className="input pl-10" placeholder="Search tools..."/></label></form>
        <nav className="grid gap-1" aria-label="Mobile navigation">{navItems.map((item) => <NavLink onClick={() => setMenuOpen(false)} key={item.to} to={item.to} className="rounded-xl px-3 py-3 text-sm font-semibold text-ink-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">{item.label}</NavLink>)}<NavLink onClick={() => setMenuOpen(false)} to="/category/date-time" className="rounded-xl px-3 py-3 text-sm font-semibold text-ink-800 dark:text-slate-200">Date & Time</NavLink></nav>
      </div>}
    </header>
  )
}

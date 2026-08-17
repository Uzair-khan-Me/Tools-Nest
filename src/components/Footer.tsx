import { Link } from 'react-router-dom'

const legal = [['About', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/privacy-policy'], ['Terms', '/terms'], ['Cookie Policy', '/cookie-policy'], ['Disclaimer', '/disclaimer']]
export function Footer() {
  return <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
      <div><Link to="/" className="inline-flex items-center gap-2 font-extrabold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">T</span>ToolNest</Link><p className="mt-4 max-w-sm text-sm leading-6 text-ink-600 dark:text-slate-400">Simple, fast and free calculators and converters. Your entries stay in your browser and no account is required.</p></div>
      <div><h2 className="text-sm font-bold">Explore</h2><ul className="mt-4 grid gap-3 text-sm text-ink-600 dark:text-slate-400"><li><Link className="hover:text-brand-600" to="/tools">All tools</Link></li><li><Link className="hover:text-brand-600" to="/category/math">Math</Link></li><li><Link className="hover:text-brand-600" to="/category/finance">Finance</Link></li><li><Link className="hover:text-brand-600" to="/category/date-time">Date & Time</Link></li><li><Link className="hover:text-brand-600" to="/category/converters">Converters</Link></li></ul></div>
      <div><h2 className="text-sm font-bold">Information</h2><ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-ink-600 md:grid-cols-1 dark:text-slate-400">{legal.map(([name, to]) => <li key={to}><Link className="hover:text-brand-600" to={to}>{name}</Link></li>)}</ul></div>
    </div>
    <div className="border-t border-slate-200 dark:border-slate-800"><div className="container-page flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} ToolNest. All rights reserved.</span><span>Free tools. No sign-up. No data uploads.</span></div></div>
  </footer>
}

import { useState, type FormEvent, type ReactNode } from 'react'
import { copyText } from '../utils/clipboard'
import { Icon } from './Icon'

interface Props {
  children: ReactNode
  onCalculate: () => void
  onReset: () => void
  result: ReactNode | null
  resultText?: string
  formula?: string
  error?: string
  calculateLabel?: string
}

export function CalculatorFrame({ children, onCalculate, onReset, result, resultText = '', formula, error, calculateLabel = 'Calculate' }: Props) {
  const [copied, setCopied] = useState(false)
  const submit = (event: FormEvent) => { event.preventDefault(); setCopied(false); onCalculate() }
  const copy = async () => {
    const ok = await copyText(resultText)
    if (ok) { setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
  }
  return <div className="card overflow-hidden">
    <form onSubmit={submit} noValidate>
      <div className="p-5 sm:p-7">
        <div className="grid gap-5">{children}</div>
        {error && <div role="alert" className="mt-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"><Icon name="info" size={19} className="mt-0.5 shrink-0"/>{error}</div>}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-primary sm:min-w-36">{calculateLabel}</button>
          <button type="button" className="btn-secondary" onClick={() => { setCopied(false); onReset() }}><Icon name="reset" size={17}/>Reset</button>
        </div>
        {result && <div className="result-panel" role="status" aria-live="polite" aria-atomic="true">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-100">Result</p>
          <div className="mt-2">{result}</div>
          {formula && <div className="mt-4 border-t border-brand-100 pt-4 text-sm leading-6 text-ink-600 dark:border-brand-700/40 dark:text-slate-300"><span className="font-bold text-ink-800 dark:text-slate-100">Calculation: </span>{formula}</div>}
          <button type="button" onClick={copy} className="btn-secondary mt-4 min-h-10 py-2"><Icon name={copied ? 'check' : 'copy'} size={16}/>{copied ? 'Copied' : 'Copy result'}</button>
        </div>}
      </div>
    </form>
  </div>
}

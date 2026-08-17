import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  hint?: string
  suffix?: string
}
export function NumberField({ label, hint, suffix, id, ...props }: NumberFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <div><label htmlFor={fieldId} className="field-label">{label}</label><div className="relative"><input id={fieldId} type="number" inputMode="decimal" className={`input ${suffix ? 'pr-14' : ''}`} {...props}/>{suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">{suffix}</span>}</div>{hint && <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}</div>
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> { label: string; options: Array<{ value: string | number; label: string }> }
export function SelectField({ label, options, id, ...props }: SelectFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <div><label htmlFor={fieldId} className="field-label">{label}</label><select id={fieldId} className="select" {...props}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
}

interface DateFieldProps extends InputHTMLAttributes<HTMLInputElement> { label: string }
export function DateField({ label, id, ...props }: DateFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <div><label htmlFor={fieldId} className="field-label">{label}</label><input id={fieldId} type="date" className="input" {...props}/></div>
}

interface TimeFieldProps extends InputHTMLAttributes<HTMLInputElement> { label: string }
export function TimeField({ label, id, ...props }: TimeFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <div><label htmlFor={fieldId} className="field-label">{label}</label><input id={fieldId} type="time" className="input" {...props}/></div>
}

interface DateTimeFieldProps extends InputHTMLAttributes<HTMLInputElement> { label: string }
export function DateTimeField({ label, id, ...props }: DateTimeFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <div><label htmlFor={fieldId} className="field-label">{label}</label><input id={fieldId} type="datetime-local" className="input" {...props}/></div>
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; hint?: string }
export function TextAreaField({ label, hint, id, ...props }: TextAreaFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <div><label htmlFor={fieldId} className="field-label">{label}</label><textarea id={fieldId} className="input min-h-28 resize-y" {...props}/>{hint && <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}</div>
}

export function Toggle({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: (value: boolean) => void; id: string }) {
  return <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3.5 dark:border-slate-700"><input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"/><span className="text-sm font-semibold">{label}</span></label>
}

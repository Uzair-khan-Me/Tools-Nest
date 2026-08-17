export function formatNumber(value: number, maximumFractionDigits = 8): string {
  if (!Number.isFinite(value)) return 'Not available'
  if (value !== 0 && (Math.abs(value) >= 1e12 || Math.abs(value) < 1e-7)) {
    return value.toExponential(6).replace(/\.?(0+)e/, 'e')
  }
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    useGrouping: true,
  }).format(value)
}

export function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return 'Not available'
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
}

export function parseFinite(value: string): number | null {
  if (value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function parseNumberList(value: string): number[] | null {
  const tokens = value.trim().split(/[\s,;]+/).filter(Boolean)
  if (!tokens.length) return null
  const values = tokens.map(Number)
  return values.every(Number.isFinite) ? values : null
}

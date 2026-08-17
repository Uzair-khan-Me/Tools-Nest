export function percentageOf(percent: number, whole: number) {
  return (percent / 100) * whole
}

export function percentIs(part: number, whole: number) {
  if (whole === 0) throw new Error('The whole value cannot be zero.')
  return (part / whole) * 100
}

export function applyPercentageChange(value: number, percent: number, direction: 'increase' | 'decrease') {
  return value * (1 + (direction === 'increase' ? 1 : -1) * percent / 100)
}

export function percentageIncrease(original: number, next: number) {
  if (original === 0) throw new Error('The original value cannot be zero.')
  return ((next - original) / Math.abs(original)) * 100
}

export function percentageDecrease(original: number, next: number) {
  if (original === 0) throw new Error('The original value cannot be zero.')
  return ((original - next) / Math.abs(original)) * 100
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b))
  while (b) [a, b] = [b, a % b]
  return a || 1
}

export function calculateFraction(a: number, b: number, c: number, d: number, operation: '+' | '-' | '×' | '÷') {
  if (![a, b, c, d].every(Number.isInteger)) throw new Error('Fraction values must be whole numbers.')
  if (b === 0 || d === 0) throw new Error('A denominator cannot be zero.')
  let numerator: number
  let denominator: number
  if (operation === '+') { numerator = a * d + c * b; denominator = b * d }
  else if (operation === '-') { numerator = a * d - c * b; denominator = b * d }
  else if (operation === '×') { numerator = a * c; denominator = b * d }
  else {
    if (c === 0) throw new Error('Cannot divide by a zero fraction.')
    numerator = a * d; denominator = b * c
  }
  if (denominator < 0) { numerator *= -1; denominator *= -1 }
  const divisor = gcd(numerator, denominator)
  return { numerator: numerator / divisor, denominator: denominator / divisor, decimal: numerator / denominator }
}

function decimalPlaces(value: number): number {
  const source = String(value).toLowerCase()
  if (source.includes('e-')) return Number(source.split('e-')[1])
  return (source.split('.')[1] || '').length
}

export function simplifyRatio(a: number, b: number) {
  if (a === 0 && b === 0) throw new Error('Both ratio values cannot be zero.')
  const places = Math.min(8, Math.max(decimalPlaces(a), decimalPlaces(b)))
  const factor = 10 ** places
  const left = Math.round(a * factor)
  const right = Math.round(b * factor)
  const divisor = gcd(left, right)
  return { left: left / divisor, right: right / divisor, decimal: b === 0 ? null : a / b }
}

export function average(values: number[]) {
  if (!values.length) throw new Error('Enter at least one number.')
  const sum = values.reduce((total, value) => total + value, 0)
  if (!Number.isFinite(sum)) throw new Error('The values are too large to calculate safely.')
  return { sum, mean: sum / values.length, min: Math.min(...values), max: Math.max(...values), count: values.length }
}

export function loanPayment(principal: number, annualRate: number, years: number) {
  if (principal < 0 || annualRate < 0 || years <= 0) throw new Error('Enter a positive loan and term, and a non-negative rate.')
  const payments = Math.round(years * 12)
  if (payments < 1) throw new Error('The loan term is too short.')
  const monthlyRate = annualRate / 1200
  const monthly = monthlyRate === 0
    ? principal / payments
    : principal * monthlyRate * (1 + monthlyRate) ** payments / ((1 + monthlyRate) ** payments - 1)
  const total = monthly * payments
  if (![monthly, total].every(Number.isFinite)) throw new Error('These values are too large to calculate.')
  return { monthly, total, interest: total - principal, payments }
}

export function compoundInterest(principal: number, annualRate: number, years: number, compounds: number, monthlyContribution: number) {
  if (principal < 0 || annualRate < 0 || years < 0 || compounds <= 0 || monthlyContribution < 0) throw new Error('Use non-negative amounts and a positive compounding frequency.')
  const r = annualRate / 100
  const principalFuture = principal * (1 + r / compounds) ** (compounds * years)
  const months = Math.round(years * 12)
  const monthlyEquivalent = r === 0 ? 0 : (1 + r / compounds) ** (compounds / 12) - 1
  const contributionFuture = monthlyEquivalent === 0
    ? monthlyContribution * months
    : monthlyContribution * (((1 + monthlyEquivalent) ** months - 1) / monthlyEquivalent)
  const balance = principalFuture + contributionFuture
  const contributions = principal + monthlyContribution * months
  if (!Number.isFinite(balance)) throw new Error('These values are too large to calculate.')
  return { balance, contributions, interest: balance - contributions }
}

export function simpleInterest(principal: number, annualRate: number, years: number) {
  if (principal < 0 || annualRate < 0 || years < 0) throw new Error('Values cannot be negative.')
  const interest = principal * annualRate / 100 * years
  return { interest, total: principal + interest }
}

export function calculateTax(amount: number, rate: number, mode: 'add' | 'extract') {
  if (amount < 0 || rate < 0) throw new Error('Amount and rate cannot be negative.')
  if (mode === 'add') {
    const tax = amount * rate / 100
    return { net: amount, tax, gross: amount + tax }
  }
  const net = amount / (1 + rate / 100)
  return { net, tax: amount - net, gross: amount }
}

export function salaryAnnual(amount: number, period: 'hourly' | 'weekly' | 'monthly' | 'annual', hours: number, weeks: number) {
  if (amount < 0 || hours <= 0 || weeks <= 0) throw new Error('Pay cannot be negative, and work time must be positive.')
  if (period === 'hourly') return amount * hours * weeks
  if (period === 'weekly') return amount * weeks
  if (period === 'monthly') return amount * 12
  return amount
}

export function bmiMetric(kg: number, cm: number) {
  if (kg <= 0 || cm <= 0) throw new Error('Height and weight must be greater than zero.')
  return kg / (cm / 100) ** 2
}

export function bmiCategory(bmi: number) {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Healthy range'
  if (bmi < 30) return 'Overweight'
  return 'Obesity range'
}

export function bmr(sex: 'male' | 'female', kg: number, cm: number, age: number) {
  if (kg <= 0 || cm <= 0 || age <= 0 || age > 130) throw new Error('Enter realistic positive age, height, and weight values.')
  return 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161)
}

const MS_DAY = 86_400_000
export function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null
  return date
}

export function formatDateISO(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
}

export function addClamped(date: Date, years: number, months: number, days = 0) {
  const originalDay = date.getUTCDate()
  const targetMonthIndex = date.getUTCFullYear() * 12 + date.getUTCMonth() + years * 12 + months
  const year = Math.floor(targetMonthIndex / 12)
  const month = ((targetMonthIndex % 12) + 12) % 12
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  return new Date(Date.UTC(year, month, Math.min(originalDay, lastDay) + days))
}

export function calendarDifference(first: Date, second: Date) {
  let start = first
  let end = second
  let reversed = false
  if (start > end) { [start, end] = [end, start]; reversed = true }
  let years = end.getUTCFullYear() - start.getUTCFullYear()
  let cursor = addClamped(start, years, 0)
  if (cursor > end) { years--; cursor = addClamped(start, years, 0) }
  let months = 0
  while (months < 11 && addClamped(cursor, 0, months + 1) <= end) months++
  cursor = addClamped(cursor, 0, months)
  const days = Math.round((end.getTime() - cursor.getTime()) / MS_DAY)
  const totalDays = Math.round((end.getTime() - start.getTime()) / MS_DAY)
  return { years, months, days, totalDays, weeks: Math.floor(totalDays / 7), remainingWeekDays: totalDays % 7, reversed }
}

export const ageDifference = calendarDifference

export function addDateParts(start: Date, direction: 1 | -1, years: number, months: number, weeks: number, days: number) {
  return addClamped(start, direction * years, direction * months, direction * (weeks * 7 + days))
}

export function timeDuration(start: string, end: string, overnight: boolean) {
  const pattern = /^(\d{2}):(\d{2})$/
  const a = start.match(pattern); const b = end.match(pattern)
  if (!a || !b) throw new Error('Enter both times.')
  const startMinutes = Number(a[1]) * 60 + Number(a[2])
  const endMinutes = Number(b[1]) * 60 + Number(b[2])
  let minutes = endMinutes - startMinutes
  if (minutes < 0 && overnight) minutes += 1440
  if (minutes < 0) throw new Error('End time is before start time. Turn on overnight mode if it ends the next day.')
  return { minutes, hours: Math.floor(minutes / 60), remainingMinutes: minutes % 60, decimalHours: minutes / 60 }
}

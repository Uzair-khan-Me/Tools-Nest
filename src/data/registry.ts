import rawTools from './tools.json'
import type { Category, Tool } from '../types/tool'

export const tools = rawTools as Tool[]

export const categories: Category[] = [
  { name: 'Math', slug: 'math', description: 'Percentages, fractions, ratios, averages and number tools.', icon: 'calculator' },
  { name: 'Finance', slug: 'finance', description: 'Plan payments, interest, taxes, tips, discounts and pay.', icon: 'wallet' },
  { name: 'Health', slug: 'health', description: 'Straightforward BMI, BMR and calorie estimates.', icon: 'heart' },
  { name: 'Date & Time', slug: 'date-time', description: 'Work with ages, dates, durations and global time zones.', icon: 'calendar' },
  { name: 'Converters', slug: 'converters', description: 'Accurate conversions for everyday measurement units.', icon: 'swap' },
  { name: 'Everyday Tools', slug: 'everyday-tools', description: 'More practical everyday utilities are planned.', icon: 'sparkles' },
]

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug)
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug)
export const getCategoryForTool = (tool: Tool) => categories.find((category) => category.name === tool.category)!
export const toolsInCategory = (name: string) => tools.filter((tool) => tool.category === name)

export const searchTools = (query: string, category?: string) => {
  const normalized = query.trim().toLowerCase()
  return tools.filter((tool) => {
    const inCategory = !category || category === 'All Tools' || tool.category === category
    if (!inCategory) return false
    if (!normalized) return true
    const haystack = [tool.name, tool.description, tool.category, ...tool.keywords].join(' ').toLowerCase()
    return normalized.split(/\s+/).every((term) => haystack.includes(term))
  })
}

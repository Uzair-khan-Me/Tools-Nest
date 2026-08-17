export type CategoryName = 'Math' | 'Finance' | 'Health' | 'Date & Time' | 'Converters' | 'Everyday Tools'
export type ToolGroup = 'math' | 'finance' | 'health' | 'date-time' | 'converters'

export interface FAQ {
  q: string
  a: string
}

export interface Tool {
  name: string
  slug: string
  category: CategoryName
  description: string
  keywords: string[]
  icon: string
  group: ToolGroup
  seoTitle: string
  seoDescription: string
  intro: string
  formula: string
  howItWorks: string
  examples: string[]
  faqs: FAQ[]
  related: string[]
}

export interface Category {
  name: CategoryName
  slug: string
  description: string
  icon: string
}

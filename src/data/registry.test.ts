import { describe, expect, it } from 'vitest'
import { categories, getTool, searchTools, tools } from './registry'

describe('central tool registry',()=>{
  it('contains 32 unique, complete tools',()=>{expect(tools).toHaveLength(32);expect(new Set(tools.map(tool=>tool.slug)).size).toBe(32);for(const tool of tools){expect(tool.name).toBeTruthy();expect(tool.description.length).toBeGreaterThan(30);expect(tool.seoTitle).toContain('ToolNest');expect(tool.seoDescription.length).toBeGreaterThan(50);expect(tool.formula).toBeTruthy();expect(tool.howItWorks.length).toBeGreaterThan(80);expect(tool.examples.length).toBeGreaterThanOrEqual(2);expect(tool.faqs.length).toBeGreaterThanOrEqual(2);expect(tool.related.length).toBeGreaterThanOrEqual(3);expect(tool.related.every(slug=>Boolean(getTool(slug)))).toBe(true)}})
  it('searches names, descriptions, categories and keywords',()=>{expect(searchTools('kg').map(tool=>tool.slug)).toEqual(expect.arrayContaining(['weight-converter','unit-converter','bmi-calculator']));expect(searchTools('money').map(tool=>tool.slug)).toEqual(expect.arrayContaining(['loan-calculator','salary-calculator','discount-calculator','gst-calculator','vat-calculator']));expect(searchTools('temperature')).toHaveLength(2)})
  it('defines requested category routes',()=>expect(categories.map(category=>category.slug)).toEqual(expect.arrayContaining(['math','finance','health','date-time','converters','everyday-tools'])))
})

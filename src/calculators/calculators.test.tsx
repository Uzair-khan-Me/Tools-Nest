// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import tools from '../data/tools.json'
import MathTools from './MathTools'
import FinanceTools from './FinanceTools'
import HealthTools from './HealthTools'
import DateTimeTools from './DateTimeTools'
import ConverterTools from './ConverterTools'

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
const components={math:MathTools,finance:FinanceTools,health:HealthTools,'date-time':DateTimeTools,converters:ConverterTools}
let cleanup:undefined|(()=>Promise<void>)
afterEach(async()=>{if(cleanup)await cleanup();cleanup=undefined})

describe('all registered calculator interfaces',()=>{
  for(const tool of tools){
    it(`${tool.name} calculates its valid default and resets`,async()=>{
      const host=document.createElement('div');document.body.appendChild(host);const root=createRoot(host);cleanup=async()=>{await act(async()=>root.unmount());host.remove()}
      const Component=components[tool.group as keyof typeof components]
      await act(async()=>root.render(<Component slug={tool.slug}/>))
      const form=host.querySelector('form');expect(form).not.toBeNull()
      await act(async()=>form!.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})))
      expect(host.querySelector('[role="alert"]')?.textContent||'').not.toMatch(/NaN|Infinity|undefined/)
      const result=host.querySelector('[role="status"]');expect(result,`${tool.slug} should render a result`).not.toBeNull();expect(result!.textContent).not.toMatch(/NaN|Infinity|undefined|Not available/)
      const reset=[...host.querySelectorAll('button')].find(button=>button.textContent?.includes('Reset'));expect(reset).toBeTruthy()
      await act(async()=>reset!.dispatchEvent(new MouseEvent('click',{bubbles:true})))
      expect(host.querySelector('[role="status"]')).toBeNull()
      const firstInput=host.querySelector('input:not([type="checkbox"]), textarea') as HTMLInputElement|HTMLTextAreaElement
      const fieldPrototype=firstInput instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype
      const valueSetter=Object.getOwnPropertyDescriptor(fieldPrototype,'value')!.set!
      await act(async()=>{valueSetter.call(firstInput,'');firstInput.dispatchEvent(new Event('input',{bubbles:true}))})
      await act(async()=>form!.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})))
      const alert=host.querySelector('[role="alert"]');expect(alert,`${tool.slug} should reject an empty required input`).not.toBeNull();expect(alert!.textContent).not.toMatch(/NaN|Infinity|undefined/)
    })
  }
})

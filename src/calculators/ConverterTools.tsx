import { useEffect, useState } from 'react'
import { CalculatorFrame } from '../components/CalculatorFrame'
import { NumberField, SelectField } from '../components/Fields'
import { ResultGrid, ResultValue } from '../components/ResultValue'
import { convertLinear, convertTemperature, temperatureUnits, unitCategories } from '../data/units'
import { formatNumber, parseFinite } from '../utils/format'
import type { CalculatorProps } from './types'

type CategoryKey = keyof typeof unitCategories | 'temperature'
const defaults:Record<CategoryKey,[string,string]>={length:['km','mi'],weight:['kg','lb'],temperature:['°C','°F'],area:['m²','ft²'],volume:['L','US gal'],speed:['km/h','mph'],time:['hr','min'],data:['GB','GiB']}

function Converter({fixedCategory}:{fixedCategory?:CategoryKey}){
  const[category,setCategory]=useState<CategoryKey>(fixedCategory||'length'),[value,setValue]=useState('1'),[from,setFrom]=useState(defaults[fixedCategory||'length'][0]),[to,setTo]=useState(defaults[fixedCategory||'length'][1]);const[result,setResult]=useState<number|null>(null);const[error,setError]=useState('')
  const units=category==='temperature'?temperatureUnits:unitCategories[category].units
  useEffect(()=>{const pair=defaults[category];setFrom(pair[0]);setTo(pair[1]);setResult(null);setError('')},[category])
  const calculate=()=>{try{const input=parseFinite(value);if(input===null)throw new Error('Enter a valid number to convert.');const converted=category==='temperature'?convertTemperature(input,from,to):convertLinear(input,from,to,category);setResult(converted);setError('')}catch(e){setResult(null);setError((e as Error).message)}}
  const reset=()=>{const initial=fixedCategory||'length';setCategory(initial);setValue('1');setFrom(defaults[initial][0]);setTo(defaults[initial][1]);setResult(null);setError('')}
  const swap=()=>{setFrom(to);setTo(from);if(result!==null){setValue(String(result));setResult(parseFinite(value))}setError('')}
  const options=units.map(unit=>({value:unit.symbol,label:`${unit.name} (${unit.symbol})`}))
  const allResults=result!==null?units.filter(unit=>unit.symbol!==to).slice(0,4).map(unit=>({label:unit.name,value:`${formatNumber(category==='temperature'?convertTemperature(Number(value),from,unit.symbol):convertLinear(Number(value),from,unit.symbol,category))} ${unit.symbol}`})):[]
  return <CalculatorFrame onCalculate={calculate} onReset={reset} error={error} result={result!==null&&<><ResultValue value={`${formatNumber(result)} ${to}`} detail={`${formatNumber(Number(value))} ${from} equals ${formatNumber(result)} ${to}`}/><div className="mt-4"><ResultGrid items={allResults}/></div></>} resultText={result!==null?`${formatNumber(Number(value))} ${from} = ${formatNumber(result)} ${to}`:''} formula={result!==null?`${formatNumber(Number(value))} ${from} × conversion factor = ${formatNumber(result)} ${to}`:undefined}>
    {!fixedCategory&&<SelectField label="Measurement category" value={category} onChange={e=>setCategory(e.target.value as CategoryKey)} options={[{value:'length',label:'Length'},{value:'weight',label:'Weight / Mass'},{value:'temperature',label:'Temperature'},{value:'area',label:'Area'},{value:'volume',label:'Volume'},{value:'speed',label:'Speed'},{value:'time',label:'Time / Duration'},{value:'data',label:'Data Storage'}]}/>} 
    <NumberField label="Value to convert" value={value} onChange={e=>setValue(e.target.value)} />
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end"><SelectField label="From unit" value={from} onChange={e=>{setFrom(e.target.value);setResult(null)}} options={options}/><button type="button" onClick={swap} className="btn-secondary px-4" aria-label="Swap source and destination units">Swap</button><SelectField label="To unit" value={to} onChange={e=>{setTo(e.target.value);setResult(null)}} options={options}/></div>
  </CalculatorFrame>
}

const categoryBySlug:Record<string,CategoryKey>={'length-converter':'length','weight-converter':'weight','temperature-converter':'temperature','area-converter':'area','volume-converter':'volume','speed-converter':'speed','time-converter':'time','data-storage-converter':'data'}
export default function ConverterTools({slug}:CalculatorProps){return <Converter fixedCategory={slug==='unit-converter'?undefined:categoryBySlug[slug]}/>} 

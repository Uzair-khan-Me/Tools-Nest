import { describe, expect, it } from 'vitest'
import { addDateParts, ageDifference, average, bmiMetric, bmr, calculateFraction, calculateTax, calendarDifference, compoundInterest, loanPayment, parseDateOnly, percentageDecrease, percentageIncrease, percentageOf, percentIs, salaryAnnual, simpleInterest, simplifyRatio, timeDuration } from './calculations'
import { convertLinear, convertTemperature } from '../data/units'

describe('math calculations',()=>{
  it('calculates percentage modes and changes',()=>{expect(percentageOf(25,200)).toBe(50);expect(percentIs(45,300)).toBe(15);expect(percentageIncrease(80,100)).toBe(25);expect(percentageDecrease(250,200)).toBe(20)})
  it('rejects division by a zero whole',()=>expect(()=>percentIs(5,0)).toThrow())
  it('reduces all fraction operations',()=>{expect(calculateFraction(1,2,1,3,'+')).toMatchObject({numerator:5,denominator:6});expect(calculateFraction(3,4,2,5,'÷')).toMatchObject({numerator:15,denominator:8});expect(calculateFraction(1,2,3,4,'×')).toMatchObject({numerator:3,denominator:8});expect(calculateFraction(1,2,3,4,'-')).toMatchObject({numerator:-1,denominator:4})})
  it('rejects zero fraction denominators',()=>expect(()=>calculateFraction(1,0,1,2,'+')).toThrow())
  it('simplifies decimal ratios',()=>expect(simplifyRatio(2.5,10)).toMatchObject({left:1,right:4,decimal:.25}))
  it('summarizes lists including negatives and decimals',()=>expect(average([-1,1.5,2.5,5])).toMatchObject({sum:8,mean:2,min:-1,max:5,count:4}))
})

describe('finance calculations',()=>{
  it('calculates amortizing and zero-rate loans',()=>{expect(loanPayment(10000,6,3).monthly).toBeCloseTo(304.219,2);expect(loanPayment(12000,0,2).monthly).toBe(500)})
  it('calculates compound interest with and without contributions',()=>{expect(compoundInterest(10000,5,10,12,0).balance).toBeCloseTo(16470.09,1);const result=compoundInterest(0,0,1,12,100);expect(result.balance).toBe(1200);expect(result.interest).toBe(0)})
  it('calculates simple interest',()=>expect(simpleInterest(5000,4,3)).toEqual({interest:600,total:5600}))
  it('adds and extracts tax correctly',()=>{expect(calculateTax(200,10,'add')).toEqual({net:200,tax:20,gross:220});expect(calculateTax(110,10,'extract').tax).toBeCloseTo(10)})
  it('normalizes salary periods',()=>{expect(salaryAnnual(25,'hourly',40,52)).toBe(52000);expect(salaryAnnual(5000,'monthly',40,52)).toBe(60000)})
})

describe('health calculations',()=>{
  it('calculates metric BMI',()=>expect(bmiMetric(70,175)).toBeCloseTo(22.857,3))
  it('uses the Mifflin–St Jeor constants',()=>{expect(bmr('male',75,180,30)).toBeCloseTo(1730);expect(bmr('female',75,180,30)).toBeCloseTo(1564)})
  it('rejects impossible body inputs',()=>expect(()=>bmiMetric(0,175)).toThrow())
})

describe('date and time calculations',()=>{
  it('calculates calendar age around a birthday',()=>{const birth=parseDateOnly('2000-05-10')!;expect(ageDifference(birth,parseDateOnly('2024-05-09')!).years).toBe(23);expect(ageDifference(birth,parseDateOnly('2024-05-10')!).years).toBe(24)})
  it('handles leap years and reversed date differences',()=>{expect(calendarDifference(parseDateOnly('2024-03-01')!,parseDateOnly('2025-03-01')!).totalDays).toBe(365);expect(calendarDifference(parseDateOnly('2025-03-01')!,parseDateOnly('2024-03-01')!).reversed).toBe(true)})
  it('clamps calendar month addition',()=>expect(addDateParts(parseDateOnly('2024-01-31')!,1,0,1,0,0).toISOString().slice(0,10)).toBe('2024-02-29'))
  it('calculates same-day and overnight times',()=>{expect(timeDuration('09:15','17:45',false).minutes).toBe(510);expect(timeDuration('22:00','06:00',true).minutes).toBe(480);expect(()=>timeDuration('22:00','06:00',false)).toThrow()})
})

describe('unit conversions',()=>{
  it('converts all linear converter categories',()=>{expect(convertLinear(10,'km','mi','length')).toBeCloseTo(6.21371,4);expect(convertLinear(70,'kg','lb','weight')).toBeCloseTo(154.324,2);expect(convertLinear(1,'ha','m²','area')).toBe(10000);expect(convertLinear(1,'US gal','L','volume')).toBeCloseTo(3.78541,5);expect(convertLinear(100,'km/h','mph','speed')).toBeCloseTo(62.1371,4);expect(convertLinear(2.5,'hr','min','time')).toBe(150);expect(convertLinear(1,'GiB','MiB','data')).toBe(1024)})
  it('converts temperatures and rejects below absolute zero',()=>{expect(convertTemperature(0,'°C','°F')).toBe(32);expect(convertTemperature(32,'°F','°C')).toBe(0);expect(convertTemperature(0,'°C','K')).toBe(273.15);expect(()=>convertTemperature(-274,'°C','K')).toThrow()})
})

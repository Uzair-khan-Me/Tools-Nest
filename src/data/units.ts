export interface UnitDefinition { name: string; symbol: string; factor: number }
export interface UnitCategory { label: string; units: UnitDefinition[] }

export const unitCategories: Record<string, UnitCategory> = {
  length: {
    label: 'Length', units: [
      { name: 'Millimetre', symbol: 'mm', factor: 0.001 }, { name: 'Centimetre', symbol: 'cm', factor: 0.01 },
      { name: 'Metre', symbol: 'm', factor: 1 }, { name: 'Kilometre', symbol: 'km', factor: 1000 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 }, { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 }, { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      { name: 'Nautical mile', symbol: 'nmi', factor: 1852 },
    ]
  },
  weight: {
    label: 'Weight / Mass', units: [
      { name: 'Milligram', symbol: 'mg', factor: 0.000001 }, { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Kilogram', symbol: 'kg', factor: 1 }, { name: 'Metric tonne', symbol: 't', factor: 1000 },
      { name: 'Ounce', symbol: 'oz', factor: 0.028349523125 }, { name: 'Pound', symbol: 'lb', factor: 0.45359237 },
      { name: 'Stone', symbol: 'st', factor: 6.35029318 }, { name: 'US short ton', symbol: 'US ton', factor: 907.18474 },
      { name: 'UK long ton', symbol: 'long ton', factor: 1016.0469088 },
    ]
  },
  area: {
    label: 'Area', units: [
      { name: 'Square millimetre', symbol: 'mm²', factor: 0.000001 }, { name: 'Square centimetre', symbol: 'cm²', factor: 0.0001 },
      { name: 'Square metre', symbol: 'm²', factor: 1 }, { name: 'Square kilometre', symbol: 'km²', factor: 1_000_000 },
      { name: 'Square inch', symbol: 'in²', factor: 0.00064516 }, { name: 'Square foot', symbol: 'ft²', factor: 0.09290304 },
      { name: 'Square yard', symbol: 'yd²', factor: 0.83612736 }, { name: 'Square mile', symbol: 'mi²', factor: 2_589_988.110336 },
      { name: 'Acre', symbol: 'ac', factor: 4046.8564224 }, { name: 'Hectare', symbol: 'ha', factor: 10000 },
    ]
  },
  volume: {
    label: 'Volume', units: [
      { name: 'Millilitre', symbol: 'mL', factor: 0.001 }, { name: 'Litre', symbol: 'L', factor: 1 },
      { name: 'Cubic centimetre', symbol: 'cm³', factor: 0.001 }, { name: 'Cubic metre', symbol: 'm³', factor: 1000 },
      { name: 'US teaspoon', symbol: 'tsp', factor: 0.00492892159375 }, { name: 'US tablespoon', symbol: 'tbsp', factor: 0.01478676478125 },
      { name: 'US cup', symbol: 'cup', factor: 0.2365882365 }, { name: 'Metric cup', symbol: 'metric cup', factor: 0.25 },
      { name: 'US pint', symbol: 'pt', factor: 0.473176473 }, { name: 'US quart', symbol: 'qt', factor: 0.946352946 },
      { name: 'US gallon', symbol: 'US gal', factor: 3.785411784 }, { name: 'Imperial gallon', symbol: 'imp gal', factor: 4.54609 },
    ]
  },
  speed: {
    label: 'Speed', units: [
      { name: 'Metre per second', symbol: 'm/s', factor: 1 }, { name: 'Kilometre per hour', symbol: 'km/h', factor: 1 / 3.6 },
      { name: 'Mile per hour', symbol: 'mph', factor: 0.44704 }, { name: 'Foot per second', symbol: 'ft/s', factor: 0.3048 },
      { name: 'Knot', symbol: 'kn', factor: 0.514444444444 }, { name: 'Speed of light', symbol: 'c', factor: 299_792_458 },
    ]
  },
  time: {
    label: 'Time', units: [
      { name: 'Nanosecond', symbol: 'ns', factor: 1e-9 }, { name: 'Microsecond', symbol: 'μs', factor: 1e-6 },
      { name: 'Millisecond', symbol: 'ms', factor: 0.001 }, { name: 'Second', symbol: 's', factor: 1 },
      { name: 'Minute', symbol: 'min', factor: 60 }, { name: 'Hour', symbol: 'hr', factor: 3600 },
      { name: 'Day', symbol: 'day', factor: 86400 }, { name: 'Week', symbol: 'week', factor: 604800 },
      { name: 'Average month', symbol: 'mo', factor: 2629746 }, { name: 'Average Gregorian year', symbol: 'yr', factor: 31556952 },
    ]
  },
  data: {
    label: 'Data Storage', units: [
      { name: 'Bit', symbol: 'b', factor: 1 }, { name: 'Byte', symbol: 'B', factor: 8 },
      { name: 'Kilobit', symbol: 'kb', factor: 1e3 }, { name: 'Kilobyte', symbol: 'kB', factor: 8e3 },
      { name: 'Megabit', symbol: 'Mb', factor: 1e6 }, { name: 'Megabyte', symbol: 'MB', factor: 8e6 },
      { name: 'Gigabit', symbol: 'Gb', factor: 1e9 }, { name: 'Gigabyte', symbol: 'GB', factor: 8e9 },
      { name: 'Terabyte', symbol: 'TB', factor: 8e12 }, { name: 'Kibibyte', symbol: 'KiB', factor: 8 * 1024 },
      { name: 'Mebibyte', symbol: 'MiB', factor: 8 * 1024 ** 2 }, { name: 'Gibibyte', symbol: 'GiB', factor: 8 * 1024 ** 3 },
      { name: 'Tebibyte', symbol: 'TiB', factor: 8 * 1024 ** 4 },
    ]
  },
}

export function convertLinear(value: number, from: string, to: string, category: keyof typeof unitCategories) {
  const group = unitCategories[category]
  const fromUnit = group.units.find((unit) => unit.symbol === from)
  const toUnit = group.units.find((unit) => unit.symbol === to)
  if (!fromUnit || !toUnit) throw new Error('Choose valid units.')
  const result = value * fromUnit.factor / toUnit.factor
  if (!Number.isFinite(result)) throw new Error('This value is too large to convert.')
  return result
}

export const temperatureUnits = [
  { name: 'Celsius', symbol: '°C' }, { name: 'Fahrenheit', symbol: '°F' }, { name: 'Kelvin', symbol: 'K' },
]

export function convertTemperature(value: number, from: string, to: string) {
  let celsius = value
  if (from === '°F') celsius = (value - 32) * 5 / 9
  if (from === 'K') celsius = value - 273.15
  if (celsius < -273.15 - 1e-10) throw new Error('Temperature cannot be below absolute zero.')
  if (to === '°F') return celsius * 9 / 5 + 32
  if (to === 'K') return celsius + 273.15
  return celsius
}

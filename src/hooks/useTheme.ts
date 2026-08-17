import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

function applyTheme(mode: ThemeMode) {
  const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  const themeColor = document.querySelector('meta[name="theme-color"]')
  themeColor?.setAttribute('content', dark ? '#020617' : '#ffffff')
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('toolnest-theme')
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('toolnest-theme', theme)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => theme === 'system' && applyTheme(theme)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [theme])

  return { theme, setTheme: setThemeState }
}

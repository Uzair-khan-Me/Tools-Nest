import type { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> { name: string; size?: number }

export function Icon({ name, size = 22, ...props }: IconProps) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<string, React.ReactNode> = {
    percent: <><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/><path d="M6 18 18 6"/></>,
    'trend-up': <><path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/></>,
    'trend-down': <><path d="m3 7 6 6 4-4 8 9"/><path d="M15 18h6v-6"/></>,
    divide: <><circle cx="12" cy="5" r="1" fill="currentColor"/><path d="M5 12h14"/><circle cx="12" cy="19" r="1" fill="currentColor"/></>,
    ratio: <><circle cx="12" cy="7" r="1" fill="currentColor"/><circle cx="12" cy="17" r="1" fill="currentColor"/><path d="M5 7h3M16 7h3M5 17h3M16 17h3"/></>,
    sigma: <path d="M18 5H6l6 7-6 7h12"/>,
    shuffle: <><path d="M3 7h3c4 0 5 10 9 10h6"/><path d="m18 14 3 3-3 3M3 17h3c1.5 0 2.6-1.4 3.6-3M14.3 8.6c.3-.9.9-1.6 1.7-1.6h5"/><path d="m18 4 3 3-3 3"/></>,
    tag: <path d="M20 12 12 20 4 12V4h8l8 8Z"/>,
    bank: <><path d="m3 9 9-5 9 5M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/></>,
    coins: <><ellipse cx="9" cy="7" rx="5" ry="3"/><path d="M4 7v4c0 1.7 2.2 3 5 3 1 0 1.9-.2 2.6-.5M4 11v4c0 1.7 2.2 3 5 3 .8 0 1.5-.1 2.2-.3"/><ellipse cx="16" cy="14" rx="4" ry="2.5"/><path d="M12 14v4c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5v-4"/></>,
    receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
    wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h13"/><path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z"/></>,
    heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>,
    flame: <path d="M13.5 2.5c1 4-2.5 5.5-1 8.5 1-1 1.8-2 2-3.5 2.7 2 4.5 4.4 4.5 7.4A7 7 0 0 1 5 15c0-3.8 2.2-7 6.5-10 .2 2.2.5 3.5 2 5"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    'calendar-days': <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M7 14h4M7 17h8"/></>,
    'calendar-plus': <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5h5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></>,
    swap: <><path d="M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4"/></>,
    ruler: <><path d="m4 16 12-12 4 4L8 20H4v-4Z"/><path d="m13 7 4 4M10 10l2 2M7 13l2 2"/></>,
    scale: <><path d="M6 20h12M12 17V7M5 7h14M8 4h8"/><path d="m5 7-3 6h6L5 7Zm14 0-3 6h6l-3-6Z"/></>,
    thermometer: <><path d="M14 14.8V5a4 4 0 0 0-8 0v9.8a6 6 0 1 0 8 0Z"/><path d="M10 17V8"/></>,
    square: <><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 4v3M12 4v2M16 4v3M4 8h3M4 12h2M4 16h3"/></>,
    beaker: <><path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 3h8M7 15h10"/></>,
    gauge: <><path d="M4 19a9 9 0 1 1 16 0"/><path d="m12 13 4-4M7 16h.01M17 16h.01M12 7h.01"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
    calculator: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/></>,
    sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14ZM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6L19 13Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <path d="M5 12h14M14 7l5 5-5 5"/>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    reset: <><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8"/><path d="M4 4v4h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...common} {...props}>{paths[name] || paths.sparkles}</svg>
}

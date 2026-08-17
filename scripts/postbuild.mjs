import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const dist=path.join(root,'dist')
const tools=JSON.parse(fs.readFileSync(path.join(root,'src/data/tools.json'),'utf8'))
const site=(process.env.SITE_URL||process.env.VITE_SITE_URL||'https://toolnest.example').replace(/\/$/,'')
const categories=[
  ['math','Math','Percentages, fractions, ratios, averages and free number tools.'],
  ['finance','Finance','Free calculators for loans, interest, discounts, tax, tips and salary.'],
  ['health','Health','Free BMI, BMR and calorie estimation tools with clear limitations.'],
  ['date-time','Date & Time','Calculate ages, date differences, durations and world time conversions.'],
  ['converters','Converters','Convert length, weight, temperature, area, volume, speed, time and data.'],
  ['everyday-tools','Everyday Tools','Browse practical everyday utilities from ToolNest.'],
]
const legal=[
  ['about','About ToolNest','Learn why ToolNest provides simple, private and free browser-based calculators and converters.'],
  ['contact','Contact ToolNest','Contact ToolNest with corrections, accessibility feedback, privacy questions or tool suggestions.'],
  ['privacy-policy','Privacy Policy','Read how ToolNest handles calculator inputs, local preferences, technical logs and future advertising.'],
  ['terms','Terms of Use','Terms governing use of the free ToolNest calculators, converters and informational content.'],
  ['cookie-policy','Cookie Policy','Learn about ToolNest local storage, PWA caching and future advertising cookies.'],
  ['disclaimer','Disclaimer','Important limitations for ToolNest health, finance, tax, date and conversion results.'],
]
const routes=[
  {path:'/',title:'ToolNest — Free Online Calculators & Converters',description:'Simple, fast and free calculators and converters for math, finance, health, dates and everyday measurements.'},
  {path:'/tools',title:'Free Online Tools — Calculators & Converters | ToolNest',description:'Browse all free ToolNest calculators and converters. Search math, finance, health, date, time and measurement tools.'},
  ...categories.map(([slug,name,description])=>({path:`/category/${slug}`,title:`${name} Tools — Free Online Calculators | ToolNest`,description})),
  ...tools.map(tool=>({path:`/tool/${tool.slug}`,title:tool.seoTitle,description:tool.seoDescription})),
  ...legal.map(([slug,title,description])=>({path:`/${slug}`,title:`${title} | ToolNest`,description})),
]

const source=fs.readFileSync(path.join(dist,'index.html'),'utf8')
const escapeHtml=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
function pageHtml(route){
  const url=`${site}${route.path}`
  let html=source
    .replace(/<title>.*?<\/title>/s,`<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/,`<link rel="canonical" href="${escapeHtml(url)}" />`)
  const social=`\n    <meta property="og:title" content="${escapeHtml(route.title)}" />\n    <meta property="og:description" content="${escapeHtml(route.description)}" />\n    <meta property="og:url" content="${escapeHtml(url)}" />\n    <meta name="twitter:card" content="summary" />`
  return html.replace('</head>',`${social}\n  </head>`)
}
for(const route of routes){
  if(route.path==='/'){fs.writeFileSync(path.join(dist,'index.html'),pageHtml(route));continue}
  const routePath=path.join(dist,route.path.slice(1))
  fs.mkdirSync(path.dirname(routePath),{recursive:true})
  fs.writeFileSync(`${routePath}.html`,pageHtml(route))
  fs.mkdirSync(routePath,{recursive:true})
  fs.writeFileSync(path.join(routePath,'index.html'),pageHtml(route))
}

const now=new Date().toISOString().slice(0,10)
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route=>`  <url><loc>${site}${route.path}</loc><lastmod>${now}</lastmod><changefreq>${route.path.startsWith('/tool/')?'monthly':'weekly'}</changefreq><priority>${route.path==='/'?'1.0':route.path==='/tools'?'0.9':route.path.startsWith('/tool/')?'0.8':'0.6'}</priority></url>`).join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(dist,'sitemap.xml'),xml)
fs.writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)

const entryAssets=[...source.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match=>match[1])
const core=[...new Set(['/', '/manifest.webmanifest','/icons/icon.svg','/icons/icon-192.png','/icons/icon-512.png',...entryAssets])]
const version=crypto.createHash('sha1').update(source).digest('hex').slice(0,10)
const sw=`const CACHE='toolnest-${version}';\nconst CORE=${JSON.stringify(core)};\nself.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('toolnest-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(async()=>await caches.match(event.request)||await caches.match('/')));return}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}))) });\n`
fs.writeFileSync(path.join(dist,'sw.js'),sw)
console.log(`Generated ${routes.length} static route entries, sitemap.xml, robots.txt and service worker for ${site}`)

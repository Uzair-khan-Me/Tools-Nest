import { useEffect } from 'react'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://toolnest.example').replace(/\/$/, '')
interface SEOProps { title: string; description: string; path: string; jsonLd?: Record<string, unknown> | Array<Record<string, unknown>> }

function setMeta(selector:string, attribute:string, value:string){let node=document.head.querySelector<HTMLMetaElement>(selector);if(!node){node=document.createElement('meta');const match=selector.match(/meta\[(name|property)="([^"]+)"\]/);if(match)node.setAttribute(match[1],match[2]);document.head.appendChild(node)}node.setAttribute(attribute,value)}

export function SEO({title,description,path,jsonLd}:SEOProps){useEffect(()=>{document.title=title;setMeta('meta[name="description"]','content',description);setMeta('meta[property="og:title"]','content',title);setMeta('meta[property="og:description"]','content',description);setMeta('meta[property="og:type"]','content','website');setMeta('meta[property="og:url"]','content',`${SITE_URL}${path}`);setMeta('meta[name="twitter:card"]','content','summary');let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=`${SITE_URL}${path}`;document.querySelectorAll('script[data-toolnest-ld]').forEach(node=>node.remove());if(jsonLd){const script=document.createElement('script');script.type='application/ld+json';script.dataset.toolnestLd='true';script.text=JSON.stringify(jsonLd);document.head.appendChild(script)}},[title,description,path,jsonLd]);return null}

export const siteUrl=SITE_URL

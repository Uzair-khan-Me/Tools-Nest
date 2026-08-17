import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { CategoryPage } from './pages/CategoryPage'
import { HomePage } from './pages/HomePage'
import { InfoPage } from './pages/InfoPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ToolPage } from './pages/ToolPage'
import { ToolsPage } from './pages/ToolsPage'

function ScrollToTop(){const{pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:'auto'})},[pathname]);return null}
export default function App(){return <><ScrollToTop/><a href="#main-content" className="fixed left-3 top-3 z-50 -translate-y-20 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white focus:translate-y-0">Skip to content</a><Header/><div id="main-content"><Routes><Route path="/" element={<HomePage/>}/><Route path="/tools" element={<ToolsPage/>}/><Route path="/category/:slug" element={<CategoryPage/>}/><Route path="/tool/:slug" element={<ToolPage/>}/><Route path="/404" element={<NotFoundPage/>}/><Route path="/:page" element={<InfoPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></div><Footer/></>}

import { useEffect, useState, useCallback } from 'react'
import { stages, flatLessons } from './data/curriculum.js'
import { loadDone, PROGRESS_EVENT } from './progress.js'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import TocModal from './components/TocModal.jsx'
import HomePage from './components/HomePage.jsx'
import LessonPage from './components/LessonPage.jsx'
import { IconMoon, IconSun, IconList } from './components/icons.jsx'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function readTheme() {
  const saved = localStorage.getItem('ailearn-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const hash = useHashRoute()
  const [done, setDone] = useState(loadDone)
  const [theme, setTheme] = useState(readTheme)
  const [tocOpen, setTocOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onProg = () => setDone(loadDone())
    window.addEventListener(PROGRESS_EVENT, onProg)
    return () => window.removeEventListener(PROGRESS_EVENT, onProg)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('ailearn-theme', theme)
  }, [theme])

  const route = hash.replace(/^#/, '') || '/'
  const lessonMatch = route.match(/^\/lesson\/([\d.]+)$/)

  const go = useCallback((path) => {
    window.location.hash = path
    setDrawerOpen(false)
    setTocOpen(false)
  }, [])

  const scrollTarget = useCallback(() => {
    // 查看课表：无课表锚点时打开目录弹层
    setTocOpen(true)
  }, [])

  const current = lessonMatch ? flatLessons.find((l) => l.id === lessonMatch[1]) : null

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  return (
    <div className="app">
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} route={route} done={done} go={go} />
      <div className={`sidebar-backdrop ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className="main">
        <TopBar doneCount={done.length} onToc={() => setTocOpen(true)} go={go} />
        {current ? (
          <LessonPage key={current.id} lesson={current} doneSet={new Set(done)} go={go} />
        ) : (
          <HomePage done={new Set(done)} go={go} onSchedule={scrollTarget} />
        )}
      </div>

      <button className="theme-fab" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={theme === 'dark' ? '切换到浅色' : '切换到深色'} aria-label="切换主题">
        {theme === 'dark' ? <IconSun /> : <IconMoon />}
      </button>
      <button className="sidebar-fab" onClick={() => setDrawerOpen(true)} aria-label="打开课程目录">
        <IconList s={14} /> 目录
      </button>
      {tocOpen && <TocModal done={new Set(done)} go={go} onClose={() => setTocOpen(false)} stages={stages} />}
    </div>
  )
}

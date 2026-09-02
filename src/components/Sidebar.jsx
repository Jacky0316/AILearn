import { useState, useEffect } from 'react'
import { stages } from '../data/curriculum.js'
import { IconHome, IconChevron, Ring } from './icons.jsx'

function LessonRow({ lesson, active, done, go }) {
  return (
    <button className={`toc-row lv-lesson ${active ? 'active' : ''}`} onClick={() => go(`/lesson/${lesson.id}`)}>
      <span className="toc-num">{lesson.id}</span>
      <span className="toc-label">{lesson.title}</span>
      <span style={{ color: done ? 'var(--sage)' : 'var(--fg-2)', display: 'inline-flex' }}>
        <Ring size={14} done={done} />
      </span>
    </button>
  )
}

function StageBlock({ stage, route, doneSet, go }) {
  const curLessonId = route.startsWith('/lesson/') ? route.slice('/lesson/'.length) : null
  const containsCur = stage.chapters.some((c) => c.lessons.some((l) => l.id === curLessonId))
  const [open, setOpen] = useState(containsCur)
  const lessons = stage.chapters.flatMap((c) => c.lessons)
  const doneCount = lessons.filter((l) => doneSet.has(l.id)).length

  // 当前课变化时自动展开所在阶段
  useEffect(() => {
    if (containsCur) setOpen(true)
  }, [containsCur])

  return (
    <div className="toc-group">
      <button className="toc-row lv-stage" onClick={() => setOpen(!open)}>
        <span className="toc-num">{stage.id}</span>
        <span className="toc-label">{stage.title}</span>
        <span className={`toc-chevron ${open ? 'open' : ''}`} style={{ display: 'inline-flex' }}>
          <IconChevron s={13} />
        </span>
        <Ring size={15} pct={(doneCount / lessons.length) * 100} done={doneCount === lessons.length} />
      </button>
      {open && (
        <div>
          {stage.chapters.map((ch) => (
            <div key={ch.id} className="toc-group">
              <div className="toc-row lv-chapter" style={{ cursor: 'default' }}>
                <span className="toc-num">{ch.id}</span>
                <span className="toc-label">{ch.title}</span>
              </div>
              {ch.lessons.map((l) => (
                <LessonRow key={l.id} lesson={l} done={doneSet.has(l.id)}
                  active={curLessonId === l.id} go={go} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ open, onClose, route, done, go }) {
  const doneSet = new Set(done)
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-head">课程目录</div>
      <div className="sidebar-scroll">
        <button className={`toc-row ${route === '/' ? 'active' : ''}`} onClick={() => go('/')}>
          <IconHome s={14} />
          <span className="toc-label" style={{ fontWeight: 600 }}>课程首页</span>
        </button>
        {stages.map((s) => (
          <StageBlock key={s.id} stage={s} route={route} doneSet={doneSet} go={go} />
        ))}
      </div>
    </aside>
  )
}

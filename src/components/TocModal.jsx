import { useEffect } from 'react'
import { repos } from '../data/curriculum.js'
import { IconX, Ring } from './icons.jsx'

export default function TocModal({ stages, done, go, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="toc-modal-backdrop" onClick={onClose}>
      <div className="toc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="课程目录">
        <div className="toc-modal-head">
          <h3>课程目录</h3>
          <button className="toc-modal-close" onClick={onClose} aria-label="关闭"><IconX /></button>
        </div>
        {stages.map((s) => {
          const lessons = s.chapters.flatMap((c) => c.lessons)
          const dn = lessons.filter((l) => done.has(l.id)).length
          return (
            <div key={s.id} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="stage-eyebrow" style={{ letterSpacing: '0.1em' }}>{s.num}</span>
                <b style={{ fontSize: 15 }}>{s.title}</b>
                <span style={{ marginLeft: 'auto', color: 'var(--sage)', display: 'inline-flex' }}>
                  <Ring size={16} pct={(dn / lessons.length) * 100} done={dn === lessons.length} />
                </span>
              </div>
              {s.chapters.map((c) => (
                <div key={c.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--fg-2)', margin: '8px 0 4px' }}>
                    {c.id} {c.title}
                  </div>
                  {c.lessons.map((l) => (
                    <button key={l.id} className="toc-row lv-lesson" onClick={() => go(`/lesson/${l.id}`)}>
                      <span className="toc-num">{l.id}</span>
                      <span className="toc-label">{l.title}</span>
                      <span style={{ color: done.has(l.id) ? 'var(--sage)' : 'var(--fg-2)', display: 'inline-flex' }}>
                        <Ring size={13} done={done.has(l.id)} />
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )
        })}
        <div style={{ borderTop: '1px solid var(--hair-1)', paddingTop: 14, fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.8 }}>
          知识来源：{Object.values(repos).map((r) => r.name).join(' · ')}
        </div>
      </div>
    </div>
  )
}

import { stages, flatLessons, totalLessons, repos } from '../data/curriculum.js'
import { firstUndone } from '../progress.js'
import { Ring, IconCheck, IconArrow } from './icons.jsx'

function StageCard({ stage, done, go }) {
  return (
    <section className="stage-card" id={`stage-${stage.id}`}>
      <div className="stage-eyebrow">{stage.num}</div>
      <h2 className="stage-title">{stage.title}</h2>
      <div className="stage-meta">{stage.meta}</div>
      <p className="stage-desc">{stage.desc}</p>

      {stage.chapters.map((ch) => {
        const dn = ch.lessons.filter((l) => done.has(l.id)).length
        return (
          <div className="chapter-block" key={ch.id}>
            <div className="chapter-head">
              <span className="chapter-num">{ch.id}</span>
              <span className="chapter-title">{ch.title}</span>
              <span className="chapter-goal">{ch.goal}</span>
              <span style={{ color: 'var(--sage)', display: 'inline-flex', flex: 'none' }}>
                <Ring size={16} pct={(dn / ch.lessons.length) * 100} done={dn === ch.lessons.length} />
              </span>
            </div>
            <div className="lesson-grid">
              {ch.lessons.map((l) => (
                <button className="lesson-card" key={l.id} onClick={() => go(`/lesson/${l.id}`)} title={l.summary}>
                  <span className="lc-num">{l.id}</span>
                  <span className="lc-title">{l.title}</span>
                  {done.has(l.id) && (
                    <span className="lc-check"><IconCheck s={14} /></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default function HomePage({ done, go, onSchedule }) {
  const start = firstUndone(flatLessons)
  const doneCount = done.size

  return (
    <main className="home">
      <div className="hero">
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => go(`/lesson/${start.id}`)}>
            {doneCount > 0 ? '继续学习' : '开始第一课'} <IconArrow s={14} />
          </button>
          <button className="btn btn-ghost" onClick={onSchedule}>查看课表</button>
        </div>
      </div>
      <hr className="hero-divider" />

      {stages.map((s) => <StageCard key={s.id} stage={s} done={done} go={go} />)}

      <section className="stage-card" style={{ padding: '28px 32px' }}>
        <div className="stage-eyebrow">知识来源 · SOURCES</div>
        <p className="stage-desc" style={{ marginTop: 10 }}>
          本站共 {totalLessons} 课，知识内容整理自以下开源项目，每课的「来源与延伸」都自动匹配到对应章节原文：
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginTop: 16 }}>
          {Object.values(repos).map((r) => (
            <a key={r.key} className="source-card" href={r.url} target="_blank" rel="noreferrer">
              <span className="s-repo">{r.name}</span>
              <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{r.desc}</span>
            </a>
          ))}
        </div>
        <p className="source-note">
          设计语言参考 buynao/aipath（暖纸质感 · 墨色品牌 · 红陶强调）；界面工程方法论参考 JCodesMore/ai-website-cloner-template。所有课程正文为本站原创提炼，知识版权归各来源项目所有。
        </p>
      </section>
    </main>
  )
}

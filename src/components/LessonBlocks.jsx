import { IconPlay, IconScroll, IconBook, IconLink, IconExternal, IconTarget, IconCheck, IconRoute } from './icons.jsx'

// 6 层学习路径条：点击平滑滚动到对应区块（不改动 hash，避免影响路由）
export const PATH_STEPS = [
  { key: 'concepts', label: '直觉' },
  { key: 'deepdive', label: '原理深挖' },
  { key: 'videos', label: '视频讲座' },
  { key: 'papers', label: '源头论文' },
  { key: 'readings', label: '权威资料' },
  { key: 'pm', label: '产品与实践' },
]

export function LearningPath({ presence }) {
  const jump = (key) => {
    const el = document.getElementById(`sec-${key}`) ||
      (key === 'pm' && document.getElementById('sec-sources'))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div className="path-strip" aria-label="本课学习路径">
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-2)', fontWeight: 600, marginRight: 2 }}>
        <IconRoute s={13} /> 学习路径
      </span>
      {PATH_STEPS.map((s, i) => (
        <button key={s.key} className={`path-chip ${presence[s.key] ? '' : 'dim'}`}
          onClick={() => presence[s.key] && jump(s.key)}
          title={presence[s.key] ? `跳到「${s.label}」` : '本课暂无此层'}>
          <span className="p-idx">{i + 1}</span> {s.label}
        </button>
      ))}
    </div>
  )
}

// 原理深挖：[{ t: 小标题(可选), body: [段落 | {formula}] }]
export function DeepDive({ items }) {
  return (
    <div className="deepdive">
      {items.map((item, i) => (
        <div key={i}>
          {item.t && <h4>{item.t}</h4>}
          {item.body.map((p, j) =>
            typeof p === 'object' && p.formula
              ? <code className="formula" key={j}>{p.formula}</code>
              : <p key={j}>{p}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// 按 URL 域名生成「阅读原文」标签（非 arXiv 论文要如实标注来源）
function sourceLabel(url) {
  const u = url || ''
  if (u.includes('arxiv.org')) return '阅读原文 (arXiv)'
  if (u.includes('nature.com')) return '阅读原文 (Nature)'
  if (u.includes('dl.acm.org')) return '阅读原文 (ACM)'
  if (u.includes('cdn.openai.com') || u.includes('openai.com')) return '阅读原文 (OpenAI)'
  if (u.includes('deeplearningbook.org')) return '阅读原文 (官方免费全文)'
  if (u.includes('incompleteideas.net')) return '阅读原文 (官方免费全文)'
  if (u.includes('nlp.stanford.edu')) return '阅读原文 (Stanford NLP)'
  if (u.includes('cs229.stanford.edu')) return '阅读原文 (Stanford 讲义)'
  if (u.includes('github.com')) return '阅读原文 (GitHub)'
  if (u.includes('uwaterloo.ca')) return '阅读原文 (SIGIR)'
  if (u.includes('gorilla.cs.berkeley.edu')) return '阅读原文 (Berkeley)'
  if (u.includes('langfuse.com')) return '阅读原文 (官方文档)'
  return '阅读原文'
}

export function PaperList({ papers }) {
  return (
    <div>
      {papers.map((p, i) => (
        <a className="paper-card" key={i} href={p.url} target="_blank" rel="noreferrer" style={{ display: 'block', color: 'inherit' }}>
          <div className="paper-head">
            <span className="paper-year">{p.year}</span>
            <div className="paper-titleline">
              <div className="paper-title">{p.title}</div>
              <div className="paper-authors">{p.authors}{p.venue ? ` · ${p.venue}` : ''}</div>
            </div>
          </div>
          <div className="paper-why"><b>为什么是源头：</b>{p.why}</div>
          {(p.contributions || p.pmLens) && (
            <details>
              <summary>展开：核心贡献 与 产品经理视角</summary>
              {p.contributions && (
                <div className="paper-contrib">
                  {p.contributions.map((c, j) => (
                    <div className="c-row" key={j}><span className="dot">◆</span><span>{c}</span></div>
                  ))}
                </div>
              )}
              {p.pmLens && (
                <div className="paper-pm"><b>PM 视角：</b>{p.pmLens}</div>
              )}
            </details>
          )}
          <span className="paper-open">{sourceLabel(p.url)} <IconExternal /></span>
        </a>
      ))}
    </div>
  )
}

export function VideoList({ videos }) {
  return (
    <div>
      {videos.map((v, i) => (
        <a className="video-card" key={i} href={v.url} target="_blank" rel="noreferrer">
          <span className="video-thumb"><IconPlay /></span>
          <div className="video-body">
            <div className="v-title">{v.title}</div>
            <div className="v-meta">
              <span>{v.speaker}</span>
              {v.minutes && <span className="v-dur">{v.minutes} 分钟</span>}
              {v.lang === 'en' && <span>英文</span>}
            </div>
            {v.why && <div className="v-why">{v.why}</div>}
          </div>
        </a>
      ))}
    </div>
  )
}

export function ReadingList({ readings }) {
  return (
    <div>
      {readings.map((r, i) => (
        <a className="reading-card" key={i} href={r.url} target="_blank" rel="noreferrer">
          <span className="r-ico">{r.kind === 'paper' ? <IconBook /> : <IconLink />}</span>
          <div style={{ minWidth: 0 }}>
            <div className="r-title">{r.title}</div>
            <div className="r-meta">{r.author}</div>
            {r.why && <div className="r-why">{r.why}</div>}
          </div>
        </a>
      ))}
    </div>
  )
}

export function PMBlock({ lens }) {
  return (
    <div className="pm-block">
      {lens.map((p, i) => (
        <div className="pm-row" key={i}>
          <span className="pm-check"><IconTarget s={15} /></span>
          <span>{p}</span>
        </div>
      ))}
    </div>
  )
}

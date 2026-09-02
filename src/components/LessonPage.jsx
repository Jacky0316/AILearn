import { flatLessons, repos, lessonIndex } from '../data/curriculum.js'
import { toggleDone } from '../progress.js'
import content from '../content/index.js'
import { LearningPath, DeepDive, PaperList, VideoList, ReadingList, PMBlock } from './LessonBlocks.jsx'
import {
  IconArrow, IconCheck, IconClock, IconBook, IconTarget, IconBulb, IconPlay,
  IconAlert, IconPen, IconLink, IconExternal, IconScroll,
} from './icons.jsx'

function Pill({ tone, label }) {
  return <span className={`pill pill-${tone}`}>{label}</span>
}

function Section({ id, icon, title, children }) {
  return (
    <section className="lsec" id={id}>
      <div className="lsec-eyebrow"><span className="ico">{icon}</span>{title}</div>
      {children}
    </section>
  )
}

export default function LessonPage({ lesson, doneSet, go }) {
  const c = content[lesson.id] || {}
  const idx = lessonIndex(lesson.id)
  const prev = idx > 0 ? flatLessons[idx - 1] : null
  const next = idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null
  const isDone = doneSet.has(lesson.id)

  const videoMin = (c.videos || []).reduce((s, v) => s + (v.minutes || 0), 0)
  const paperMin = (c.papers || []).length * 8
  const presence = {
    concepts: !!c.concepts,
    deepdive: !!c.deepDive,
    videos: !!c.videos?.length,
    papers: !!c.papers?.length,
    readings: !!c.readings?.length,
    pm: !!c.pmLens?.length || !!lesson.sources?.length,
  }

  return (
    <main className="lesson-page" key={lesson.id}>
      <div className="lesson-hero">
        <nav className="breadcrumb">
          <a href="#/" onClick={(e) => { e.preventDefault(); go('/') }}>课程首页</a>
          <span className="sep">/</span>
          <span>{lesson.stageNum}</span>
          <span className="sep">/</span>
          <a href="#/" onClick={(e) => { e.preventDefault(); go('/') }}>
            {lesson.stageTitle}
          </a>
          <span className="sep">/</span>
          <span>{lesson.chapterId} {lesson.chapterTitle}</span>
          <span className="sep">/</span>
          <span className="cur">{lesson.id} {lesson.title}</span>
        </nav>
        <h1 className="lesson-title">{lesson.title}</h1>
        <p className="lesson-sub">{lesson.summary}</p>
        <div className="lesson-meta">
          <span className="meta-dot" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <IconClock /> 深读约 {lesson.minutes} 分钟
          </span>
          {videoMin > 0 && <><span className="meta-dot">·</span><span className="meta-dot">讲座 {videoMin} 分钟</span></>}
          {paperMin > 0 && <><span className="meta-dot">·</span><span className="meta-dot">论文约 {paperMin} 分钟</span></>}
          <span className="meta-dot">·</span>
          <span className="meta-dot">{lesson.level}</span>
          {lesson.tags.map((t) => <Pill key={t.label} tone={t.tone} label={t.label} />)}
        </div>
        <LearningPath presence={presence} />
        <hr className="lesson-divider" />
      </div>

      {c.goals && (
        <Section id="sec-goals" icon={<IconTarget />} title="学完这课你会">
          <div className="goals">
            {c.goals.map((g, i) => (
              <div className="goal-row" key={i}>
                <span className="g-check"><IconCheck s={14} /></span>
                <span>{g}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.concepts && (
        <Section id="sec-concepts" icon={<IconBulb />} title="① 直觉 · 核心概念">
          {c.concepts.map((k, i) => (
            <article className="concept-card" key={i}>
              <h3><span className="c-idx">{i + 1}</span>{k.t}</h3>
              {(Array.isArray(k.body) ? k.body : [k.body]).map((p, j) => <p key={j}>{p}</p>)}
            </article>
          ))}
        </Section>
      )}

      {c.deepDive && (
        <Section id="sec-deepdive" icon={<IconScroll />} title="② 原理深挖 · 机制与边界">
          <DeepDive items={c.deepDive} />
        </Section>
      )}

      {c.videos?.length > 0 && (
        <Section id="sec-videos" icon={<IconPlay />} title="③ 视频讲座 · 看最好的讲者怎么讲">
          <VideoList videos={c.videos} />
        </Section>
      )}

      {c.papers?.length > 0 && (
        <Section id="sec-papers" icon={<IconBook />} title="④ 源头论文 · 追到最初提出的地方">
          <PaperList papers={c.papers} />
        </Section>
      )}

      {c.readings?.length > 0 && (
        <Section id="sec-readings" icon={<IconLink />} title="⑤ 权威资料 · 最佳解读与官方文档">
          <ReadingList readings={c.readings} />
        </Section>
      )}

      {c.mistakes && c.mistakes.length > 0 && (
        <Section id="sec-mistakes" icon={<IconAlert />} title="常见误区">
          {c.mistakes.map((m, i) => (
            <div className="mistake-pair" key={i}>
              <div className="m-card m-wrong">
                <span className="m-tag">✗ 常见理解</span>
                <div className="m-body">{m.wrong}</div>
              </div>
              <div className="m-card m-right">
                <span className="m-tag">✓ 更准确的解释</span>
                <div className="m-body">{m.right}</div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {c.practice && (
        <Section id="sec-practice" icon={<IconPen />} title="小练习">
          <div className="practice">
            <div className="p-task">{c.practice.task}</div>
            {c.practice.hint && <div className="p-hint">提示：{c.practice.hint}</div>}
            {c.practice.answer && (
              <details>
                <summary>查看参考答案</summary>
                <div className="p-ans">{c.practice.answer}</div>
              </details>
            )}
          </div>
        </Section>
      )}

      {c.pmLens?.length > 0 && (
        <Section id="sec-pm" icon={<IconTarget />} title="⑥ 产品视角 · 转化为你的产品决策">
          <PMBlock lens={c.pmLens} />
        </Section>
      )}

      {lesson.sources && lesson.sources.length > 0 && (
        <Section id="sec-sources" icon={<IconLink />} title="动手实践 · 自动匹配的开源项目章节">
          <div className="source-grid">
            {lesson.sources.map((s, i) => (
              <a className="source-card" key={i} href={s.url} target="_blank" rel="noreferrer">
                <span className="s-repo">{repos[s.repo].name}</span>
                <span className="s-ref">{s.ref}</span>
                <span className="s-open">打开原文 <IconExternal /></span>
              </a>
            ))}
          </div>
          <p className="source-note">以上链接指向开源项目的对应章节，可作为本课的动手实践材料。</p>
        </Section>
      )}

      <div className="complete-row">
        <button className={`complete-btn ${isDone ? 'done' : ''}`} onClick={() => toggleDone(lesson.id)}>
          {isDone ? <><IconCheck s={15} /> 已完成本课</> : '标记为已完成'}
        </button>
      </div>

      <nav className="pager">
        {prev ? (
          <a href={`#/lesson/${prev.id}`} onClick={(e) => { e.preventDefault(); go(`/lesson/${prev.id}`) }}>
            <div className="pg-label">← 上一课 · {prev.id}</div>
            <div className="pg-title">{prev.title}</div>
          </a>
        ) : (
          <div className="pg-empty">已是第一课</div>
        )}
        {next ? (
          <a className="next" href={`#/lesson/${next.id}`} onClick={(e) => { e.preventDefault(); go(`/lesson/${next.id}`) }}>
            <div className="pg-label">下一课 · {next.id} →</div>
            <div className="pg-title">{next.title}</div>
          </a>
        ) : (
          <div className="pg-empty">已通关全部 {flatLessons.length} 课 🎉</div>
        )}
      </nav>
    </main>
  )
}

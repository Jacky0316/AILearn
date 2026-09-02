import { totalLessons } from '../data/curriculum.js'
import { IconList } from './icons.jsx'

export default function TopBar({ doneCount, onToc, go }) {
  return (
    <header className="topbar">
      <a className="brand" href="#/" onClick={(e) => { e.preventDefault(); go('/') }}>
        <span className="brand-mark">
          <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
            <circle cx="6.5" cy="6.5" r="4.5" fill="#FAF6EC" />
          </svg>
        </span>
        AILearn
      </a>
      <div className="topbar-right">
        <span className="progress-chip"><b>{doneCount}</b> / {totalLessons}</span>
        <button className="toc-btn" onClick={onToc}>
          <IconList s={14} /> 目录
        </button>
      </div>
    </header>
  )
}

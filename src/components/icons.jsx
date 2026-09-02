// 内联 SVG 图标集（1.5px 描边，线性风格）
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
const sz = (n) => ({ width: n, height: n, viewBox: '0 0 24 24', 'aria-hidden': true })

export const IconHome = ({ s = 15 }) => (
  <svg {...sz(s)} {...base}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
)
export const IconChevron = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="m9 6 6 6-6 6" /></svg>
)
export const IconCheck = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="m4.5 12.5 5 5 10-11" /></svg>
)
export const IconList = ({ s = 15 }) => (
  <svg {...sz(s)} {...base}><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" strokeWidth="2.4" /></svg>
)
export const IconMoon = ({ s = 17 }) => (
  <svg {...sz(s)} {...base}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>
)
export const IconSun = ({ s = 17 }) => (
  <svg {...sz(s)} {...base}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
  </svg>
)
export const IconX = ({ s = 15 }) => (
  <svg {...sz(s)} {...base}><path d="M5 5l14 14M19 5 5 19" /></svg>
)
export const IconExternal = ({ s = 12 }) => (
  <svg {...sz(s)} {...base}><path d="M14 4h6v6" /><path d="M20 4 10.5 13.5" /><path d="M19 13.5V20H4V5h6.5" /></svg>
)
export const IconArrow = ({ s = 13, dir = 'right' }) => (
  <svg {...sz(s)} {...base} style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></svg>
)
export const IconClock = ({ s = 13 }) => (
  <svg {...sz(s)} {...base}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
)
export const IconBook = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /></svg>
)
export const IconTarget = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></svg>
)
export const IconBulb = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="M9 18h6M10 21h4" /><path d="M12 3a6.5 6.5 0 0 1 4 11.6c-.8.6-1 1.4-1 2.4h-6c0-1-.2-1.8-1-2.4A6.5 6.5 0 0 1 12 3Z" /></svg>
)
export const IconAlert = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="M12 3.5 2.5 20h19L12 3.5Z" /><path d="M12 10v4.5M12 17.5h.01" strokeWidth="2" /></svg>
)
export const IconPen = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="m14.5 5.5 4 4L8 20H4v-4L14.5 5.5Z" /><path d="m12.5 7.5 4 4" /></svg>
)
export const IconLink = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="M9 15 15 9" /><path d="M10.5 6.5 12 5a4.6 4.6 0 0 1 6.5 6.5l-1.5 1.5" /><path d="M13.5 17.5 12 19a4.6 4.6 0 0 1-6.5-6.5L7 11" /></svg>
)
export const IconPlay = ({ s = 16 }) => (
  <svg {...sz(s)} {...base}><circle cx="12" cy="12" r="8.5" /><path d="M10 8.8v6.4L15.2 12 10 8.8Z" fill="currentColor" stroke="none" /></svg>
)
export const IconScroll = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><path d="M7 3h11a1.5 1.5 0 0 1 1.5 1.5V17" /><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2v-1.5H7" /><path d="M9.5 8h6M9.5 12h6" /></svg>
)
export const IconRoute = ({ s = 14 }) => (
  <svg {...sz(s)} {...base}><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="5.5" r="2.5" /><path d="M8 18.5h6a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4H9a3 3 0 0 1 0-6" /></svg>
)

// 进度圈：done=实心勾，else 空圈（pct 0-100 可选）
export function Ring({ size = 16, done = false, pct = 0, stroke = 1.8 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const p = done ? 100 : pct
  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c * (1 - p / 100)} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {done && (
        <path d={`M ${size * 0.28} ${size * 0.52} l ${size * 0.14} ${size * 0.14} l ${size * 0.28} -${size * 0.3}`}
          fill="none" stroke="currentColor" strokeWidth={stroke + 0.4} strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

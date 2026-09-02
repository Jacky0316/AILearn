// 学习进度：localStorage 持久化 + window 事件通知
const KEY = 'ailearn-progress-v1'
export const PROGRESS_EVENT = 'ailearn-progress'

export function loadDone() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

function persist(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT))
}

export function markDone(id) {
  const list = loadDone()
  if (!list.includes(id)) persist([...list, id])
}

export function unmarkDone(id) {
  persist(loadDone().filter((x) => x !== id))
}

export function toggleDone(id) {
  const list = loadDone()
  list.includes(id) ? unmarkDone(id) : markDone(id)
}

// 第一个未完成的课（全部完成则回到第一课）
export function firstUndone(lessons) {
  return lessons.find((l) => !loadDone().includes(l.id)) || lessons[0]
}

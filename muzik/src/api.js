import { demoTracks } from './data/demo'

// Si le serveur ou Deezer est injoignable, on bascule en mode démo
async function get(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error('API indisponible')
  return res.json()
}

export async function searchTracks(q) {
  try {
    const { tracks } = await get(`/api/search?q=${encodeURIComponent(q)}`)
    return { tracks, demo: false }
  } catch {
    const s = q.toLowerCase()
    const found = demoTracks.filter((t) => `${t.name} ${t.artists}`.toLowerCase().includes(s))
    return { tracks: found.length ? found : demoTracks, demo: true }
  }
}

export async function getChart() {
  try {
    const { tracks } = await get('/api/chart')
    return { tracks, demo: false }
  } catch {
    return { tracks: demoTracks, demo: true }
  }
}

export async function getTrack(id) {
  try {
    return { track: await get(`/api/track/${encodeURIComponent(id)}`), demo: false }
  } catch {
    return { track: demoTracks.find((t) => t.id === id) ?? null, demo: true }
  }
}

export const formatDuration = (ms) => {
  const s = Math.round(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

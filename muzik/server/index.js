import express from 'express'

// Petit proxy vers l'API publique Deezer (pas de clé ni de compte nécessaires).
// Le navigateur ne peut pas appeler Deezer directement (pas de CORS), d'où ce serveur.
const app = express()
const PORT = process.env.PORT || 3001

async function deezer(path) {
  const res = await fetch(`https://api.deezer.com${path}`)
  if (!res.ok) throw Object.assign(new Error(`Deezer ${res.status}`), { status: 502 })
  const data = await res.json()
  if (data.error) {
    throw Object.assign(new Error(data.error.message || 'Erreur Deezer'), {
      status: data.error.code === 800 ? 404 : 502
    })
  }
  return data
}

const normalize = (t) => ({
  id: String(t.id),
  name: t.title,
  artists: t.artist?.name ?? '',
  album: t.album?.title ?? '',
  image: t.album?.cover_medium ?? t.album?.cover ?? null,
  imageBig: t.album?.cover_big ?? t.album?.cover_medium ?? null,
  duration: (t.duration ?? 0) * 1000,
  preview: t.preview || null, // extrait mp3 de 30 secondes
  url: t.link ?? null
})

const handle = (fn) => async (req, res) => {
  try {
    res.json(await fn(req))
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message })
  }
}

app.get('/api/search', handle(async (req) => {
  const q = String(req.query.q || '').trim()
  if (!q) return { tracks: [] }
  const data = await deezer(`/search?q=${encodeURIComponent(q)}&limit=20`)
  return { tracks: data.data.map(normalize) }
}))

app.get('/api/chart', handle(async () => {
  const data = await deezer('/chart/0/tracks?limit=12')
  return { tracks: data.data.map(normalize) }
}))

// Les liens d'extraits expirent : on redemande un lien frais au moment de jouer
app.get('/api/track/:id', handle(async (req) => {
  return normalize(await deezer(`/track/${encodeURIComponent(req.params.id)}`))
}))

app.listen(PORT, () => console.log(`API Muzik sur http://localhost:${PORT}`))

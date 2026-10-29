<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchTracks } from '../api'
import { player, playFrom } from '../store'
import TrackCard from '../components/TrackCard.vue'

const route = useRoute()
const router = useRouter()
const q = ref(String(route.query.q || ''))
const tracks = ref([])
const loading = ref(false)
const demo = ref(false)
const searched = ref(false)
let timer

async function run(term) {
  if (!term.trim()) { tracks.value = []; searched.value = false; return }
  loading.value = true
  const res = await searchTracks(term)
  tracks.value = res.tracks
  demo.value = res.demo
  searched.value = true
  loading.value = false
}

watch(q, (v) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    router.replace({ query: v ? { q: v } : {} })
    run(v)
  }, 400)
})

if (q.value) run(q.value)

const isActive = (t) => player.queue[player.index]?.id === t.id
</script>

<template>
  <h1>Recherche</h1>
  <label class="search">
    <span class="sr-only">Titre, artiste ou album</span>
    <input v-model="q" type="search" placeholder="Titre, artiste ou album" autofocus />
  </label>

  <p v-if="demo && searched" class="notice">
    Mode démo : l'API Deezer n'est pas joignable. Lance le projet avec <code>npm run dev</code> et vérifie ta connexion internet.
  </p>
  <p v-if="loading" class="muted">Recherche en cours…</p>
  <p v-else-if="!searched" class="muted">Tape au moins un mot pour voir des résultats.</p>
  <p v-else-if="!tracks.length" class="muted">Aucun résultat pour « {{ q }} ». Essaie un autre nom.</p>

  <div class="grid" v-if="tracks.length">
    <TrackCard
      v-for="(t, i) in tracks" :key="t.id" :track="t" :active="isActive(t)"
      @play="playFrom(tracks, i)"
    />
  </div>
</template>

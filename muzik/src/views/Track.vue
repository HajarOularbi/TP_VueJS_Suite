<script setup>
import { ref, onMounted } from 'vue'
import { getTrack, formatDuration } from '../api'
import { playFrom } from '../store'

const props = defineProps({ id: String })
const track = ref(null)
const loading = ref(true)

onMounted(async () => {
  const r = await getTrack(props.id)
  track.value = r.track
  loading.value = false
})
</script>

<template>
  <p v-if="loading" class="muted">Chargement…</p>
  <p v-else-if="!track" class="muted">Titre introuvable. <RouterLink to="/search">Retour à la recherche</RouterLink></p>
  <section v-else class="detail">
    <div class="detail-cover">
      <img v-if="track.imageBig || track.image" :src="track.imageBig || track.image" :alt="`Pochette de ${track.album}`" />
      <span v-else class="cover-fallback" aria-hidden="true">♪</span>
    </div>
    <div class="detail-body">
      <h1>{{ track.name }}</h1>
      <p class="card-sub">{{ track.artists }} — {{ track.album }}</p>
      <p class="card-meta">{{ formatDuration(track.duration) }}</p>
      <div class="row">
        <button class="btn" @click="playFrom([track], 0)">Écouter l'extrait</button>
        <a v-if="track.url" :href="track.url" target="_blank" rel="noopener" class="btn btn-ghost">Ouvrir sur Deezer</a>
      </div>
    </div>
  </section>
</template>

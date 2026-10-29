<script setup>
import { formatDuration } from '../api'
defineProps({ track: { type: Object, required: true }, active: Boolean })
defineEmits(['play'])
</script>

<template>
  <article class="card" :class="{ active }">
    <button class="card-play" :aria-label="`Écouter ${track.name}`" @click="$emit('play')">
      <img v-if="track.image" :src="track.image" :alt="`Pochette de ${track.album}`" loading="lazy" />
      <span v-else class="cover-fallback" aria-hidden="true">♪</span>
      <span class="play-badge" aria-hidden="true">▶</span>
    </button>
    <RouterLink :to="{ name: 'track', params: { id: track.id } }" class="card-title">{{ track.name }}</RouterLink>
    <p class="card-sub">{{ track.artists }}</p>
    <p class="card-meta">{{ formatDuration(track.duration) }}</p>
  </article>
</template>

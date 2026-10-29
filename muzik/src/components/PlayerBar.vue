<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { player, next, prev } from '../store'
import { getTrack, formatDuration } from '../api'

const audio = ref(null)
const time = ref(0)
const duration = ref(30)
const volume = ref(0.8)
const message = ref('')

const track = computed(() => player.queue[player.index] ?? null)

watch(track, async (t) => {
  message.value = ''
  time.value = 0
  if (!t) return
  await nextTick()
  const el = audio.value
  if (t.id.startsWith('demo-')) {
    el.removeAttribute('src')
    player.playing = false
    message.value = 'Mode démo : pas d’audio. Lance « npm run dev » avec internet pour écouter.'
    return
  }
  // lien d'extrait frais (les liens Deezer expirent)
  const { track: fresh } = await getTrack(t.id)
  const src = fresh?.preview || t.preview
  if (!src) {
    el.removeAttribute('src')
    player.playing = false
    message.value = 'Aucun extrait disponible pour ce titre.'
    return
  }
  el.src = src
  el.volume = volume.value
  try { await el.play() } catch { player.playing = false }
})

function toggle() {
  const el = audio.value
  if (!el?.src) return
  el.paused ? el.play() : el.pause()
}
function seek(e) { audio.value.currentTime = Number(e.target.value) }
function setVolume(e) { volume.value = Number(e.target.value); audio.value.volume = volume.value }
</script>

<template>
  <audio
    ref="audio"
    @play="player.playing = true"
    @pause="player.playing = false"
    @timeupdate="time = audio.currentTime"
    @loadedmetadata="duration = audio.duration || 30"
    @ended="next()"
    @error="message = 'Lecture impossible pour ce titre.'"
  ></audio>

  <footer class="player" v-if="track" aria-label="Lecteur">
    <div class="player-info">
      <img v-if="track.image" :src="track.image" alt="" class="player-thumb" />
      <span v-else class="player-thumb cover-fallback" aria-hidden="true">♪</span>
      <div class="player-text">
        <strong>{{ track.name }}</strong>
        <span>{{ track.artists }}</span>
      </div>
    </div>

    <div class="player-center">
      <div class="controls">
        <button class="ctl" aria-label="Titre précédent" :disabled="player.index <= 0" @click="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM9.5 12L18 6v12z" /></svg>
        </button>
        <button class="ctl ctl-main" :aria-label="player.playing ? 'Pause' : 'Lecture'" @click="toggle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="player.playing" d="M6 5h4v14H6zM14 5h4v14h-4z" />
            <path v-else d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button class="ctl" aria-label="Titre suivant" :disabled="player.index >= player.queue.length - 1" @click="next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 18V6l8.5 6z" /></svg>
        </button>
      </div>
      <p v-if="message" class="player-msg">{{ message }}</p>
      <div v-else class="seek">
        <span>{{ formatDuration(time * 1000) }}</span>
        <input type="range" min="0" :max="duration" step="0.1" :value="time" aria-label="Position" @input="seek" />
        <span>{{ formatDuration(duration * 1000) }}</span>
      </div>
    </div>

    <label class="player-vol">
      <span class="sr-only">Volume</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" /></svg>
      <input type="range" min="0" max="1" step="0.01" :value="volume" @input="setVolume" />
    </label>
  </footer>
</template>

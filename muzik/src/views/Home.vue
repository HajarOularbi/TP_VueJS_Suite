<script setup>
import { ref, onMounted } from 'vue'
import { getChart } from '../api'
import { player, playFrom } from '../store'
import TrackCard from '../components/TrackCard.vue'

const ideas = ['Daft Punk', 'The Weeknd', 'Cheb Khaled', 'Fairuz', 'Billie Eilish', 'Saad Lamjarred']
const tracks = ref([])
const demo = ref(false)
const loading = ref(true)

onMounted(async () => {
  const r = await getChart()
  tracks.value = r.tracks
  demo.value = r.demo
  loading.value = false
})

const isActive = (t) => player.queue[player.index]?.id === t.id
</script>

<template>
  <section class="hero">
    <h1>Trouve le son<br />de ta soirée.</h1>
    <p>Cherche un titre, un artiste ou un album et écoute un extrait tout de suite.</p>
    <RouterLink to="/search" class="btn">Lancer une recherche</RouterLink>
  </section>

  <section>
    <h2>Pour commencer</h2>
    <div class="chips">
      <RouterLink v-for="i in ideas" :key="i" :to="{ name: 'search', query: { q: i } }" class="chip">{{ i }}</RouterLink>
    </div>
  </section>

  <section>
    <h2>Les titres du moment</h2>
    <p v-if="demo" class="notice">
      Mode démo : l'API Deezer n'est pas joignable. Lance le projet avec <code>npm run dev</code> et vérifie ta connexion internet.
    </p>
    <p v-if="loading" class="muted">Chargement…</p>
    <div class="grid" v-else>
      <TrackCard
        v-for="(t, i) in tracks" :key="t.id" :track="t" :active="isActive(t)"
        @play="playFrom(tracks, i)"
      />
    </div>
  </section>
</template>

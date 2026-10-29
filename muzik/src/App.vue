<script setup>
import PlayerBar from './components/PlayerBar.vue'
</script>

<template>
  <div class="shell">
    <aside class="side">
      <RouterLink to="/" class="brand">
        <span class="brand-mark" aria-hidden="true"></span>
        Muzik
      </RouterLink>
      <nav class="nav" aria-label="Navigation principale">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/search">Recherche</RouterLink>
      </nav>
    </aside>
    <main class="main"><RouterView /></main>
    <PlayerBar />
  </div>
</template>

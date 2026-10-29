<template>
  <div class="filter-nav">
    <span>Filtrer par expérience :</span>
    <button
      v-for="f in filtres"
      :key="f.valeur"
      :class="{ actif: f.valeur === filtreActuel }"
      @click="$emit('filter', f.valeur)"
    >
      {{ f.texte }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterNav',
  // Le parent (Home) nous dit quel filtre est actif
  props: ['filtreActuel'],
  // On prévient le parent quand on clique sur un filtre
  emits: ['filter'],
  data() {
    return {
      filtres: [
        { valeur: 'tous', texte: 'Tous' },
        { valeur: 'debutant', texte: 'Débutant (0-1 an)' },
        { valeur: 'confirme', texte: 'Confirmé (2-4 ans)' },
        { valeur: 'senior', texte: 'Senior (5 ans et +)' }
      ]
    }
  }
}
</script>

<style scoped>
.filter-nav {
  margin-bottom: 20px;
}

.filter-nav span {
  margin-right: 10px;
}

.filter-nav button {
  background-color: #bdc3c7;
  color: #222;
  margin: 3px;
}

.filter-nav button.actif {
  background-color: #3498db;
  color: white;
}
</style>

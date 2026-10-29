<script setup>
// Bonus : BookCard.vue réécrit en Composition API (<script setup>)
import { computed } from 'vue'

// Mêmes props que BookCard.vue, avec le même validator
const props = defineProps({
  book: {
    type: Object,
    required: true,
    validator(valeur) {
      return typeof valeur.title === 'string' && valeur.title.trim() !== ''
    }
  }
})

// Mêmes événements émis
const emit = defineEmits(['toggle-fav'])

// Propriété calculée : le texte du bouton
const libelleFavori = computed(() => {
  return props.book.isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'
})

function basculerFavori() {
  emit('toggle-fav', props.book.id)
}
</script>

<template>
  <div class="book" :class="{ favori: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }} — {{ book.year }} ({{ book.genre }})</p>

    <button @click="basculerFavori">{{ libelleFavori }}</button>

    <span v-if="book.isFav" class="badge-favori">Favori</span>

    <slot name="actions"></slot>
  </div>
</template>

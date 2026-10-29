<script>
export default {
  name: 'BookCard',

  props: {
    // Étape 2 : objet obligatoire, avec un validator sur le titre
    book: {
      type: Object,
      required: true,
      validator(valeur) {
        return typeof valeur.title === 'string' && valeur.title.trim() !== ''
      }
    }
  },

  // Étape 3 : on ne modifie JAMAIS la props, on prévient le parent
  emits: ['toggle-fav']
}
</script>

<template>
  <div class="book" :class="{ favori: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }} — {{ book.year }} ({{ book.genre }})</p>

    <!-- Étape 3 : au lieu de book.isFav = !book.isFav, on demande au parent -->
    <button @click="$emit('toggle-fav', book.id)">
      {{ book.isFav ? 'Retirer des favoris' : 'Favori' }}
    </button>

    <span v-if="book.isFav" class="badge-favori">Favori</span>

    <!-- Étape 4 : slot nommé "actions", placé après le badge -->
    <slot name="actions"></slot>
  </div>
</template>

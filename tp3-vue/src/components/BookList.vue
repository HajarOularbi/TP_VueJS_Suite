<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookList',
  components: { BookCard },

  // Étape 1 : props "books", un tableau obligatoire
  props: {
    books: {
      type: Array,
      required: true
    }
  },

  // On redéclare les événements qu'on fait remonter vers App.vue
  emits: ['toggle-fav', 'delete-book']
}
</script>

<template>
  <div>
    <!-- Étape 1 : v-for avec :key, et on passe chaque livre à BookCard -->
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      @toggle-fav="$emit('toggle-fav', $event)"
    >
      <!-- Étape 4 : on injecte du contenu dans le slot nommé "actions" -->
      <template #actions>
        <button @click="$emit('delete-book', book.id)">Supprimer</button>
      </template>
    </BookCard>

    <p v-if="books.length === 0">Aucun livre à afficher.</p>
  </div>
</template>

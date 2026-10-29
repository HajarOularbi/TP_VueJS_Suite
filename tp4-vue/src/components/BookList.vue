<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookList',
  components: { BookCard },

  props: {
    books: {
      type: Array,
      required: true
    }
  },

  emits: ['toggle-fav', 'delete-book']
}
</script>

<template>
  <div>
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      @toggle-fav="$emit('toggle-fav', $event)"
    >
      <template #actions>
        <!-- Navigation par lien : l'URL devient /livre/2, /livre/3... -->
        <router-link :to="'/livre/' + book.id">Voir détails</router-link>
        <button @click="$emit('delete-book', book.id)">Supprimer</button>
      </template>
    </BookCard>

    <p v-if="books.length === 0">Aucun livre à afficher.</p>
  </div>
</template>

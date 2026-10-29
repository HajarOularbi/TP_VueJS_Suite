<script>
import AddBookForm from '../components/AddBookForm.vue'
import BookList from '../components/BookList.vue'
import { store } from '../store/books.js'

export default {
  name: 'HomeView',
  components: { AddBookForm, BookList },

  data() {
    return {
      store // on rend le store accessible dans le template
    }
  },

  methods: {
    // Étape 2 : générer un id et pousser le nouveau livre dans store.books
    addBook(nouveau) {
      // plus grand id existant + 1 (0 si la liste est vide)
      let maxId = 0
      for (const b of store.books) {
        if (b.id > maxId) {
          maxId = b.id
        }
      }
      store.books.push({ ...nouveau, id: maxId + 1 })
    },

    toggleFavori(id) {
      const livre = store.books.find(b => b.id === id)
      if (livre) {
        livre.isFav = !livre.isFav
      }
    },

    deleteBook(id) {
      store.books = store.books.filter(b => b.id !== id)
    }
  }
}
</script>

<template>
  <h1>Catalogue de livres</h1>

  <!-- On écoute l'événement add-book de l'enfant -->
  <AddBookForm @add-book="addBook" />

  <!-- On passe la liste du store et on branche les deux événements -->
  <BookList
    :books="store.books"
    @toggle-fav="toggleFavori"
    @delete-book="deleteBook"
  />
</template>

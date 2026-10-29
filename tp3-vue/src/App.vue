<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'
import { initialBooks } from './initialBooks.js'

export default {
  name: 'App',
  components: { AddBookForm, BookList },

  data() {
    return {
      books: [],        // App.vue est le SEUL endroit qui possède la liste
      loading: true,
      prochainId: 100
    }
  },

  // Étape 5 : on simule un chargement réseau de 600 ms
  mounted() {
    setTimeout(() => {
      this.books = initialBooks
      this.loading = false
    }, 600)
  },

  methods: {
    // Les enfants DEMANDENT une modification avec $emit, c'est App qui la fait
    ajouterLivre(nouveau) {
      this.books.push({ ...nouveau, id: this.prochainId })
      this.prochainId = this.prochainId + 1
    },

    toggleFavori(id) {
      const livre = this.books.find(b => b.id === id)
      if (livre) {
        livre.isFav = !livre.isFav
      }
    },

    supprimerLivre(id) {
      this.books = this.books.filter(b => b.id !== id)
    }
  }
}
</script>

<template>
  <h1>Catalogue de livres</h1>

  <AddBookForm @add-book="ajouterLivre" />

  <!-- Étape 5 : v-show (et pas v-if) pour le message de chargement -->
  <p v-show="loading" class="loading">Chargement des livres...</p>

  <!-- Étape 1 : on passe la liste à l'enfant avec :books -->
  <BookList
    :books="books"
    @toggle-fav="toggleFavori"
    @delete-book="supprimerLivre"
  />
</template>

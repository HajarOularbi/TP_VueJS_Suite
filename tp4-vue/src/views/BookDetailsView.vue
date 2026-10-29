<script>
import { store } from '../store/books.js'

export default {
  name: 'BookDetailsView',

  data() {
    return { store }
  },

  computed: {
    // Étape 3 : retrouver le livre dont l'id correspond à l'URL.
    // $route.params.id est TOUJOURS une chaîne ("2"), alors que les id du
    // store sont des nombres (2) : sans Number(), 2 === "2" vaut false.
    book() {
      const id = Number(this.$route.params.id)
      return this.store.books.find(b => b.id === id)
    }
  },

  methods: {
    // Étape 4 : navigation programmatique (depuis du code, pas un <router-link>)
    retour() {
      // Si on a ouvert cette page directement (pas d'historique), back() ne ferait rien :
      // dans ce cas on va à l'accueil.
      if (window.history.state && window.history.state.back) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<template>
  <button @click="retour">← Retour</button>

  <div v-if="book" class="book" :class="{ favori: book.isFav }">
    <h1>{{ book.title }}</h1>
    <p>Auteur : {{ book.author }}</p>
    <p>Année : {{ book.year }}</p>
    <p>Genre : {{ book.genre }}</p>
    <span v-if="book.isFav" class="badge-favori">Favori</span>
  </div>

  <!-- Livre introuvable (id qui n'existe pas) -->
  <p v-else>Ce livre n'existe pas.</p>
</template>

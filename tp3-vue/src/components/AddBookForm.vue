<script>
export default {
  name: 'AddBookForm',
  emits: ['add-book'],

  data() {
    return {
      newBook: { title: '', author: '', year: 2024, genre: 'Roman', isFav: false }
    }
  },

  computed: {
    formulaireValide() {
      return this.newBook.title.trim() !== '' && this.newBook.author.trim() !== ''
    }
  },

  // Bonus : le curseur se place tout de suite dans le champ titre
  mounted() {
    this.$refs.titreInput.focus()
  },

  methods: {
    envoyer() {
      if (!this.formulaireValide) {
        return
      }
      // On envoie une COPIE au parent, c'est lui qui ajoute le livre
      this.$emit('add-book', { ...this.newBook })
      this.newBook = { title: '', author: '', year: 2024, genre: 'Roman', isFav: false }
      this.$refs.titreInput.focus()
    }
  }
}
</script>

<template>
  <form @submit.prevent="envoyer">
    <h3>Ajouter un livre</h3>

    <!-- Bonus : ref="titreInput" -->
    <p><input ref="titreInput" v-model.trim="newBook.title" placeholder="Titre"></p>
    <p><input v-model.trim="newBook.author" placeholder="Auteur"></p>
    <p><input v-model.number="newBook.year" type="number" placeholder="Année"></p>
    <p>
      <select v-model="newBook.genre">
        <option>Roman</option>
        <option>Science-fiction</option>
        <option>Informatique</option>
        <option>Conte philosophique</option>
        <option>Autre</option>
      </select>
    </p>
    <p><label><input type="checkbox" v-model="newBook.isFav"> Favori</label></p>

    <button type="submit" :disabled="!formulaireValide">Ajouter</button>
  </form>
</template>

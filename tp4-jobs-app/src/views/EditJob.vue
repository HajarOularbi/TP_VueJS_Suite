<template>
  <div>
    <h2>Modifier l'emploi</h2>

    <p v-if="chargement" class="message">Chargement...</p>

    <div v-if="!chargement" class="formulaire">
      <label>Titre</label>
      <input type="text" v-model="title" />

      <label>Entreprise</label>
      <input type="text" v-model="company" />

      <label>Description</label>
      <textarea v-model="description" rows="4"></textarea>

      <label>Salaire (DH)</label>
      <input type="number" v-model="salary" />

      <label>Années d'expérience</label>
      <input type="number" v-model="experience" />

      <label>Date de création</label>
      <input type="date" v-model="createdAt" />

      <p v-if="erreur" class="erreur">{{ erreur }}</p>

      <button @click="modifier">Enregistrer</button>
      <router-link :to="'/jobs/' + id" class="btn btn-gris">Annuler</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditJob',
  data() {
    return {
      id: this.$route.params.id,
      title: '',
      company: '',
      description: '',
      salary: '',
      experience: '',
      createdAt: '',
      chargement: true,
      erreur: ''
    }
  },
  methods: {
    modifier() {
      if (this.title === '' || this.description === '' || this.salary === '' || this.experience === '') {
        this.erreur = 'Remplis au moins le titre, la description, le salaire et l\'expérience.'
        return
      }

      const jobModifie = {
        title: this.title,
        company: this.company,
        description: this.description,
        salary: Number(this.salary),
        experience: Number(this.experience),
        createdAt: this.createdAt
      }

      fetch('http://localhost:3000/jobs/' + this.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobModifie)
      })
        .then(() => {
          // On retourne à la page de détails après la modification
          this.$router.push('/jobs/' + this.id)
        })
        .catch(err => {
          console.log(err)
          this.erreur = 'La modification a échoué.'
        })
    }
  },
  // On charge l'emploi pour pré-remplir le formulaire
  mounted() {
    fetch('http://localhost:3000/jobs/' + this.id)
      .then(response => response.json())
      .then(data => {
        this.title = data.title
        this.company = data.company
        this.description = data.description
        this.salary = data.salary
        this.experience = data.experience
        this.createdAt = data.createdAt
        this.chargement = false
      })
      .catch(err => {
        console.log(err)
        this.erreur = 'Impossible de charger l\'emploi.'
        this.chargement = false
      })
  }
}
</script>

<style scoped>
.formulaire {
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

label {
  display: block;
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Arial, sans-serif;
}

.formulaire button,
.formulaire .btn {
  margin-top: 20px;
  margin-right: 8px;
}
</style>

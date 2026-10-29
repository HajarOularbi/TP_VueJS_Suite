<template>
  <div>
    <h2>Ajouter un emploi</h2>

    <div class="formulaire">
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

      <button @click="ajouter">Ajouter</button>
      <router-link to="/" class="btn btn-gris">Annuler</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddJob',
  data() {
    return {
      title: '',
      company: '',
      description: '',
      salary: '',
      experience: '',
      // La date d'aujourd'hui par défaut (format AAAA-MM-JJ)
      createdAt: new Date().toISOString().slice(0, 10),
      erreur: ''
    }
  },
  methods: {
    ajouter() {
      // Vérification simple des champs
      if (this.title === '' || this.description === '' || this.salary === '' || this.experience === '') {
        this.erreur = 'Remplis au moins le titre, la description, le salaire et l\'expérience.'
        return
      }

      const nouveauJob = {
        title: this.title,
        company: this.company,
        description: this.description,
        salary: Number(this.salary),
        experience: Number(this.experience),
        createdAt: this.createdAt
      }

      fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nouveauJob)
      })
        .then(() => {
          // On retourne à l'accueil après l'ajout
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.erreur = 'L\'ajout a échoué. Vérifie que json-server est lancé.'
        })
    }
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

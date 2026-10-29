<template>
  <div>
    <p v-if="chargement" class="message">Chargement...</p>
    <p v-if="erreur" class="message erreur">{{ erreur }}</p>

    <div v-if="job" class="carte">
      <h2>{{ job.title }}</h2>
      <p class="entreprise">{{ job.company }}</p>

      <p><strong>Description :</strong> {{ job.description }}</p>
      <p><strong>Salaire :</strong> {{ job.salary }} DH</p>
      <p><strong>Expérience demandée :</strong> {{ job.experience }} an(s)</p>
      <p><strong>Date de création :</strong> {{ job.createdAt }}</p>

      <router-link :to="'/jobs/' + job.id + '/edit'" class="btn btn-bleu">Modifier</router-link>
      <button class="btn-rouge" @click="supprimer">Supprimer</button>
      <router-link to="/" class="btn btn-gris">Retour</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobDetail',
  data() {
    return {
      job: null,
      chargement: true,
      erreur: ''
    }
  },
  methods: {
    supprimer() {
      // Confirmation avant de supprimer
      const ok = confirm('Voulez-vous vraiment supprimer cet emploi ?')
      if (ok === false) {
        return
      }

      fetch('http://localhost:3000/jobs/' + this.job.id, { method: 'DELETE' })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.erreur = 'La suppression a échoué.'
        })
    }
  },
  mounted() {
    // this.$route.params.id = l'id qui est dans l'adresse (/jobs/:id)
    const id = this.$route.params.id

    fetch('http://localhost:3000/jobs/' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Emploi introuvable')
        }
        return response.json()
      })
      .then(data => {
        this.job = data
        this.chargement = false
      })
      .catch(err => {
        console.log(err)
        this.erreur = 'Emploi introuvable ou json-server non lancé.'
        this.chargement = false
      })
  }
}
</script>

<style scoped>
.carte {
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.entreprise {
  color: #666;
  margin-top: 0;
}

.carte .btn,
.carte button {
  margin-right: 8px;
  margin-top: 10px;
}
</style>

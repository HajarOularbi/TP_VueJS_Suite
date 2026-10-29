<template>
  <div>
    <div class="titre-ligne">
      <h2>Liste des emplois</h2>
      <router-link to="/add" class="btn">+ Ajouter un emploi</router-link>
    </div>

    <FilterNav :filtreActuel="filtre" @filter="changerFiltre" />

    <p v-if="chargement" class="message">Chargement...</p>
    <p v-if="erreur" class="message erreur">{{ erreur }}</p>

    <p v-if="!chargement && !erreur && emploisFiltres.length === 0" class="message">
      Aucun emploi à afficher.
    </p>

    <div v-for="job in emploisFiltres" :key="job.id" class="carte">
      <h3>{{ job.title }}</h3>
      <p class="entreprise">{{ job.company }}</p>
      <p>Salaire : {{ job.salary }} DH</p>
      <p>Expérience : {{ job.experience }} an(s)</p>
      <router-link :to="'/jobs/' + job.id" class="btn btn-bleu">Voir les détails</router-link>
    </div>
  </div>
</template>

<script>
import FilterNav from '../components/FilterNav.vue'

export default {
  name: 'Home',
  components: { FilterNav },
  data() {
    return {
      jobs: [],
      filtre: 'tous',
      chargement: true,
      erreur: ''
    }
  },
  computed: {
    // Liste des emplois après application du filtre
    emploisFiltres() {
      if (this.filtre === 'debutant') {
        return this.jobs.filter(job => job.experience <= 1)
      }
      if (this.filtre === 'confirme') {
        return this.jobs.filter(job => job.experience >= 2 && job.experience <= 4)
      }
      if (this.filtre === 'senior') {
        return this.jobs.filter(job => job.experience >= 5)
      }
      return this.jobs
    }
  },
  methods: {
    changerFiltre(valeur) {
      this.filtre = valeur
    }
  },
  // mounted() s'exécute quand la page s'affiche : on charge les emplois
  mounted() {
    fetch('http://localhost:3000/jobs')
      .then(response => response.json())
      .then(data => {
        this.jobs = data
        this.chargement = false
      })
      .catch(err => {
        console.log(err)
        this.erreur = 'Impossible de charger les emplois. Vérifie que json-server est lancé.'
        this.chargement = false
      })
  }
}
</script>

<style scoped>
.titre-ligne {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.titre-ligne h2 {
  margin: 0;
}

.carte {
  background-color: white;
  padding: 15px 20px;
  border-radius: 6px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.carte h3 {
  margin: 0 0 5px 0;
}

.entreprise {
  color: #666;
  margin-top: 0;
}
</style>

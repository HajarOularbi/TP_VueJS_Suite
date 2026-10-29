<template>
  <div>
    <header class="navbar">
      <h1>Jobs App</h1>
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/add">Ajouter un emploi</router-link>
      </nav>
    </header>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
/* Style général de l'application */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  color: #222;
}

.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  margin: 0;
  font-size: 22px;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.navbar a.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}

.container {
  max-width: 800px;
  margin: 30px auto;
  padding: 0 15px;
}

/* Boutons */
button,
.btn {
  display: inline-block;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}

button:hover,
.btn:hover {
  opacity: 0.85;
}

.btn-bleu {
  background-color: #3498db;
}

.btn-rouge {
  background-color: #e74c3c;
}

.btn-gris {
  background-color: #7f8c8d;
}

/* Messages */
.message {
  text-align: center;
  color: #666;
  padding: 20px;
}

.erreur {
  color: #e74c3c;
}
</style>

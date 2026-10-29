# Muzik

Mini clone de Spotify en Vue 3, thème violet et noir. Données et extraits audio (30 s) via l'API publique **Deezer** : aucun compte, aucune clé.

## Lancer
1. `npm install`
2. `npm run dev`
3. Ouvre http://localhost:5173

Il faut une connexion internet. Si Deezer est injoignable, l'app passe en mode démo (données fictives, sans audio).

## Structure
- `server/index.js` : petit serveur Express qui relaie les appels vers Deezer (le navigateur ne peut pas les faire directement)
- `src/api.js` : appels vers `/api` avec repli en mode démo
- `src/store.js` : file de lecture (titre en cours, précédent, suivant)
- `src/views/` : Home (titres du moment), Search, Track
- `src/components/` : TrackCard, PlayerBar (lecteur audio avec pause, barre de progression, volume)
- `src/style.css` : tout le thème (variables `--violet`, `--bg`...)

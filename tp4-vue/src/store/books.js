// État PARTAGÉ entre toutes les vues.
//
// Pourquoi ce fichier ? La page d'accueil et la page de détail sont deux vues
// différentes, sans lien parent/enfant : props et $emit ne suffisent plus.
// reactive() crée un objet réactif au niveau du MODULE : tous les fichiers qui
// font "import { store } from '../store/books'" reçoivent le MÊME objet. Si une
// vue le modifie, les autres se mettent à jour toute seules.
import { reactive } from 'vue'
import { initialBooks } from '../initialBooks.js'

export const store = reactive({
  books: [...initialBooks]
})

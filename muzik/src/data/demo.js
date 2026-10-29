// Données de démonstration (affichées si Deezer est injoignable, sans audio)
const t = (n, name, artists, album, duration) =>
  ({ id: `demo-${n}`, name, artists, album, image: null, imageBig: null, duration, preview: null, url: null })

export const demoTracks = [
  t(1, 'Nuit violette', 'Atlas Echo', 'Après minuit', 214000),
  t(2, 'Derb Sultan', 'Zahra Beats', 'Medina Waves', 187000),
  t(3, 'Néon Marrakech', 'Atlas Echo', 'Après minuit', 241000),
  t(4, 'Sahara Drive', 'Kenza Rae', 'Dunes', 203000),
  t(5, 'Basses fréquences', 'Zahra Beats', 'Medina Waves', 176000),
  t(6, 'Orage doux', 'Kenza Rae', 'Dunes', 229000)
]

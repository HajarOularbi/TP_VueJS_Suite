import { reactive } from 'vue'

// File de lecture partagée : la liste affichée + la position du titre en cours
export const player = reactive({ queue: [], index: -1, playing: false })

export function playFrom(list, index) {
  player.queue = list
  player.index = index
  player.playing = true
}
export function next() {
  if (player.index < player.queue.length - 1) { player.index++; player.playing = true }
}
export function prev() {
  if (player.index > 0) { player.index--; player.playing = true }
}

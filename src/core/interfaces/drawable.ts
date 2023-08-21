import type { Scene } from 'three'

export interface Drawable<T> {
  object: T
  draw(scene: Scene): void
}

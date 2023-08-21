import type { Object3D, Scene } from 'three'

export abstract class Object<T extends Object3D> {
  object: T

  constructor(object: T) {
    this.object = object
  }

  draw(scene: Scene) {
    scene.add(this.object)
  }

  abstract update(): void
}

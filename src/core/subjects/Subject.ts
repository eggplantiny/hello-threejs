import type { Object3D } from 'three'

export abstract class Subject<T extends Object3D = any> {
  object: T
  abstract update(time: number): void
  constructor(object: T) {
    this.object = object
  }
}

import type { Material, Object3D } from 'three'
import { Mesh } from 'three'

export abstract class Subject<T extends Object3D = any> {
  object: T
  abstract update(time: number): void
  constructor(object: T) {
    this.object = object
  }

  dispose(): void {
    if (this.object instanceof Mesh) {
      if (this.object.children.length > 0) {
        this.object.children.forEach((child: any) => {
          if (child.geometry)
            child.geometry.dispose()
          if (child.material) {
            if (Array.isArray(child.material))
              child.material.forEach((material: Material) => material.dispose())
            else
              child.material.dispose()
          }
        })
      }
      this.object.geometry.dispose()
      if (Array.isArray(this.object.material))
        this.object.material.forEach((material: Material) => material.dispose())
      else
        this.object.material.dispose()
    }
  }
}

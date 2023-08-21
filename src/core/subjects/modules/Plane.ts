import { Color, Mesh, MeshToonMaterial, PlaneGeometry } from 'three'
import { Subject } from '@/core/subjects/Subject'

export class Plane extends Subject<Mesh> {
  constructor() {
    super(new Mesh(
      new PlaneGeometry(10, 10, 10, 10),
      new MeshToonMaterial({ color: new Color('#444') }),
    ))
  }

  update(_time: number): void {
    // void
  }
}

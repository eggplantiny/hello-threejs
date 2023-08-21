import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three'
import { Subject } from '@/core/subjects/Subject'

export class SceneSubject extends Subject<Mesh> {
  constructor(radius = 2) {
    super(new Mesh(
      new IcosahedronGeometry(radius, 2),
      new MeshStandardMaterial({ flatShading: true })),
    )
  }

  update(time: number): void {
    const scale = Math.sin(time) + 2
    this.object.scale.set(scale, scale, scale)
  }
}

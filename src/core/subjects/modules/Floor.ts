import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { CSG } from 'three-csg-ts'
import { Subject } from '@/core/subjects/Subject'

interface Props {
  width: number
  height: number
  depth: number
  color: string | number
  opacity: number
  transparent: boolean
}

const DEFAULT_PROPS: Props = {
  width: 10,
  height: 1,
  depth: 8,
  color: 0x555555,
  opacity: 1,
  transparent: false,
}

export class Floor extends Subject<Mesh> {
  constructor(props: Partial<Props> = {}) {
    const { width, height, depth, color, opacity, transparent } = { ...DEFAULT_PROPS, ...props }
    const material = new MeshBasicMaterial({ color, opacity, transparent })
    const leftSide = new Mesh(
      new BoxGeometry(width, height, depth),
      material,
    )

    const rightSide = new Mesh(
      new BoxGeometry(width / 2, height, depth / 2),
      material,
    )

    const result = CSG.subtract(leftSide, rightSide)
    super(result as Mesh)
  }

  update(_time: number): void {
    // void
  }
}

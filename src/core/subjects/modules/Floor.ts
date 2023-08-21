import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Subject } from '@/core/subjects/Subject'
import type { DeepPartial, Position } from '@/types/base.type'

interface Props {
  width: number
  height: number
  depth: number
  color: string | number
  position: Position
}

const DEFAULT_PROPS: Props = {
  width: 8,
  height: 1,
  depth: 8,
  color: 0xFF0000,
  position: { x: 0, y: 0, z: 0 },
}

export class Floor extends Subject<Mesh> {
  constructor(props: DeepPartial<Props> = {}) {
    const { width, height, depth, position, color } = { ...DEFAULT_PROPS, ...props }
    super(new Mesh(
      new BoxGeometry(width, height, depth),
      new MeshBasicMaterial({ color }),
    ))

    this.object.position.y = position.y ?? DEFAULT_PROPS.position.y
  }

  update(_time: number): void {
    // void
  }
}

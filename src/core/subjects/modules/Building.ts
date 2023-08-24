import type { Mesh } from 'three'
import { CSG } from 'three-csg-ts'
import { Subject } from '@/core/subjects/Subject'
import { Room } from '@/core/subjects/modules/Room'

interface Props {
  roomHeight: number
  numFloors: number
  width: number
  depth: number
  opacity: number
  color: string | number
  transparent: boolean
}

const DEFAULT_PROPS: Props = {
  color: 0xAAAAAA,
  roomHeight: 10,
  width: 12,
  depth: 12,
  numFloors: 10,
  opacity: 0.66,
  transparent: true,
}

export class Building extends Subject<Mesh> {
  private readonly _width: number
  private readonly _depth: number
  private readonly _height: number
  private readonly _numFloors: number

  constructor(props: Partial<Props> = {}) {
    const { color, roomHeight, numFloors, width, depth, opacity, transparent } = { ...DEFAULT_PROPS, ...props }

    const rooms = Array(numFloors).fill(0).map(() => new Room({
      opacity,
      transparent,
      color,
      width,
      depth,
      height: roomHeight,
    }))

    rooms.forEach((room, index) => {
      room.object.position.y = index * roomHeight
      room.object.updateMatrix()
    })

    const result = rooms.reduce((acc, room) => CSG.union(acc, room.object), rooms[0].object.clone())

    rooms.forEach(x => x.dispose())

    super(result as Mesh)

    this._width = width
    this._depth = depth
    this._height = roomHeight * numFloors
    this._numFloors = numFloors
  }

  update(_time: number): void {
    // void
  }

  get width() {
    return this._width
  }

  get depth() {
    return this._depth
  }

  get height() {
    return this._height
  }

  get roomHeight() {
    return this._height / this._numFloors
  }

  get numFloors() {
    return this._numFloors
  }
}

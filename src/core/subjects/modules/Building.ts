import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Subject } from '@/core/subjects/Subject'

interface Props {
  floorHeight: number
  numFloors: number
  width: number
  depth: number
  opacity: number
  color: string | number
  transparent: boolean
}

const DEFAULT_PROPS: Props = {
  color: 0xAAAAAA,
  floorHeight: 10,
  width: 12,
  depth: 12,
  numFloors: 5,
  opacity: 0.66,
  transparent: true,
}

export class Building extends Subject<Mesh> {
  private readonly _width: number
  private readonly _depth: number
  private readonly _height: number
  private readonly _numFloors: number

  constructor(props: Partial<Props> = {}) {
    const { color, floorHeight, numFloors, width, depth, opacity, transparent } = { ...DEFAULT_PROPS, ...props }
    const height = floorHeight * numFloors
    const buildingGeometry = new BoxGeometry(width, height, depth)
    const buildingMaterial = new MeshBasicMaterial({
      color,
      opacity,
      transparent,
    })
    const building = new Mesh(buildingGeometry, buildingMaterial)
    super(building)

    this._width = width
    this._depth = depth
    this._height = height
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

  get numFloors() {
    return this._numFloors
  }
}

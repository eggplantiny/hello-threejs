import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Subject } from '@/core/subjects/Subject'

interface Props {
  buildingHeight: number
  floorHeight: number
  duration: number
  width: number
  height: number
  depth: number
  color: string | number
}

const DEFAULT_PROPS: Props = {
  buildingHeight: 50,
  floorHeight: 10,
  duration: 1000,
  width: 5,
  height: 5,
  depth: 5,
  color: 0x00FF00,
}

export class Elevator extends Subject<Mesh> {
  private readonly buildingHeight: number
  private readonly floorHeight: number
  private readonly duration: number
  private readonly height: number
  private _targetY = 0
  private _startTime = 0

  constructor(props: Partial<Props>) {
    const {
      buildingHeight,
      floorHeight,
      duration,
      width,
      height,
      depth,
      color,
    } = { ...DEFAULT_PROPS, ...props }

    super(new Mesh(
      new BoxGeometry(width, height, depth),
      new MeshBasicMaterial({ color }),
    ))

    this.object.position.y = -(buildingHeight / 2)
    this.buildingHeight = buildingHeight
    this.floorHeight = floorHeight
    this.duration = duration
    this.height = height
  }

  public moveTo(floorNumber: number) {
    this._targetY = (floorNumber * this.floorHeight) - (this.buildingHeight / 2) + (this.floorHeight / 2) - (this.height / 2) - (this.floorHeight / 2)
    this._startTime = Date.now()
  }

  public update(time: number): void {
    const elapsed = time - this._startTime
    const progress = elapsed / this.duration

    if (progress < 1)
      this.object.position.y = this.object.position.y + (this._targetY - this.object.position.y) * progress

    else
      this.object.position.y = this._targetY
  }

  public get position() {
    return this.object.position
  }
}

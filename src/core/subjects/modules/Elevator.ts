import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Subject } from '@/core/subjects/Subject'

interface Props {
  buildingHeight: number
  roomHeight: number
  duration: number
  width: number
  height: number
  depth: number
  color: string | number
}

const DEFAULT_PROPS: Props = {
  buildingHeight: 50,
  roomHeight: 10,
  duration: 1000,
  width: 5,
  height: 5,
  depth: 5,
  color: 0x525252,
}

export class Elevator extends Subject<Mesh> {
  // private readonly _buildingHeight: number
  // private readonly _roomHeight: number
  private readonly _duration: number
  private readonly _height: number
  private _targetY = 0
  private _startTime = 0

  constructor(props: Partial<Props>) {
    const {
      buildingHeight,
      // roomHeight,
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
    // this._buildingHeight = buildingHeight
    // this._roomHeight = roomHeight
    this._duration = duration
    this._height = height
  }

  public moveTo(floorNumber: number) {
    this._targetY = floorNumber * this.height - this.height
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

  private get duration() {
    return this._duration
  }

  private get height() {
    return this._height
  }
}

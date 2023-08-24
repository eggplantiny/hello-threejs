import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Subject } from '@/core/subjects/Subject'
import EventManager from '@/core/managers/EventManager'
import ClockManager from '@/core/managers/ClockManager'

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
  duration: 4000,
  width: 5,
  height: 5,
  depth: 5,
  color: 0x525252,
}

type ELEVATOR_STATUS = 'move_start' | 'moving' | 'move_end'

export class Elevator extends Subject<Mesh> {
  private readonly _roomHeight: number
  private readonly _duration: number
  private _targetY = 0
  private _startTime = 0
  private eventManager = EventManager.getInstance()
  private _status: ELEVATOR_STATUS = 'move_end'

  constructor(props: Partial<Props>) {
    const {
      roomHeight,
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

    this._roomHeight = roomHeight
    this._duration = duration
  }

  public moveTo(floorNumber: number) {
    const clock = ClockManager.getInstance()
    this._targetY = ((floorNumber - 1) * this._roomHeight)
    this._startTime = clock.now()

    this.status = 'move_start'
  }

  public update(currentTime: number): void {
    const progress = (currentTime - this._startTime) / this.duration

    if (progress < 1) {
      this.object.position.y = this.object.position.y + (this._targetY - this.object.position.y) * progress * progress
      this.status = 'moving'
    }
    else {
      this.object.position.y = this._targetY
      this.status = 'move_end'
    }
  }

  public get status() {
    return this._status
  }

  private set status(status: ELEVATOR_STATUS) {
    if (this._status === status)
      return
    this._status = status
    this.eventManager.trigger(status)
  }

  public get position() {
    return this.object.position
  }

  private get duration() {
    return this._duration
  }
}

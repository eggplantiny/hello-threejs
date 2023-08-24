import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { CSG } from 'three-csg-ts'
import { Subject } from '@/core/subjects/Subject'

interface Props {
  height: number
  width: number
  depth: number
  opacity: number
  color: string | number
  transparent: boolean
  entranceWidth: number
  entranceDepth: number
  entranceHeight: number
  elevatorWidth: number
  elevatorDepth: number
  elevatorHeight: number
}

const DEFAULT_PROPS: Props = {
  color: 0xAAAAAA,
  height: 10,
  width: 12,
  depth: 12,
  opacity: 1,
  transparent: false,
  entranceWidth: 10,
  entranceDepth: 10,
  entranceHeight: 10,
  elevatorWidth: 10,
  elevatorDepth: 10,
  elevatorHeight: 10,
}

function generateMesh(props: Partial<Props>) {
  const {
    color,
    height,
    width,
    depth,
    opacity,
    transparent,
    // entranceWidth,
    // entranceDepth,
    // entranceHeight,
    elevatorWidth,
    elevatorHeight,
    elevatorDepth,
  } = { ...DEFAULT_PROPS, ...props }

  const material = new MeshBasicMaterial({
    color,
    opacity,
    transparent,
  })

  // to subtract center for make a wall
  let leftSide: Mesh = new Mesh(
    new BoxGeometry(width, height, depth),
    material,
  )
  let rightSide = new Mesh(
    new BoxGeometry(width - 1, height - 1, depth - 1),
    material,
  )

  leftSide.updateMatrix()
  rightSide.updateMatrix()

  leftSide = CSG.subtract(leftSide, rightSide)

  // to subtract upside for make a elevator
  rightSide = new Mesh(
    new BoxGeometry(elevatorWidth, elevatorHeight, elevatorDepth),
    material,
  )
  rightSide.position.set(0, height / 2 - elevatorHeight / 2, 0)

  leftSide.updateMatrix()
  rightSide.updateMatrix()

  leftSide = CSG.subtract(leftSide, rightSide)

  // to subtract downside for make a elevator
  rightSide = new Mesh(
    new BoxGeometry(elevatorWidth, elevatorHeight, elevatorDepth),
    material,
  )
  rightSide.position.set(0, -height / 2 + elevatorHeight / 2, 0)

  leftSide.updateMatrix()
  rightSide.updateMatrix()

  leftSide = CSG.subtract(leftSide, rightSide)

  return leftSide
}

export class Room extends Subject<Mesh> {
  private readonly _height: number
  private readonly _width: number
  private readonly _depth: number
  private readonly _opacity: number
  private readonly _color: string | number
  private readonly _transparent: boolean

  isOpen = false

  constructor(props: Partial<Props> = {}) {
    const mesh = generateMesh(props)
    super(mesh)

    this._height = props.height ?? DEFAULT_PROPS.height
    this._width = props.width ?? DEFAULT_PROPS.width
    this._depth = props.depth ?? DEFAULT_PROPS.depth
    this._opacity = props.opacity ?? DEFAULT_PROPS.opacity
    this._color = props.color ?? DEFAULT_PROPS.color
    this._transparent = props.transparent ?? DEFAULT_PROPS.transparent
  }

  update(_time: number): void {
    // void
  }

  get height() {
    return this._height
  }

  get width() {
    return this._width
  }

  get depth() {
    return this._depth
  }

  get opacity() {
    return this._opacity
  }

  get color() {
    return this._color
  }

  get transparent() {
    return this._transparent
  }
}

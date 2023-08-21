import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Object } from '@/core/entity/Object'

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
  width: 8,
  depth: 8,
  numFloors: 5,
  opacity: 0.66,
  transparent: true,
}

export function createBuilding(props: Partial<Props> = {}) {
  const {
    color,
    floorHeight,
    numFloors,
    width,
    depth,
    opacity,
    transparent,
  } = { ...DEFAULT_PROPS, ...props }

  const height = floorHeight * numFloors

  const buildingGeometry = new BoxGeometry(width, height, depth)
  const buildingMaterial = new MeshBasicMaterial({
    color,
    opacity,
    transparent,
  })
  const building = new Mesh(buildingGeometry, buildingMaterial)

  return building
}

export class Building extends Object<Mesh> {
  constructor(props: Partial<Props> = {}) {
    const {
      color,
      floorHeight,
      numFloors,
      width,
      depth,
      opacity,
      transparent,
    } = { ...DEFAULT_PROPS, ...props }

    const height = floorHeight * numFloors

    const buildingGeometry = new BoxGeometry(width, height, depth)
    const buildingMaterial = new MeshBasicMaterial({
      color,
      opacity,
      transparent,
    })
    const building = new Mesh(buildingGeometry, buildingMaterial)

    super(building)
  }

  update() {
    // Do nothing
  }
}

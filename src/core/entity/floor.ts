import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

interface Props {
  floorHeight: number
  numFloors: number
  buildingHeight: number
}

const DEFAULT_PROPS: Props = {
  floorHeight: 10,
  numFloors: 5,
  buildingHeight: 50,
}

export function createFloor(props: Partial<Props>) {
  const { floorHeight, numFloors, buildingHeight } = { ...DEFAULT_PROPS, ...props }
  const floorGeometry = new BoxGeometry(8, 1, 8)

  const floors = Array(numFloors).fill(null).map((_, c) => {
    const floorMaterial = new MeshBasicMaterial({ color: 0xFF0000 })
    const floor = new Mesh(floorGeometry, floorMaterial)
    floor.position.y = (c * floorHeight) - (buildingHeight / 2) + (floorHeight / 2)

    return floor
  })

  return floors
}

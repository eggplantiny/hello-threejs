import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

export function createBuilding() {
  const buildingGeometry = new BoxGeometry(10, 50, 10)
  const buildingMaterial = new MeshBasicMaterial({ color: 0xAAAAAA, opacity: 0.66, transparent: true })
  const building = new Mesh(buildingGeometry, buildingMaterial)

  return building
}

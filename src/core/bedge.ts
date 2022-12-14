import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

export function createBadge() {
  const metal = new MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.2,
    metalness: 1,
  })
  const roughMetal = new MeshStandardMaterial({
    color: 0xC0C0C0,
    roughness: 0.3,
    metalness: 0.99,
  })
  const geometry = new BoxGeometry(10, 10, 0.1)
  const badge = new Mesh(geometry, [metal, metal, metal, metal, roughMetal, metal])

  return badge
}

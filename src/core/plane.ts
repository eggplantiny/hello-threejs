import { Color, Mesh, MeshToonMaterial, PlaneGeometry } from 'three'

export function createPlane() {
  const plane = new Mesh(
    new PlaneGeometry(10, 10, 10, 10),
    new MeshToonMaterial({ color: new Color('#444') })
  )

  plane.rotation.set(-Math.PI / 2, 0, 0)
  plane.receiveShadow = true

  return plane
}

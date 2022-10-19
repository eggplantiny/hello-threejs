import { AmbientLight, DirectionalLight } from 'three'

export function createDirectionalLight() {
  const directionalLight = new DirectionalLight(0xffffff, 0.5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.normalBias = 0.05
  directionalLight.position.set(0.25, 2, 2.25)

  return directionalLight
}

export function createAmbientLight() {
  const ambientLight = new AmbientLight(0xffffff, 0.5)
  return ambientLight
}

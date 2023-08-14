import { AmbientLight, DirectionalLight, PointLight } from 'three'

export function createLight() {
  const light = new PointLight(0xFFFFFF, 0.8)
  return light
}

export function createDirectionalLight() {
  const directionalLight = new DirectionalLight(0xFFFFFF, 10)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.camera.far = 20
  directionalLight.shadow.normalBias = 0.05
  directionalLight.position.set(0, 0, 2.25)

  return directionalLight
}

export function createAmbientLight() {
  const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
  return ambientLight
}

export function createPointLights() {
  const pointLight1 = new PointLight(0xFFFFFF, 1, 100)
  pointLight1.position.set(5, 5, 10)
  const pointLight2 = new PointLight(0xFFFFFF, 1, 100)
  pointLight2.position.set(-5, -5, 10)
  const pointLight3 = new PointLight(0xFFFFFF, 1, 100)
  pointLight3.position.set(5, -5, 10)
  const pointLight4 = new PointLight(0xFFFFFF, 1, 100)
  pointLight4.position.set(-5, 5, 10)

  return [pointLight1, pointLight2, pointLight3, pointLight4]
}

import { Color, Scene } from 'three'

export function createScene() {
  const scene = new Scene()
  scene.background = new Color(0xF0F0F0)

  return scene
}

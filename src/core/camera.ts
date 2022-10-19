import { PerspectiveCamera } from 'three'

const VERTICAL_FIEL_OF_VIEW = 45

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

export function createCamera() {
  const camera = new PerspectiveCamera(
    VERTICAL_FIEL_OF_VIEW,
    sizes.width / sizes.height,
  )
  camera.position.set(9, 4, 9)

  return camera
}

export const camera = createCamera()

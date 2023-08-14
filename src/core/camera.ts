import { PerspectiveCamera } from 'three'
import type { Size } from '@/types/base.type'

export function createCamera(size: Size, verticalFieldOfView = 45) {
  const camera = new PerspectiveCamera(
    verticalFieldOfView,
    size.width / size.height,
    1,
    1000,
  )
  camera.position.set(9, 4, 9)

  return camera
}

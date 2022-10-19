import { sizes } from '@/core/camera'
import { PCFSoftShadowMap, WebGLRenderer } from 'three'

export function createRenderer() {

  const canvas: HTMLCanvasElement = document.querySelector('#three') as HTMLCanvasElement

  const renderer = new WebGLRenderer({
    canvas
  })

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.physicallyCorrectLights = true

  return renderer
}

export function updateRenderer(renderer: WebGLRenderer) {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}



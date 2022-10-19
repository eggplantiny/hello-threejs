import { PCFSoftShadowMap, WebGLRenderer } from 'three'
import { Size } from '@/types/base.type'

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

export function updateRenderer(renderer: WebGLRenderer, size: Size) {
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}



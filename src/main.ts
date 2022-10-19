import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createRenderer, updateRenderer } from '@/core/renderer'
import { camera, sizes } from '@/core/camera'
import { createSphere } from '@/core/sphere'
import { createScene } from '@/core/scene'
import { createPlane } from '@/core/plane'
import { createAmbientLight, createDirectionalLight } from '@/core/light'

import './assets/style.css'

function createApp() {
  const renderer = createRenderer()
  const scene = createScene()
  const sphere = createSphere()
  const plane = createPlane()
  const directionalLight = createDirectionalLight()
  const ambientLight = createAmbientLight()

  scene.add(camera)
  scene.add(directionalLight)
  scene.add(ambientLight)
  scene.add(sphere)
  scene.add(plane)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  updateRenderer(renderer)

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    updateRenderer(renderer)

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
  })

  function loop() {
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
  }

  return {
    loop
  }
}

const { loop } = createApp()

loop()

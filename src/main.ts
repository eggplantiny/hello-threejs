import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createCamera } from '@/core/camera'
import { createRenderer, updateRenderer } from '@/core/renderer'
import { createSphere } from '@/core/sphere'
import { createScene } from '@/core/scene'
import { createPlane } from '@/core/plane'
import { createAmbientLight, createDirectionalLight, createPointLights } from '@/core/light'
import { createGUI } from '@/core/gui'

import './assets/style.css'
import type { Size } from '@/types/base.type'
import { createBadge } from '@/core/bedge'

const size: Size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

function createApp() {
  const camera = createCamera(size)
  const renderer = createRenderer()
  const scene = createScene()
  const sphere = createSphere()
  const plane = createPlane()
  const directionalLight = createDirectionalLight()
  const ambientLight = createAmbientLight()
  const badge = createBadge()
  const { gui, fpsGraph } = createGUI()
  const pointLights = createPointLights()

  function initializeScene() {
    scene.add(camera)
    scene.add(directionalLight)
    scene.add(ambientLight)
    // scene.add(sphere)
    scene.add(badge)
    // scene.add(plane)
    pointLights.forEach(x => scene.add(x))
  }

  function initializeGUI() {
    const sphereFolder = gui.addFolder({
      title: 'Sphere',
    })

    sphereFolder.addInput(sphere.position, 'x', { min: -10, max: 10, step: 0.1 })
    sphereFolder.addInput(sphere.position, 'y', { min: -10, max: 10, step: 0.1 })
    sphereFolder.addInput(sphere.position, 'z', { min: -10, max: 10, step: 0.1 })
    sphereFolder.addInput(sphere.material, 'wireframe')

    const directionalLightFolder = gui.addFolder({
      title: 'Directional Light',
    })

    directionalLightFolder.addInput(directionalLight.position, 'x', { min: -10, max: 10, step: 0.1 })
    directionalLightFolder.addInput(directionalLight.position, 'y', { min: -10, max: 10, step: 0.1 })
    directionalLightFolder.addInput(directionalLight.position, 'z', { min: -10, max: 10, step: 0.1 })
    directionalLightFolder.addInput(directionalLight, 'intensity', { min: 0, max: 10, step: 0.1 })

    const ambientLightFolder = gui.addFolder({
      title: 'Ambient Light',
    })

    ambientLightFolder.addInput(ambientLight, 'intensity', { min: 0, max: 10, step: 0.1 })
  }

  function initializeControls() {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
  }

  function initializeRenderer() {
    updateRenderer(renderer, size)

    window.addEventListener('resize', () => {
      size.width = window.innerWidth
      size.height = window.innerHeight
      updateRenderer(renderer, size)

      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })
  }

  initializeScene()
  initializeControls()
  initializeRenderer()
  initializeGUI()

  function loop() {
    fpsGraph.begin()
    renderer.render(scene, camera)
    fpsGraph.end()
    requestAnimationFrame(loop)
  }

  return {
    loop,
  }
}

const { loop } = createApp()

loop()

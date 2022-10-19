import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { camera, sizes } from '@/core/camera'
import { createRenderer, updateRenderer } from '@/core/renderer'
import { createSphere } from '@/core/sphere'
import { createScene } from '@/core/scene'
import { createPlane } from '@/core/plane'
import { createAmbientLight, createDirectionalLight } from '@/core/light'
import { createGUI } from '@/core/gui'

import './assets/style.css'

function createApp() {
  const renderer = createRenderer()
  const scene = createScene()
  const sphere = createSphere()
  const plane = createPlane()
  const directionalLight = createDirectionalLight()
  const ambientLight = createAmbientLight()
  const { gui, fpsGraph } = createGUI()

  function initializeScene() {
    scene.add(camera)
    scene.add(directionalLight)
    scene.add(ambientLight)
    scene.add(sphere)
    scene.add(plane)
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
    updateRenderer(renderer)

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      updateRenderer(renderer)

      camera.aspect = sizes.width / sizes.height
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
    loop
  }
}

const { loop } = createApp()

loop()

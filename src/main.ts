import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createCamera } from '@/core/camera'
import { createRenderer, updateRenderer } from '@/core/renderer'
import { createSphere } from '@/core/sphere'
import { createScene } from '@/core/scene'
import { createPlane } from '@/core/plane'
import { createAmbientLight, createDirectionalLight, createLight, createPointLights } from '@/core/light'
import { createGUI } from '@/core/gui'

import './assets/style.css'
import type { Size } from '@/types/base.type'
import { createBadge } from '@/core/bedge'
import { createBuilding } from '@/core/entity/building'
import { createFloor } from '@/core/entity/floor'
import { createElevator } from '@/core/entity/elevator'
import { App } from '@/core/app'

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
  const pointLight = createLight()
  const building = createBuilding()
  const floors = createFloor({
    buildingHeight: building.geometry.parameters.height,
    numFloors: 10,
  })
  const { elevator, moveToFloor } = createElevator({
    buildingHeight: building.geometry.parameters.height,
  })

  function initializeScene() {
    scene.add(camera)
    scene.add(building)
    floors.forEach(x => building.add(x))
    building.add(elevator)

    moveToFloor(1)

    // scene.add(directionalLight)
    // scene.add(ambientLight)
    // scene.add(sphere)
    // scene.add(badge)
    // scene.add(pointLight)
    // scene.add(plane)
    // pointLights.forEach(x => scene.add(x))
  }

  const asd = new Proxy({
    floor: 0,
  }, {
    get(target: any, p: string | symbol): any {
      return target[p]
    },
    set(_target: any, p: string | symbol, value: any): boolean {
      if (p === 'floor')
        moveToFloor(value)

      return true
    },
  })

  function initializeGUI() {
    const elevatorFolder = gui.addFolder({
      title: 'Elevator',
    })

    elevatorFolder.addInput(asd, 'floor', { min: 1, max: 10, step: 1 })
    // const sphereFolder = gui.addFolder({
    //   title: 'Sphere',
    // })
    //
    // sphereFolder.addInput(sphere.position, 'x', { min: -10, max: 10, step: 0.1 })
    // sphereFolder.addInput(sphere.position, 'y', { min: -10, max: 10, step: 0.1 })
    // sphereFolder.addInput(sphere.position, 'z', { min: -10, max: 10, step: 0.1 })
    // sphereFolder.addInput(sphere.material, 'wireframe')
    //
    // const directionalLightFolder = gui.addFolder({
    //   title: 'Directional Light',
    // })
    //
    // directionalLightFolder.addInput(directionalLight.position, 'x', { min: -10, max: 10, step: 0.1 })
    // directionalLightFolder.addInput(directionalLight.position, 'y', { min: -10, max: 10, step: 0.1 })
    // directionalLightFolder.addInput(directionalLight.position, 'z', { min: -10, max: 10, step: 0.1 })
    // directionalLightFolder.addInput(directionalLight, 'intensity', { min: 0, max: 10, step: 0.1 })
    //
    // const ambientLightFolder = gui.addFolder({
    //   title: 'Ambient Light',
    // })
    //
    // ambientLightFolder.addInput(ambientLight, 'intensity', { min: 0, max: 10, step: 0.1 })
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

function createApp2() {
  const canvas = document.querySelector('#three') as HTMLCanvasElement
  const app = new App(canvas)

  return app
}

// const { loop } = createApp()
//
// loop()

const app = createApp2()

app.bindEventListeners()
app.render()

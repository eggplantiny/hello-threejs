import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import type { Camera } from 'three/src/cameras/Camera'
import type { Renderer } from 'three/src/renderers/WebGLRenderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { ScreenDimensions } from '@/types/base.type'
import type { Subject } from '@/core/subjects/Subject'
import { Building } from '@/core/subjects/modules/Building'
import { Floor } from '@/core/subjects/modules/Floor'
import { Elevator } from '@/core/subjects/modules/Elevator'

export class SceneManager {
  private readonly screenDimensions: ScreenDimensions
  private readonly canvas: HTMLCanvasElement
  private readonly scene: Scene
  private readonly camera: Camera
  private renderer: Renderer
  private subjects: Subject[] = []

  private readonly elevator: Elevator

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height,
    }

    this.scene = this.createScene()
    this.renderer = this.createRenderer()
    this.camera = this.createCamera()
    this.subjects = this.createSubjects()
    this.elevator = this.subjects.find(x => x instanceof Elevator) as Elevator

    this.subjects.forEach(x => this.scene.add(x.object))
  }

  private createScene() {
    const scene = new Scene()
    scene.background = new Color('#fff')
    return scene
  }

  private createRenderer() {
    const { canvas, screenDimensions } = this
    const { width, height } = screenDimensions
    const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true })
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
    renderer.setPixelRatio(DPR)
    renderer.setSize(width, height)

    return renderer
  }

  private createCamera() {
    const { width, height } = this.screenDimensions
    const aspectRatio = width / height
    const fieldOfView = 45
    const nearPlane = 1
    const farPlane = 1000
    const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    camera.position.set(40, 40, 40)

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.enableDamping = true

    return camera
  }

  private createSubjects() {
    const numFloors = 10
    const floorHeight = 10
    const building = new Building({
      numFloors,
      floorHeight,
    })
    const elevator = new Elevator({
      floorHeight,
      buildingHeight: building.height,
    })

    const floors = Array(numFloors)
      .fill(0)
      .map((_, c) => new Floor({
        width: 10,
        height: 1,
        depth: 10,
        position: {
          y: c * floorHeight - building.height / 2 + floorHeight / 2,
        },
      }))

    let current = 1
    elevator.moveTo(1)

    setInterval(() => {
      current += 1
      if (current > numFloors)
        current = 1

      elevator.moveTo(current)
    }, 2000)

    return [
      building,
      elevator,
      ...floors,
    ]
  }

  public update() {
    const now = this.clock
    this.subjects.forEach(subject => subject.update(now))
    this.camera.position.y = this.elevator.position.y + 36
    this.renderer.render(this.scene, this.camera)
  }

  public resize() {
    const { width, height } = this.canvas

    this.screenDimensions.width = width
    this.screenDimensions.height = height

    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    }

    this.renderer.setSize(width, height)
  }

  private get clock() {
    return Date.now()
  }
}

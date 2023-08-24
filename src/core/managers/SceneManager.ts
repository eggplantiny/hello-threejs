import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import type { Camera } from 'three/src/cameras/Camera'
import type { Renderer } from 'three/src/renderers/WebGLRenderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { ScreenDimensions } from '@/types/base.type'
import type { Subject } from '@/core/subjects/Subject'
import { Building } from '@/core/subjects/modules/Building'
import { Elevator } from '@/core/subjects/modules/Elevator'

interface Props {
  numFloors: number
}

const DEFAULT_PROPS: Props = {
  numFloors: 5,
}

export class SceneManager {
  private readonly screenDimensions: ScreenDimensions
  private readonly canvas: HTMLCanvasElement
  private readonly scene: Scene
  private readonly camera: Camera
  private renderer: Renderer
  private subjects: Subject[] = []
  private elevator: Elevator
  private _currentFloor = 1

  constructor(canvas: HTMLCanvasElement, props: Partial<Props> = {}) {
    const { numFloors } = { ...DEFAULT_PROPS, ...props }
    this.canvas = canvas
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height,
    }

    this.scene = this.createScene()
    this.renderer = this.createRenderer()
    this.camera = this.createCamera()
    this.subjects = this.createSubjects({
      numFloors,
    })

    this.elevator = this.subjects.find(x => x instanceof Elevator) as Elevator

    if (!this.elevator)
      throw new Error('Elevator not found')

    this.subjects.forEach(x => this.scene.add(x.object))

    this.trackSubject(this.elevator)
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

  private createSubjects(props: Props) {
    const building = new Building({
      numFloors: props.numFloors,
    })
    const elevator = new Elevator({
      buildingHeight: building.height,
      roomHeight: building.roomHeight,
      width: building.width - 1,
      depth: building.depth - 1,
      height: building.roomHeight,
    })
    return [
      building,
      elevator,
    ]
  }

  private trackSubject(subject: Subject) {
    const camera = this.camera
    camera.position.z = subject.object.position.z + 36
  }

  private get clock() {
    return Date.now()
  }

  private setFloor(floorNumber: number) {
    this.elevator.moveTo(floorNumber)
  }

  public dispose() {
    this.subjects.forEach(subject => subject.dispose())
  }

  public update() {
    const now = this.clock
    // const elevator = this.elevator
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

  public get currentFloor() {
    return this._currentFloor
  }

  public set currentFloor(value: number) {
    this._currentFloor = value
    this.setFloor(value)
  }
}

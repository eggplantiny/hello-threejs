import { SceneManager } from '@/core/managers/SceneManager'
import { GuiManager } from '@/core/managers/GuiManager'
import type { APP_EVENT } from '@/core/managers/EventManager'
import EventManager from '@/core/managers/EventManager'

export class App {
  private canvas: HTMLCanvasElement
  private sceneManager: SceneManager
  private guiManager: GuiManager
  private eventManager = EventManager.getInstance()

  constructor(canvas: HTMLCanvasElement, props: {
    numFloors: number
  }) {
    this.canvas = canvas
    this.sceneManager = new SceneManager(canvas, props)
    this.guiManager = new GuiManager()
  }

  private resize() {
    const { canvas } = this

    canvas.style.width = '100%'
    canvas.style.height = '100%'

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    this.sceneManager.resize()
  }

  private render() {
    this.guiManager.fps.begin()
    requestAnimationFrame(this.render.bind(this))
    this.sceneManager.update()
    this.guiManager.fps.end()
  }

  bindEventListeners(): App {
    this.resize()
    window.addEventListener('resize', this.resize.bind(this), false)
    return this
  }

  public run(): App {
    this.render()
    return this
  }

  public setFloor(floor: number): App {
    this.sceneManager.currentFloor = floor
    return this
  }

  public addEvent(eventName: APP_EVENT, callback: () => void): App {
    this.eventManager.addEvent(eventName, callback)
    return this
  }

  public dispose(): void {
    this.sceneManager.dispose()
  }
}

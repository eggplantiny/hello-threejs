import { SceneManager } from '@/core/managers/SceneManager'
import { GuiManager } from '@/core/managers/GuiManager'

export class App {
  private canvas: HTMLCanvasElement
  private sceneManager: SceneManager
  private guiManager: GuiManager

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.sceneManager = new SceneManager(canvas)
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

    setInterval(() => {
      if (this.sceneManager.currentFloor === 10)
        this.sceneManager.currentFloor = 1
      else
        this.sceneManager.currentFloor += 1
    }, 2000)
    return this
  }

  public dispose(): void {
    this.sceneManager.dispose()
  }
}

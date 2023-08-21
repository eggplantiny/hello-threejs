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

  bindEventListeners() {
    this.resize()
    window.addEventListener('resize', this.resize.bind(this), false)
  }

  resize() {
    const { canvas } = this

    canvas.style.width = '100%'
    canvas.style.height = '100%'

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    this.sceneManager.resize()
  }

  render() {
    this.guiManager.fps.begin()
    requestAnimationFrame(this.render.bind(this))
    this.sceneManager.update()
    this.guiManager.fps.end()
  }
}

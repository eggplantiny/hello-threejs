import './assets/style.css'
import { App } from '@/core/app'

function createApp(canvasElement: HTMLCanvasElement, numFloors: number) {
  return new App(canvasElement, {
    numFloors,
  })
}

const app = createApp(
  document.querySelector('#three') as HTMLCanvasElement,
  2,
)

app
  .bindEventListeners()
  .addEvent('move_start', () => {
    console.log('move_start')
  })
  .addEvent('moving', () => {
    console.log('moving')
  })
  .addEvent('move_end', () => {
    console.log('move_end')
  })
  .run()

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.dispose()
  })
}

window.app = app

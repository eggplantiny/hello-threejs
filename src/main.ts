import './assets/style.css'
import { App } from '@/core/app'

function createApp(canvasElement: HTMLCanvasElement) {
  return new App(canvasElement)
}

const app = createApp(document.querySelector('#three') as HTMLCanvasElement)

app
  .bindEventListeners()
  .run()

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.dispose()
  })
}

import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { BladeApi } from '@tweakpane/core/src/blade/common/api/blade'
import { BladeController } from '@tweakpane/core/src/blade/common/controller/blade'
import { View } from '@tweakpane/core/src/common/view/view'

export function createGUI() {
  const gui = new Pane()
  gui.registerPlugin(EssentialsPlugin)

  const fpsGraph: BladeApi<BladeController<View>> & { begin: () => void; end: () => void } = gui.addBlade({
    view: 'fpsgraph',
    label: 'FPS'
  }) as any

  return {
    gui,
    fpsGraph
  }
}

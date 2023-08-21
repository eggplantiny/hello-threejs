import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import type { BladeApi } from '@tweakpane/core/src/blade/common/api/blade'
import type { BladeController } from '@tweakpane/core/src/blade/common/controller/blade'
import type { View } from '@tweakpane/core/src/common/view/view'

export type FPSGraph = BladeApi<BladeController<View>> & { begin: () => void; end: () => void }
export class GuiManager {
  pane: Pane
  fps: FPSGraph

  constructor() {
    this.pane = new Pane()
    this.pane.registerPlugin(EssentialsPlugin)

    this.fps = this.pane.addBlade({
      view: 'fpsgraph',
      label: 'FPS',
    }) as any
  }
}

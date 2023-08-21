import { AmbientLight } from 'three'
import { Subject } from '@/core/subjects/Subject'

export class GeneralLights extends Subject<AmbientLight> {
  constructor() {
    const color = 0xFFFFFF
    const intensity = 1
    super(new AmbientLight(color, intensity))
  }

  update(time: number): void {
    this.object.intensity = (Math.sin(time) + 1.5) / 1.5
    this.object.color.setHSL(Math.sin(time), 0.5, 0.5)
  }
}

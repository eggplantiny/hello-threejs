export type APP_EVENT = 'move_start' | 'moving' | 'move_end' | 'floor_change'
export default class EventManager {
  static instance: EventManager
  private eventMap = new Map<APP_EVENT, () => void>()

  private constructor() {
  }

  static getInstance(): EventManager {
    if (!EventManager.instance)
      EventManager.instance = new EventManager()

    return EventManager.instance
  }

  public addEvent(eventName: APP_EVENT, callback: () => void): void {
    this.eventMap.set(eventName, callback)
  }

  public trigger(eventName: APP_EVENT): void {
    const callback = this.eventMap.get(eventName)
    if (callback)
      callback()
  }
}

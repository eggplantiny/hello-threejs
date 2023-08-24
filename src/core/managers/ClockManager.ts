import { Clock } from 'three'

export default class ClockManager {
  static instance: ClockManager
  private clock: Clock

  private constructor() {
    this.clock = new Clock()
  }

  public static getInstance(): ClockManager {
    if (!ClockManager.instance)
      ClockManager.instance = new ClockManager()

    return ClockManager.instance
  }

  public getDelta(): number {
    return this.clock.getDelta()
  }

  public getElapsedTime(): number {
    return this.clock.getElapsedTime()
  }

  public now(): number {
    return Date.now()
  }
}

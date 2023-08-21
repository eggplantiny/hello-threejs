export interface Size {
  width: number
  height: number
}

export interface ScreenDimensions {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
  z: number
}

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

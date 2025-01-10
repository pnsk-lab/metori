import type { Tensor } from './core/tensor.ts'

export type TensorShape = number[]

export type AnyShapeJSArray = (number | AnyShapeJSArray)[]
export type AnyShapeJSArrayOrNumber = number | AnyShapeJSArray
export type TypedJSArray<Shape extends TensorShape> = AnyShapeJSArray & {
  // Not used
  // Just for type inference
  _shape?: Shape
}
export type GetShape<T extends AnyShapeJSArray> = T extends { length: infer L }
  ? T[number] extends Array<any>
    ? [L, ...GetShape<T[number]>]
    : [L]
  : []

export type CalculatingNode = {
  type: 'tensor'
  id: number
} | {
  type: 'add'
  left: CalculatingNode
  right: CalculatingNode
} | {
  type: 'sub'
  left: CalculatingNode
  right: CalculatingNode
} | {
  type: 'zeros'
  shape: TensorShape
} | {
  type: 'ones'
  shape: TensorShape
} | {
  type: 'dot'
  left: CalculatingNode
  right: CalculatingNode
}

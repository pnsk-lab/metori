import type { Tensor } from '../mod.ts'
import type { AnyShapeJSArray, TensorShape, CalculatingNode, AnyShapeJSArrayOrNumber } from '../types.ts'

export type SupportedOperations = Set<CalculatingNode['type']>
export interface MetoriAdapter {
  name: string

  /**
   * Supported operations
   */
  supportedOperations: SupportedOperations

  /**
   * Create tensor from JS array
   * @param input Input JS array
   * @returns Tensor ID
   */
  createTensorFromArray: (input: AnyShapeJSArrayOrNumber) => number

  /**
   * Calculate tensor
   * @param tree Calculating tree
   * @returns Calculated tensor
   */
  calculate: (tree: CalculatingNode) => Promise<number> | number

  /**
   * Calculate gradient
   * @param tree Calculating tree
   * @returns Gradient
   */
  calculateGradient: (tree: CalculatingNode) => Promise<Record<number, Tensor<TensorShape>>> | Record<number, Tensor<TensorShape>>

  /**
   * Convert tensor to array
   * @param id Tensor ID
   * @returns Array
   */
  toArray: (id: number) => Promise<AnyShapeJSArrayOrNumber> | AnyShapeJSArrayOrNumber
}

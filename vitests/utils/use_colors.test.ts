import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'
import { useColors } from 'atomic'

describe('useColors', (): void => {
  it('should return an object with all color keys and their colors', (): void => {
    const result = useColors()

    atomic.colorKeys.forEach((key: string): void => {
      expect(result.colors).toHaveProperty(key)

      const itemColors = result.colors[key]

      expect(itemColors).toHaveProperty('primary')
      expect(itemColors).toHaveProperty('hover')
      expect(itemColors).toHaveProperty('secondary')

      expect(itemColors.primary).toBe(
        atomic.getColorValue(`${key}-item-color-user`) ||
          atomic.getColorValue(`${key}-item-color-system`)
      )
      expect(itemColors.hover).toBe(
        atomic.getColorValue(`${key}-item-hover-color-user`) ||
          atomic.getColorValue(`${key}-item-hover-color-system`)
      )
      expect(itemColors.secondary).toBe(
        atomic.getColorValue(`${key}-item-secondary-color-user`) ||
          atomic.getColorValue(`${key}-item-secondary-color-system`)
      )
    })
  })
})

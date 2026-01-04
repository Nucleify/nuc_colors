import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'
import { resetColorsToDefault } from 'atomic'

describe('resetColorsToDefault', (): void => {
  beforeEach((): void => {
    vi.restoreAllMocks()
  })

  it('should reset all colors to default values', (): void => {
    resetColorsToDefault()

    const styleElement = document.getElementById('nuc-color-vars')
    expect(styleElement).toBeTruthy()
    expect(styleElement?.tagName).toBe('STYLE')

    const styleContent = styleElement?.textContent || ''

    atomic.colorKeys.forEach((item) => {
      atomic.colorShades.forEach((state) => {
        const key = `${item}-item-${state}`
        const defaultValue = atomic.defaultColors[key]

        if (defaultValue) {
          expect(styleContent).toContain(`--${key}: ${defaultValue}`)
        }
      })
    })
  })

  it('should call storage functions correctly', (): void => {
    const localStorageSetItemSpy = vi
      .spyOn(atomic, 'localStorageSetItem')
      .mockImplementation()
    const cookieSetItemSpy = vi
      .spyOn(atomic, 'cookieSetItem')
      .mockImplementation()

    resetColorsToDefault()

    const expectedCalls = atomic.colorKeys.reduce((acc, item) => {
      return (
        acc +
        atomic.colorShades.filter(
          (state) => atomic.defaultColors[`${item}-item-${state}`]
        ).length
      )
    }, 0)

    expect(localStorageSetItemSpy).toHaveBeenCalledTimes(expectedCalls)
    expect(cookieSetItemSpy).toHaveBeenCalledTimes(expectedCalls)
  })
})

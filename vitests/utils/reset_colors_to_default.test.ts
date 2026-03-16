import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'
import { resetColorsToDefault } from 'nucleify'

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

    nucleify.colorKeys.forEach((item) => {
      nucleify.colorShades.forEach((state) => {
        const key = `${item}-${state}`
        const defaultValue = nucleify.defaultColors[key]

        if (defaultValue) {
          expect(styleContent).toContain(`--${key}: ${defaultValue}`)
        }
      })
    })
  })

  it('should call storage functions correctly', (): void => {
    const localStorageSetItemSpy = vi
      .spyOn(nucleify, 'localStorageSetItem')
      .mockImplementation()
    const cookieSetItemSpy = vi
      .spyOn(nucleify, 'cookieSetItem')
      .mockImplementation()

    resetColorsToDefault()

    const expectedCalls = nucleify.colorKeys.reduce((acc, item) => {
      return (
        acc +
        nucleify.colorShades.filter(
          (state) => nucleify.defaultColors[`${item}-${state}`]
        ).length
      )
    }, 0)

    expect(localStorageSetItemSpy).toHaveBeenCalledTimes(expectedCalls)
    expect(cookieSetItemSpy).toHaveBeenCalledTimes(expectedCalls)
  })
})

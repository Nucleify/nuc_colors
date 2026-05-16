import { beforeEach, describe, expect, it, vi } from 'vitest'

const updateAllUserColorsInDatabase = vi.fn().mockResolvedValue(undefined)
const clearUserColorsCache = vi.fn()

vi.mock('../../atomic/boson/utils/update_user_colors_in_database', () => ({
  updateAllUserColorsInDatabase: (...args: unknown[]) =>
    updateAllUserColorsInDatabase(...args),
  clearUserColorsCache: (...args: unknown[]) => clearUserColorsCache(...args),
}))

import * as nucleify from 'nucleify'
import { resetColorsToDefault } from 'nucleify'

describe('resetColorsToDefault', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks()
    updateAllUserColorsInDatabase.mockResolvedValue(undefined)
  })

  it('should reset all colors to default values', async (): Promise<void> => {
    await resetColorsToDefault()

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

  it('should persist reset colors to the database', async (): Promise<void> => {
    await resetColorsToDefault()

    expect(clearUserColorsCache).toHaveBeenCalledTimes(1)
    expect(updateAllUserColorsInDatabase).toHaveBeenCalledTimes(1)
  })

  it('should call storage functions correctly', async (): Promise<void> => {
    const localStorageSetItemSpy = vi
      .spyOn(nucleify, 'localStorageSetItem')
      .mockImplementation()
    const cookieSetItemSpy = vi
      .spyOn(nucleify, 'cookieSetItem')
      .mockImplementation()

    await resetColorsToDefault()

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

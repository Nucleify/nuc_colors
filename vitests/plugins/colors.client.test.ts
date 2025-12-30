import type { NuxtApp } from 'nuxt/app'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

import { colorsClientPlugin } from '../../plugins'

vi.mock('atomic', () => ({
  colorKeys: ['foo'],
  colorShades: ['bar'],
  cookieGetItem: vi.fn().mockReturnValue(undefined),
  localStorageGetItem: vi.fn().mockReturnValue('localValue'),
  cookieSetItem: vi.fn(),
  localStorageSetItem: vi.fn(),
  applyColorsWithSystemAndUser: vi.fn(),
}))

describe('colors.client plugin', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
    })
    vi.clearAllMocks()
  })

  afterEach((): void => {
    delete globalThis.__TEST_CLIENT__
  })

  it('calls applyColorsWithSystemAndUser and syncs localStorage/cookies', (): void => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    colorsClientPlugin({} as NuxtApp)

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'DOMContentLoaded',
      atomic.applyColorsWithSystemAndUser,
      { once: true }
    )
    expect(atomic.applyColorsWithSystemAndUser).not.toHaveBeenCalled()
    expect(atomic.cookieSetItem).toHaveBeenCalledWith(
      'foo-item-bar-system',
      'localValue'
    )
    expect(atomic.cookieSetItem).toHaveBeenCalledWith(
      'foo-item-bar-user',
      'localValue'
    )
  })
})

import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'
import { setColorWithUserSuffix } from 'atomic'

describe('setColorWithUserSuffix', (): void => {
  it('should set cookie, localStorage, and CSS variable with user suffix', (): void => {
    const key = 'task-item-color'
    const value = '#ff0000'
    const userKey = `${key}-user`

    atomic.cookieSetItem(userKey, '')
    atomic.localStorageSetItem(userKey, '')
    document.documentElement.style.removeProperty(`--${key}`)

    setColorWithUserSuffix(key, value)

    expect(document.cookie.includes(`${userKey}=${value}`)).toBe(true)

    expect(localStorage.getItem(userKey)).toBe(value)

    const cssValue = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${key}`)
      .trim()

    expect(cssValue).toBe(value)
  })
})

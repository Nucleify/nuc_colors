import { defineNuxtPlugin } from 'nuxt/app'

import {
  applyColorsWithSystemAndUser,
  colorKeys,
  colorShades,
  cookieGetItem,
  cookieSetItem,
  localStorageGetItem,
  localStorageSetItem,
} from 'atomic'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    applyColorsWithSystemAndUser()

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const baseKey = `${item}-item-${state}`
        const systemKey = `${baseKey}-system`
        const userKey = `${baseKey}-user`

        const systemLocalStorageValue = localStorageGetItem(systemKey)
        const systemCookieValue = cookieGetItem(systemKey)
        if (systemLocalStorageValue && !systemCookieValue) {
          cookieSetItem(systemKey, systemLocalStorageValue)
        }

        const userLocalStorageValue = localStorageGetItem(userKey)
        const userCookieValue = cookieGetItem(userKey)

        if (userLocalStorageValue && !userCookieValue) {
          cookieSetItem(userKey, userLocalStorageValue)
        } else if (!userLocalStorageValue && !userCookieValue) {
          const systemValue = systemLocalStorageValue || systemCookieValue
          if (systemValue) {
            cookieSetItem(userKey, systemValue)
            localStorageSetItem(userKey, systemValue)
          }
        }
      })
    )
  }
})

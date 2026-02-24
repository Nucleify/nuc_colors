import { defineNuxtPlugin, useHead, useRequestEvent } from 'nuxt/app'

import { colorKeys, colorShades, defaultColors } from 'atomic'

export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event) {
      const cookies = event.node.req.headers.cookie || ''

      const colorVariables: string[] = []

      colorKeys.forEach((item: string) => {
        colorShades.forEach((state: string) => {
          const baseKey = `${item}-item-${state}`
          const systemKey = `${baseKey}-system`
          const systemCookieMatch = cookies.match(
            new RegExp(`${systemKey}=([^;]+)`)
          )
          const value = systemCookieMatch
            ? decodeURIComponent(systemCookieMatch[1])
            : defaultColors[baseKey] || ''

          if (value) {
            colorVariables.push(`--${systemKey}: ${value};`)
            colorVariables.push(`--${baseKey}: ${value};`)
          }
        })
      })

      colorKeys.forEach((item: string) => {
        colorShades.forEach((state: string) => {
          const baseKey = `${item}-item-${state}`
          const systemKey = `${baseKey}-system`
          const userKey = `${baseKey}-user`
          const userCookieMatch = cookies.match(
            new RegExp(`${userKey}=([^;]+)`)
          )
          const systemCookieMatch = cookies.match(
            new RegExp(`${systemKey}=([^;]+)`)
          )

          const userValue = userCookieMatch
            ? decodeURIComponent(userCookieMatch[1])
            : systemCookieMatch
              ? decodeURIComponent(systemCookieMatch[1])
              : defaultColors[baseKey] || ''

          if (userValue) {
            colorVariables.push(`--${userKey}: ${userValue};`)
            colorVariables.push(`--${baseKey}: ${userValue};`)
          }
        })
      })

      useHead({
        style: [
          {
            innerHTML: `:root { ${colorVariables.join(' ')} }`,
          },
        ],
      })
    }
  }
})

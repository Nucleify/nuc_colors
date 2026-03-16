import { defineNuxtPlugin, useHead, useRequestEvent } from 'nuxt/app'

import { colorKeys, colorShades, defaultColors } from 'nucleify'

export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event) {
      const cookies = event.node.req.headers.cookie || ''

      const colorVariables: string[] = []

      colorKeys.forEach((item: string) => {
        colorShades.forEach((state: string) => {
          const baseKey = `${item}-${state}`
          const systemKey = `${baseKey}-s`
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
          const baseKey = `${item}-${state}`
          const systemKey = `${baseKey}-s`
          const userKey = `${baseKey}-u`
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

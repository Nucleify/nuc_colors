import { defineNuxtPlugin, useHead, useRequestEvent } from 'nuxt/app'

import { colorKeys, colorShades } from 'atomic'

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

          if (systemCookieMatch) {
            const value = decodeURIComponent(systemCookieMatch[1])
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
              : null

          if (userValue) {
            colorVariables.push(`--${userKey}: ${userValue};`)
            colorVariables.push(`--${baseKey}: ${userValue};`)
          }
        })
      })

      if (colorVariables.length > 0) {
        useHead({
          style: [
            {
              innerHTML: `:root { ${colorVariables.join(' ')} }`,
            },
          ],
        })
      }
    }
  }
})

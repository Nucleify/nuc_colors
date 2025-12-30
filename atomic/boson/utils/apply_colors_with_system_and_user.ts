import {
  colorKeys,
  colorShades,
  cookieGetItem,
  defaultColors,
  getColorValue,
  localStorageGetItem,
} from 'atomic'

export function applyColorsWithSystemAndUser(): void {
  if (import.meta.client) {
    const cssVars: string[] = []

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const baseKey = `${item}-item-${state}`
        const systemKey = `${baseKey}-system`
        const userKey = `${baseKey}-user`
        const systemValue =
          cookieGetItem(systemKey) ||
          localStorageGetItem(systemKey) ||
          defaultColors[baseKey] ||
          ''

        if (systemValue) {
          cssVars.push(`--${systemKey}: ${systemValue}`)
          cssVars.push(`--${baseKey}: ${systemValue}`)
        }

        const userValue =
          cookieGetItem(userKey) ||
          localStorageGetItem(userKey) ||
          systemValue ||
          ''

        if (userValue) {
          cssVars.push(`--${userKey}: ${userValue}`)
          cssVars.push(`--${baseKey}: ${userValue}`)
        }
      })
    )

    const style = document.createElement('style')

    style.id = 'nuc-color-vars'
    style.textContent = `:root { ${cssVars.join('; ')} }`

    const existingStyle = document.getElementById('nuc-color-vars')

    if (existingStyle) {
      existingStyle.remove()
    }
    document.head.appendChild(style)
  }
}

if (import.meta.client) {
  document.addEventListener('colorUpdated', applyColorsWithSystemAndUser)
}

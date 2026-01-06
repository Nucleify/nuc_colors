import {
  applyColorsWithSystemAndUser,
  colorKeys,
  colorShades,
  cookieGetItem,
  cookieSetItem,
  defaultColors,
  localStorageGetItem,
  localStorageSetItem,
} from 'atomic'

export function resetColorsToDefault(): void {
  if (import.meta.client) {
    console.log('🔄 Resetting all colors to default values...')
    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const key = `${item}-item-${state}`
        const systemKey = `${key}-system`
        const userKey = `${key}-user`
        const systemValue =
          cookieGetItem(systemKey) ||
          localStorageGetItem(systemKey) ||
          defaultColors[key]

        if (systemValue) {
          cookieSetItem(userKey, systemValue)
          localStorageSetItem(userKey, systemValue)

          console.log(`✅ Reset: ${userKey} = ${systemValue}`)
        }
      })
    )

    applyColorsWithSystemAndUser()

    const event = new Event('colorUpdated')
    document.dispatchEvent(event)

    console.log('🎉 All colors reset to default values!')
  }
}

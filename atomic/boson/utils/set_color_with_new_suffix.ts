import { cookieSetItem, localStorageSetItem } from 'atomic'

export function setColorWithNewSuffix(key: string, value: string): void {
  const userKey = `${key}-user`

  cookieSetItem(userKey, value)
  localStorageSetItem(userKey, value)

  if (import.meta.client) {
    document.documentElement.style.setProperty(`--${key}`, value)
    const event = new Event('colorUpdated')
    document.dispatchEvent(event)
  }
}

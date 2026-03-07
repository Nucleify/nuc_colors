import { cookieGetItem, defaultColors, localStorageGetItem } from 'nucleify'

export function getColorValue(key: string): string {
  return (
    cookieGetItem(key) || localStorageGetItem(key) || defaultColors[key] || ''
  )
}

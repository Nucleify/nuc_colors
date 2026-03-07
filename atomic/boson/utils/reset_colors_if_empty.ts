import {
  localStorageGetItem,
  localStorageSetItem,
  resetColorsToDefault,
} from 'nucleify'

export function resetColorsIfEmpty(): void {
  if (import.meta.client) {
    const shouldReset =
      localStorageGetItem('colors-initialized') === 'true' ? false : true

    if (!shouldReset) return

    localStorageSetItem('colors-initialized', 'true')
    resetColorsToDefault()
  }
}

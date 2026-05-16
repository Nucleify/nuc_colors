import {
  applyColorsWithSystemAndUser,
  colorKeys,
  colorShades,
  cookieGetItem,
  cookieSetItem,
  defaultColors,
  localStorageGetItem,
  localStorageSetItem,
} from 'nucleify'

import {
  clearUserColorsCache,
  updateAllUserColorsInDatabase,
} from './update_user_colors_in_database'

export async function resetColorsToDefault(): Promise<void> {
  if (!import.meta.client) return

  colorKeys.forEach((item: string): void =>
    colorShades.forEach((state: string): void => {
      const key = `${item}-${state}`
      const systemKey = `${key}-s`
      const userKey = `${key}-u`
      const systemValue =
        cookieGetItem(systemKey) ||
        localStorageGetItem(systemKey) ||
        defaultColors[key]

      if (systemValue) {
        cookieSetItem(userKey, systemValue)
        localStorageSetItem(userKey, systemValue)
      }
    })
  )

  applyColorsWithSystemAndUser()

  clearUserColorsCache()
  await updateAllUserColorsInDatabase()
}

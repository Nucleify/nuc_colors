import {
  apiRequest,
  colorKeys,
  colorShades,
  cookieGetItem,
  cookieSetItem,
  localStorageGetItem,
  localStorageSetItem,
  sessionStorageGetItem,
} from 'atomic'

import { applyColorsWithSystemAndUser } from './apply_colors_with_system_and_user'

interface UserColorFromDatabase {
  id: number
  user_id: number
  name: string
  value: string
  new: boolean
  created_at: string
  updated_at: string
}

export async function syncColorsWithDatabase(): Promise<void> {
  if (!import.meta.client) return

  const userId = sessionStorageGetItem('user_id')

  if (!userId) {
    console.log('🎨 User not authenticated, skipping color sync')
    return
  }

  try {
    console.log('🔄 Syncing colors with database...')

    const response = await apiRequest<UserColorFromDatabase[]>(
      apiUrl() + '/user-colors',
      'GET'
    )

    const dbColors = Array.isArray(response) ? response : []

    if (dbColors.length === 0) {
      console.log('📭 No colors found in database')
      return
    }

    const dbColorMap = new Map<string, UserColorFromDatabase>()

    dbColors.forEach((color: UserColorFromDatabase) => {
      dbColorMap.set(color.name, color)
    })

    let updatedCount = 0

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const userKey = `${item}-item-${state}-user`
        const dbColor = dbColorMap.get(userKey)

        if (!dbColor) return

        const storageValue =
          cookieGetItem(userKey) || localStorageGetItem(userKey)

        if (storageValue !== dbColor.value) {
          cookieSetItem(userKey, dbColor.value)
          localStorageSetItem(userKey, dbColor.value)
          updatedCount++
        }
      })
    )

    if (updatedCount > 0) {
      console.log(`✅ Synced ${updatedCount} colors from database`)
      applyColorsWithSystemAndUser()

      const event = new Event('colorUpdated')
      document.dispatchEvent(event)
    } else {
      console.log('✅ Colors are already in sync')
    }
  } catch (error) {
    console.error('❌ Failed to sync colors with database:', error)
  }
}

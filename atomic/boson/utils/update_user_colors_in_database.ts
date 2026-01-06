import type { ApiResponseType } from 'atomic'
import {
  apiRequest,
  colorKeys,
  colorShades,
  cookieGetItem,
  localStorageGetItem,
  sessionStorageGetItem,
} from 'atomic'

interface ColorUpdatePayload {
  name: string
  value: string
  new: boolean
}

interface BulkUpdateResponse {
  success: boolean
  updated_count: number
  created_count: number
  message: string
}

function extractResponse<T>(response: ApiResponseType<T>): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as { data: T }).data
  }
  return response as T
}

const pendingUpdates: Map<string, string> = new Map()
let debounceTimer: ReturnType<typeof setTimeout> | null = null

async function flushPendingUpdates(): Promise<void> {
  if (pendingUpdates.size === 0) return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  const colors: ColorUpdatePayload[] = Array.from(pendingUpdates.entries()).map(
    ([name, value]) => ({ name, value, new: true })
  )

  pendingUpdates.clear()

  try {
    const rawResponse = await apiRequest<BulkUpdateResponse>(
      apiUrl() + '/user-colors/all',
      'PUT',
      { colors }
    )
    const response = extractResponse(rawResponse)

    if (response.updated_count > 0 || response.created_count > 0) {
      console.log(
        `💾 Updated ${response.updated_count}, created ${response.created_count} colors in database`
      )
    }
  } catch (error) {
    console.error('❌ Failed to update colors in database:', error)
  }
}

export function clearUserColorsCache(): void {
  pendingUpdates.clear()
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
}

export async function updateUserColorInDatabase(
  colorName: string,
  colorValue: string
): Promise<void> {
  if (!import.meta.client) return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  pendingUpdates.set(colorName, colorValue)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    flushPendingUpdates()
    debounceTimer = null
  }, 500)
}

export async function updateAllUserColorsInDatabase(): Promise<void> {
  if (!import.meta.client) return

  const userId = sessionStorageGetItem('user_id')
  if (!userId) return

  try {
    console.log('💾 Updating all user colors in database...')

    const colors: ColorUpdatePayload[] = []

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const userKey = `${item}-item-${state}-user`
        const value = cookieGetItem(userKey) || localStorageGetItem(userKey)

        if (value) {
          colors.push({ name: userKey, value, new: false })
        }
      })
    )

    if (colors.length === 0) {
      console.log('📭 No colors to update')
      return
    }

    const rawResponse = await apiRequest<BulkUpdateResponse>(
      apiUrl() + '/user-colors/all',
      'PUT',
      { colors }
    )
    const response = extractResponse(rawResponse)

    if (response.updated_count > 0 || response.created_count > 0) {
      console.log(
        `✅ Updated ${response.updated_count}, created ${response.created_count} colors in database`
      )
    } else {
      console.log('✅ All colors already up to date in database')
    }
  } catch (error) {
    console.error('❌ Failed to update colors in database:', error)
  }
}

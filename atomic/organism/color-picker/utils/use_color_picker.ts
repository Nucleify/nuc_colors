import type { Ref } from 'vue'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

import type { UseColorPickerInterface, UseColorsInterface } from 'atomic'
import {
  applyColorsWithSystemAndUser,
  createColorShades,
  setColorWithUserSuffix,
  updateUserColorInDatabase,
  useColors,
} from 'atomic'

export function useColorPicker(item: string): UseColorPickerInterface {
  const { colors }: UseColorsInterface = useColors()

  const itemColor: Ref<string> = ref(colors[item]?.primary || '#000000')

  function updateItemColor(): void {
    if (!import.meta.client) return

    nextTick(() => {
      const userKey = `--${item}-item-color-user`

      const computedStyle = getComputedStyle(document.documentElement)
      const newColor =
        computedStyle.getPropertyValue(userKey).trim() || '#000000'

      if (itemColor.value !== newColor) {
        itemColor.value = newColor
      }
    })
  }

  async function setColorValues(): Promise<void> {
    const colorValue = itemColor.value?.startsWith('#')
      ? itemColor.value
      : `#${itemColor.value}`

    if (!colorValue) return

    const colorSettings = createColorShades(colorValue)

    const updatePromises: Promise<void>[] = []

    Object.entries(colorSettings).forEach(([key, value]) => {
      const colorKey = `${item}-item${key ? `-${key}` : ''}-color`
      setColorWithUserSuffix(colorKey, value)

      const userKey = `${colorKey}-user`
      updatePromises.push(updateUserColorInDatabase(userKey, value))
    })

    applyColorsWithSystemAndUser()

    await Promise.all(updatePromises)
  }

  if (import.meta.client) {
    onMounted(() => {
      document.addEventListener('colorUpdated', updateItemColor)
    })

    onUnmounted(() => {
      document.removeEventListener('colorUpdated', updateItemColor)
    })
  }

  return { itemColor, setColorValues }
}

import type { Ref } from 'vue'

import type { ColorPickerInterface } from 'nucleify'

export interface NucColorPickerInterface extends ColorPickerInterface {}

export interface UseColorPickerInterface {
  itemColor: Ref<string | undefined>
  setColorValues: () => Promise<void>
}

import type { ColorPickerProps } from 'primevue'

export interface NucColorPickerInterface extends ColorPickerProps {
  nuiType: NuiTypeType
}

export interface UseColorPickerInterface {
  setColorValues: () => Promise<void>
}

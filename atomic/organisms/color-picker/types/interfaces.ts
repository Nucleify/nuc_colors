import type { ColorPickerProps } from 'primevue'

export interface NucColorPickerInterface extends ColorPickerProps {
  adType: AdTypeType
}

export interface UseColorPickerInterface {
  setColorValues: () => Promise<void>
}

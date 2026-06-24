import type { App } from 'vue'

import {
  colorsClientPlugin,
  NucColorPicker,
  NucColorSettingsCard,
} from 'nucleify'

export function registerNucColors(app: App<Element>): void {
  app
    .component('nuc-color-picker', NucColorPicker)
    .component('nuc-color-settings-card', NucColorSettingsCard)

  colorsClientPlugin()
}

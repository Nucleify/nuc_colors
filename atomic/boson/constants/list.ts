import type { SettingsGroupInterface } from 'atomic'

import { modulesGroups } from '../../../../nuc_settings/constants/modules'

export function getColorGroups(): SettingsGroupInterface[] {
  return [
    {
      name: 'Main',
      items: ['Main'],
    },
    ...modulesGroups(),
  ]
}

export function getColorList(): string[] {
  return getColorGroups().flatMap((group) => group.items as string[])
}

export const colorGroups: SettingsGroupInterface[] = []
export const colorList: string[] = []

if (typeof window !== 'undefined') {
  colorGroups.push(...getColorGroups())
  colorList.push(...getColorList())
}

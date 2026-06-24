import { colorKeys } from './keys'

import { modulesGroups } from '../../../../nuc_settings/constants/modules'
import type { SettingsGroupInterface } from '../../../../nuc_settings/types/interfaces'

function capitalize(value: string): string {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const colorKeySet = new Set(colorKeys)

function toColorItem(item: string): string | null {
  const key = item.toLowerCase()
  return colorKeySet.has(key) ? capitalize(key) : null
}

export function getColorGroups(): SettingsGroupInterface[] {
  const moduleGroups = modulesGroups(true)
    .map((group) => ({
      name: group.name,
      items: (group.items ?? [])
        .map(toColorItem)
        .filter((item): item is string => item !== null),
    }))
    .filter((group) => (group.items?.length ?? 0) > 0)

  const groups: SettingsGroupInterface[] = [
    {
      name: 'main',
      items: ['Main'],
    },
  ]

  if (colorKeySet.has('user')) {
    groups.push({
      name: 'nuc_admin',
      items: ['User'],
    })
  }

  return [...groups, ...moduleGroups]
}

export function getColorList(): string[] {
  return getColorGroups().flatMap((group) => group.items ?? [])
}

export const colorGroups: SettingsGroupInterface[] = getColorGroups()
export const colorList: string[] = getColorList()

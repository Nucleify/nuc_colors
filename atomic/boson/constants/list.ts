import type { SettingsGroupInterface } from 'atomic'
import { modulesGroups } from 'atomic'

export const colorGroups: SettingsGroupInterface[] =
  typeof window !== 'undefined' && typeof modulesGroups === 'function'
    ? [
        {
          name: 'Main',
          items: ['Main'],
        },
        ...modulesGroups(),
      ]
    : []

export const colorList: string[] =
  typeof window !== 'undefined'
    ? [...colorGroups.flatMap((group) => group.items as string[])]
    : []

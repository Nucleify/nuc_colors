export interface ColorGroup {
  module: string
  items: string[]
}

export const colorGroups: ColorGroup[] = [
  {
    module: 'Main',
    items: ['Main'],
  },
  {
    module: 'nuc_activity',
    items: ['Activity'],
  },
  {
    module: 'nuc_entities',
    items: ['Article', 'Contact', 'Feature', 'Money', 'Technology', 'User'],
  },
  {
    module: 'nuc_entities_structural',
    items: ['Card', 'Link', 'Question'],
  },
  {
    module: 'nuc_documentation',
    items: ['Documentation'],
  },
  {
    module: 'nuc_files',
    items: ['File'],
  },
  {
    module: 'nuc_tasks',
    items: ['Task'],
  },
] as const

export const colorList: string[] = colorGroups.flatMap((group) => group.items)

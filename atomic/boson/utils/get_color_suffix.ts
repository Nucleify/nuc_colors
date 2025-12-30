import type { Ref } from 'vue'

export function getColorSuffix(
  officeType: Ref<string | undefined> | string | undefined
): 'system' | 'user' {
  const officeTypeValue =
    typeof officeType === 'object' && 'value' in officeType
      ? officeType.value
      : officeType

  if (!officeTypeValue || officeTypeValue === 'default') {
    return 'system'
  }
  if (officeTypeValue === 'front-office') {
    return 'system'
  }
  return 'user'
}

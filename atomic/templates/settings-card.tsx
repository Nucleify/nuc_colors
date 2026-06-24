'use client'

import type { JSX } from 'react'

import {
  AdLabel,
  colorGroups,
  NucColorPicker,
  NucSettingsCard,
  resetColorsToDefault,
} from 'nucleify'

interface NucColorSettingsCardProps {
  heading?: string
}

export function NucColorSettingsCard({
  heading = 'Settings',
}: NucColorSettingsCardProps): JSX.Element {
  return (
    <NucSettingsCard
      heading={heading}
      showButton
      buttonIcon="prime:refresh"
      onButtonClick={resetColorsToDefault}
    >
      {colorGroups.map((group) => (
        <div key={group.name} className="settings-card-group">
          <h4 className="settings-card-group-title">{group.name}</h4>
          <ul className="settings-card-item-list">
            {group.items?.map((item) => (
              <li key={item} className="settings-card-item">
                <AdLabel label={item} forInput={item} />
                <NucColorPicker adType={item.toLowerCase() as AdTypeType} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </NucSettingsCard>
  )
}

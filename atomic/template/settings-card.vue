<template>
  <nuc-settings-card
    :heading="props.heading || 'Settings'"
    :show-button="true"
    :onButtonClick="resetColorsToDefault"
    class="settings-card"
  >
    <div
      v-for="group in colorGroups"
      :key="group.name"
      class="settings-card-group"
    >
      <h4 class="settings-card-group-title">{{ group.name }}</h4>
      <ul class="settings-card-item-list">
        <li
          v-for="item in group.items"
          :key="item"
          class="settings-card-item"
        >
          <ad-label :label="item" :for="item" />
          <nuc-color-picker :ad-type="item.toLowerCase()" />
        </li>
      </ul>
    </div>
  </nuc-settings-card>
</template>

<script setup lang="ts">
import { colorGroups, resetColorsToDefault } from 'atomic'

const props = defineProps<{
  heading: string
}>()
</script>

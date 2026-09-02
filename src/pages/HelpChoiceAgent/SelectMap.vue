<template>
  <v-container class="pa-4">
    <v-row justify="start">
      <v-col 
        v-for="map in allMaps"
        :key="map.uuid"
        cols="auto"
      >
        <v-card
          @click="toggleMap(map.displayName )"
          :style="isMapSelected(map.displayName) ? borderStyle : ''"
          color="primary"
          class="agent-card"
        >
          <v-card-text class="text-center pa-2">
            <div style="width: 100px; height: 60px; margin: 0 auto;">
              <img 
                v-if="map.splash"
                :src="map.splash"
                :alt="map.displayName"
                style="max-width: 100%; max-height: 100%; display: block;"
              />
            </div>
            <div style="color: white; font-size: 12px; margin-top: 4px;">
              {{ map.displayName }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'selectMaps', mapId: string): void
  (e: 'updateSelectedMaps', selectedMapIds: string[]): void
}>()

defineProps<{
  allMaps: any[]
}>()

const selectedMaps = ref<Set<string>>(new Set())

const borderStyle = 'box-shadow: inset 0 0 0 3px red;'

function toggleMap(mapId: string) {
  if (selectedMaps.value.has(mapId)) {
    selectedMaps.value.delete(mapId)
  } else {
    selectedMaps.value.add(mapId)
  }
  
  emit('updateSelectedMaps', Array.from(selectedMaps.value))
}

function isMapSelected(mapId: string): boolean {
  return selectedMaps.value.has(mapId)
}
</script>
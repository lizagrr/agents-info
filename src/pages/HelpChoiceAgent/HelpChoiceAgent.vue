<template>
  <v-container class="pa-4">
    <v-row justify="start">
      <v-col cols="6">
        <v-row>
          <v-col 
            v-for="agent in allAgents"
            :key="agent.uuid"
            cols="auto"
          >
            <v-card
              @click="toggleAgent(agent.displayName)"
              :style="isAgentSelected(agent.displayName) ? borderStyle : ''"
              color="primary"
              class="agent-card"
            >
              <v-card-text class="text-center pa-2">
                <div style="width: 100px; height: 100px; margin: 0 auto;">
                  <img 
                    v-if="agent.displayIcon"
                    :src="agent.displayIcon"
                    :alt="agent.displayName"
                    style="max-width: 100%; max-height: 100%; display: block;"
                  />
                </div>
                <div style="color: white; font-size: 12px; margin-top: 4px;">
                  {{ agent.displayName }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="3">
        <select-map
          v-if="allMaps.length" 
          :all-maps="allMaps"
          @update-selected-maps="handleMapSelection"
        />
      </v-col>

      <v-col cols="3">
        <answer-choice-agent
          :selected-agents="selectedAgentsArray"
          :selected-maps="selectedMapsArray"
          @update-response="handleResponse"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SelectMap from './SelectMap.vue';
import AnswerChoiceAgent from './AnswerChoiceAgent.vue';

const emit = defineEmits<{
  (e: 'selectAgent', agentId: string): void
  (e: 'updateSelectedAgents', selectedIds: string[]): void
  (e: 'selectMaps', mapId: string): void
  (e: 'updateSelectedMaps', selectedMapIds: string[]): void
}>()

defineProps<{
  allAgents: any[]
  allMaps: any[]
}>()

const selectedAgents = ref<Set<string>>(new Set())
const selectedMaps = ref<Set<string>>(new Set())

const borderStyle = 'box-shadow: inset 0 0 0 3px red;'

const selectedAgentsArray = computed(() => Array.from(selectedAgents.value))
const selectedMapsArray = computed(() => Array.from(selectedMaps.value))

function toggleAgent(agentId: string) {
  if (selectedAgents.value.has(agentId)) {
    selectedAgents.value.delete(agentId)
  } else {
    selectedAgents.value.add(agentId)
  }
  
  emit('updateSelectedAgents', Array.from(selectedAgents.value))
}

function isAgentSelected(agentId: string): boolean {
  return selectedAgents.value.has(agentId)
}

function handleMapSelection(selectedMapIds: string[]) {
  selectedMaps.value = new Set(selectedMapIds)
  emit('updateSelectedMaps', selectedMapIds)
}

function handleResponse(response: string) {
  emit('updateSelectedMaps', selectedMapsArray.value) 
}
</script>
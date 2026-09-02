<template>
  <help-choice-agent
    v-if="allAgents.length" 
    :all-agents="allAgents"
    :all-maps="allMaps"
    @update-selected-agents="handleSelectedAgents"
    @update-selected-maps="handleSelectedMaps"
  />


</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAgentsStore } from '@/stores/agent.ts'
import HelpChoiceAgent from './HelpChoiceAgent.vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map.ts'

const { allMaps } = storeToRefs(useMapStore())
const { allAgents } = storeToRefs(useAgentsStore())

function handleSelectedAgents(selectedIds: string[]) {
  console.log('Selected agents:', selectedIds)
}

function handleSelectedMaps(selectedMapIds: string[]) {
  console.log('Selected maps:', selectedMapIds)
}

onMounted(() => {
  useAgentsStore().fetchData()
  useMapStore().fetchData() 
})
</script>
<template>
  <help-choice-agent
  v-if="allAgents.length" 
    :all-agents="allAgents"
     @update-selected-agents="handleSelectedAgents"
    />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useAgentsStore } from '@/stores/agent.ts'
import HelpChoiceAgent from './HelpChoiceAgent.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { allAgents } = storeToRefs(useAgentsStore())

function handleSelectedAgents(selectedIds: string[]) {
}



onMounted(() => {
    useAgentsStore().fetchData()
})
</script>
<template>
  <sorting-agent
    :agents="agents"
    @selectAgent="goToAgentDetail"
    />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SortingAgent from './SortingAgent.vue'
import router from '@/router/index.ts'
import { useAgentsStore } from '@/stores/agent.ts'


const { roleName } = useAgentsStore()
const { agents } = useAgentsStore()


function goToAgentDetail(agentId: string) {
  router.push({ name: 'agentDetail', params: { id: agentId } })
}

onMounted(() => {
})
</script>
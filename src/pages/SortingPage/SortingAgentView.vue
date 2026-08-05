<template>
  <sorting-agent
    :agents="agents"
    @selectAgent="goToAgentDetail"
    />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import SortingAgent from './SortingAgent.vue'
import router from '@/router/index.ts'
import { useAgentsStore } from '@/stores/agent.ts'


const { roleName } = useAgentsStore()
const { agents } = useAgentsStore()


function goToAgentDetail(agentId: string) {
  console.log('Переход к агентам с ролью:', roleName)
  router.push({ name: 'agentDetail', params: { id: agentId } })
}

onMounted(() => {
})
</script>
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

const route = useRoute()
const allAgents = ref<any[]>([])
const roleName = computed(() => route.params.role as string)

const agents = computed(() => {
  return allAgents.value.filter(
    agent => agent.role?.displayName === roleName.value
  )
})

function fetchData() {
  axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=ru-RU')
    .then(response => {
      allAgents.value = response.data.data
    })
    .catch(error => {
      console.error('Ошибка:', error)
    })
}

function goToAgentDetail(agentId: string) {
  console.log('Переход к агентам с ролью:', roleName)
  router.push({ name: 'agentDetail', params: { id: agentId } })
}

onMounted(() => {
  fetchData()
})
</script>
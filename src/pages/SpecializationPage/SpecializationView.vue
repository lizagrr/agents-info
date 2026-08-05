<template>
   <Specialization
    :roles="roleNames" 
    @selectRole="goToAgents"
    />
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import Specialization from './Specialization.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const allAgents = ref<any[]>([])

const roleNames = computed  (() => {
  const rolesMap = new Map<string, { name: string; icon: string }>()
  
  allAgents.value.forEach((agent: any) => {
    const roleName = agent.role?.displayName
    if (roleName && !rolesMap.has(roleName)) {
      rolesMap.set(roleName, {
        name: roleName,
        icon: agent.role?.displayIcon || ''
      })
    }
  })
  
  return Array.from(rolesMap.values())
})



function fetchData() {
  axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=ru-RU')
    .then(response => {
      allAgents.value = response.data.data 
      console.log('Агенты загружены:', allAgents.value)
    })
    .catch(error => {
      console.error('Ошибка:', error)
    })
}

function goToAgents(roleName: string) {
  console.log('Переход к агентам с ролью:', roleName)
  router.push({ name: 'agents', params: { role: roleName } })
}

onMounted(() => {
  fetchData()
})
</script>
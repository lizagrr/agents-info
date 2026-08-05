<template>
  <v-container class="pa-6">

    <AgentCard
    v-if="agent" 
    :agent="agent" 
    />      
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AgentCard from './AgentCard.vue'


const route = useRoute()
const allAgents = ref<any[]>([])
const agentId = computed(() => route.params.id as string)

const agent = computed(() => {
  return allAgents.value.find(a => a.uuid === agentId.value)
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

onMounted(() => {
  fetchData()
})
</script>
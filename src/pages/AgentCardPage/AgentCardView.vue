<template>
  <v-container class="pa-6">

    <AgentCard
    v-if="agent" 
    :agent="agent" 
    />      
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AgentCard from './AgentCard.vue'
import { useAgentsStore } from '@/stores/agent.ts'


const route  = useRoute()

const agent =computed(()=>{
  return useAgentsStore().getAgentByUid(route.params.id as string)
})

onMounted(() => {
  console.log('asd');
  useAgentsStore().fetchData()
  
})
</script>
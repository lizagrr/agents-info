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
import { useAgentsStore } from '@/stores/agent.ts'
import { storeToRefs } from 'pinia'

const router = useRouter()

const {roleNames} = storeToRefs(useAgentsStore())



function goToAgents(roleName: string) {
  console.log('Переход к агентам с ролью:', roleName)
  router.push({ name: 'agents', params: { role: roleName } })
}

onMounted(() => {
  useAgentsStore().fetchData()
})
</script>
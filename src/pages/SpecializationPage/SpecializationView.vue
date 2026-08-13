<template>
   <Specialization
    :roles="roleNames" 
    @selectRole="goToAgents"
    />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Specialization from './Specialization.vue'
import { useRouter } from 'vue-router'
import { useAgentsStore } from '@/stores/agent.ts'
import { storeToRefs } from 'pinia'

const router = useRouter()

const {roleNames} = storeToRefs(useAgentsStore())

function goToAgents(roleName: string) {
  if (roleName === "all") {
    router.push({ name: 'all' })
  } else {
    router.push({ name: 'agents', params: { role: roleName } })
  }
}

onMounted(() => {
  useAgentsStore().fetchData()
})
</script>
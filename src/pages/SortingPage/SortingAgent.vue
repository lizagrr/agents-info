<template>
   <v-container class="pa-4">
      <v-row justify="center">
         <v-col cols="6">
            <div class="d-flex justify-center ga-4 flex-wrap">
               <v-btn 
                  v-for="agent in agents"
                  :key="agent.uuid"
                  @click="selectAgent(agent.uuid)"
               >
                   <template #prepend>
              <div style=" width: 36px; height: 36px">
                <img 
                  v-if="agent.displayIcon"
                  :src="agent.displayIcon"
                  :alt="agent.displayName"
                  style=" max-width: 100%; max-height: 100%; display: block"
                />
              </div>
            </template>
                  {{ agent.displayName }}
               </v-btn>
            </div>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'selectAgent', agentId: string): void
}>()
 
defineProps<{
  agents: any[]
}>()

function selectAgent(agentId: string) {
  emit('selectAgent', agentId) 
}

</script>
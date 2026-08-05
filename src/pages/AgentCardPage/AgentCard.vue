<template>
    <v-container class="pa-6">
        <v-row>
            <v-col cols="6">
            <v-card 
                border 
                elevation="0"
            >
                  <v-row>
                      <v-col class="pa-8" >
                          <v-card-title >
                              {{ agent.displayName }}
                            </v-card-title>
                            <v-card-subtitle>
                                <span v-if="agent.role">
                                    {{ agent.role.displayName }}
                                </span>
                            </v-card-subtitle>
                        </v-col>
                        <v-col   class="pa-8">
                            {{ agent.description || 'Описание отсутствует' }}
                        </v-col>
                    </v-row>

                <v-divider ></v-divider>

                
                <div>

                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
                        <v-chip
                            v-for="(ability, index) in agent.abilities"
                            :key="index"
                            :color="selectedAbilityIndex === index ? 'white' : undefined"
                            variant="outlined"
                            style="cursor: pointer;"
                            @click="selectAbility(index)"
                        >
                            {{ ability.displayName }}
                        </v-chip>
                    </div>
                    
                    <div v-if="selectedAbility">
                        <v-card
                        elevation="0"
                        >
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <v-img
                                    :src="selectedAbility.displayIcon"
                                    contain
                                    width="40"
                                    height="40"
                                    style="flex-shrink: 0;"
                                />
                                <div>
                                    <div>
                                        {{ selectedAbility.displayName }}
                                    </div>
                                    <v-card-subtitle>
                                <span>
                                    {{ selectedAbility.slot === 'Passive' ? 'Пассивная' : 
                                           selectedAbility.slot === 'Signature' ? 'Базовая' : 
                                           selectedAbility.slot === 'Ultimate' ? 'Ультимейт' : 'Способность' }}
                                </span>
                            </v-card-subtitle>
                                  
                                </div>
                            </div>
                            <v-divider></v-divider>
                                {{ selectedAbility.description || 'Описание отсутствует' }}
                        </v-card>
                    </div>
                </div>
            </v-card>
        </v-col>
        
        <v-col cols="6">
            <v-img
                :src="agent.fullPortrait"
                :alt="agent.displayName"
                contain
                max-height="600"
                class="pa-4"
            />
        </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import type { Agent } from '@/stores/agent';
import { ref, computed } from 'vue'

const props = defineProps<{
  agent: Agent
}>()

const selectedAbilityIndex = ref(0)


const selectedAbility = computed(() => {
    if (props.agent.abilities && props.agent.abilities.length > 0) {
        return props.agent.abilities[selectedAbilityIndex.value]
    }
    return null
})

const selectAbility = (index: number) => {
    selectedAbilityIndex.value = index
}
</script>

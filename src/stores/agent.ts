import axios from "axios";
import { defineStore } from "pinia";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

export interface Role {
  uuid: string;
  displayName: string;
  description?: string;
  icon?: string;
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon?: string;
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  role?: Role;
  abilities: Ability[];
  fullPortrait?: string;
  background?: string;
  bustPortrait?: string;
  killfeedPortrait?: string;
}

export const useAgentsStore = defineStore("agents", () => {
  const allAgents = ref<Agent[]>([]);

  function fetchData() {
  axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=ru-RU')
    .then(response => {
      allAgents.value = response.data.data
    })
    .catch(error => {
      console.error('Ошибка:', error)
    })
}

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

const route = useRoute()
const roleName = computed(() => route.params.role as string)


const agents = computed(() => {
  return allAgents.value.filter(
    agent => agent.role?.displayName === roleName.value
  )
})

const agentId = ref('')

const getAgentByUid = (id: string) => {
  return allAgents.value.find(a => a.uuid === id)
}

function setAgentId(id: string): void {
  agentId.value = id 
}

  return {
    setAgentId,
    agentId,
    allAgents,
    roleName,
    fetchData,
    roleNames,
    agents,
    getAgentByUid
  };
});

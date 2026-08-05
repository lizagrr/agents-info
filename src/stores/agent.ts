import { defineStore } from "pinia"
import { ref } from "vue"

export interface Role {
  uuid: string
  displayName: string
  description?: string
  icon?: string
}

export interface Ability {
  slot: string
  displayName: string
  description: string
  displayIcon?: string
}

export interface Agent {
  uuid: string
  displayName: string
  description: string
  role?: Role
  abilities: Ability[]
  fullPortrait?: string
  background?: string
  bustPortrait?: string
  killfeedPortrait?: string
}

export const useAgentsStore = defineStore('agents', ()=>{

const allAgents = ref<Agent[]>()


return {
  allAgents
}
})
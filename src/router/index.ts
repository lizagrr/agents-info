import { createRouter, createWebHistory } from 'vue-router'
import SpecializationView from '@/pages/SpecializationPage/SpecializationView.vue'
import SortingAgentView from '@/pages/SortingPage/SortingAgentView.vue'
import AgentCardView from '@/pages/AgentCardPage/AgentCardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SpecializationView,
    },
    {
      path: '/agents/:role',
       name: 'agents',
      component: SortingAgentView,
      props: true
    },
    {
      path: '/agents/detail/:id',
       name: 'agentDetail',
      component: AgentCardView,
      props: true
    },
    {
      path: '/qwe',
       name: 'qwe',
      component: ()=>import('@/pages/qwe.vue'),
      props: true
    },


    
  ],
})

export default router

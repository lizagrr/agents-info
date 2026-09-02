import { createRouter, createWebHistory } from 'vue-router'
import SpecializationView from '@/pages/SpecializationPage/SpecializationView.vue'
import SortingAgentView from '@/pages/SortingPage/SortingAgentView.vue'
import AgentCardView from '@/pages/AgentCardPage/AgentCardView.vue'
import qwe from '@/pages/qwe.vue'
import zxc from '@/pages/zxc.vue'

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
      path: '/help',
       name: 'all',
      component: ()=>import('@/pages/HelpChoiceAgent/HelpChoiceAgentView.vue'),
      props: true
    },
    {
      path: '/qwe',
      name: 'qwe',
      component: qwe,
    },
    {
      path: '/zxc',
      name: 'zxc',
      component: zxc,
    },
  ],
})

export default router

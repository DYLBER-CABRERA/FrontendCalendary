import { createRouter, createWebHistory } from 'vue-router'
import ManageSubject from '@/components/subjects/ManageSubject.vue'
import ManageProfessor from '@/components/professors/ManageProfessor.vue'
import ListSubject from '@/components/subjects/ListSubject.vue'
import ListProfessor from '@/components/professors/ListProfessor.vue'
import ListCampus from '@/components/campuses/ListCampus.vue'
import ManageCampus from '@/components/campuses/ManageCampus.vue'
import ListClasses from '@/components/classes/ListClasses.vue'
import ManageClass from '@/components/classes/ManageClass.vue'
import navbar from '@/components/layout/navbar.vue'




const routes = [
  { path: '/', redirect: '/dashboard' }, // Redirige a la página de inicio del dashboard
    {
    path: '/dashboard',
    component: navbar,
    children: [
      { path: '', component: () => import('@/components/layout/navBar.vue') }, // Página de inicio del dashboard
      { path: 'materias', component: ListSubject },
      { path: 'clases', component: ListClasses },
      { path: 'profesores', component: ListProfessor },
      { path: 'campus', component: ListCampus },
      // ...más rutas hijas
    ]
  },
  {
    path: '/subjects/list',
    name: 'ListSubject',
    component: ListSubject
  },
  {
    path: '/subjects/create',
    name: 'CreateSubject',
    component: ManageSubject,
    props: { mode: 2 }
  },
  {
    path: '/subjects/update/:id',
    name: 'UpdateSubject',
    component: ManageSubject,
    props: (route: { params: { id: string } }) => ({ mode: 3, id: route.params.id })
  },
  {
    path: '/subjects/view/:id',
    name: 'ViewSubject',
    component: ManageSubject,
    props: (route: { params: { id: string } }) => ({ mode: 1, id: route.params.id })
  },
  {
    path: '/professors/list',
    name: 'ListProfessors',
    component: ListProfessor 
  },
  {
    path: '/professors/create',
    name: 'CreateProfessor',
    component: ManageProfessor,
    props: { mode: 2 }
  },
  {
    path: '/professors/update/:id',
    name: 'UpdateProfessor',
    component: ManageProfessor,
    props: (route: { params: { id: number } }) => ({ mode: 3, id: route.params.id })
  },
  {
    path: '/professors/view/:id',
    name: 'ViewProfessor',
    component: ManageProfessor,
    props: (route: { params: { id: number } }) => ({ mode: 1, id: route.params.id })
  },
   {
    path: '/campuses/list',
    name: 'ListCampuses',
    component: ListCampus
  },
  {
    path: '/campuses/create',
    name: 'CreateCampus',
    component: ManageCampus,
    props: { mode: 2 }
  },
  {
    path: '/campuses/update/:id',
    name: 'UpdateCampus',
    component: ManageCampus,
    props: (route: { params: { id: string } }) => ({ mode: 3, id: route.params.id })
  },
  {
    path: '/campuses/view/:id',
    name: 'ViewCampus',
    component: ManageCampus,
    props: (route: { params: { id: string } }) => ({ mode: 1, id: route.params.id })
  },
  {
    path: '/classes/list',
    name: 'ListClasses',
    component: ListClasses
  },
  {
    path: '/classes/create',
    name: 'CreateClass',
    component: ManageClass,
    props: { mode: 2 }
  },
  {
    path: '/classes/update/:id',
    name: 'UpdateClass',
    component: ManageClass,
    props: (route: { params: { id: string } }) => ({ mode: 3, id: route.params.id })
  },
  {
    path: '/classes/view/:id',
    name: 'ViewClass',
    component: ManageClass,
    props: (route: { params: { id: string } }) => ({ mode: 1, id: route.params.id })
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



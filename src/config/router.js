import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const NotFound = () => import('../views/NotFound.vue')


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/gallery', name: 'gallery', component: () => import('../views/gallery/Gallery.vue') },
  { path: '/login', name: 'login', component: () => import('../views/auth/Login.vue') },
  { path: '/signup', name: 'signup', component: () => import('../views/auth/Signup.vue') },
  { path: '/admin/dashboard', name: 'dashboard', component: () => import('../views/admin/Dashboard.vue') },
  { path: '/admin/create', name: 'create', component: () => import('../views/admin/Create.vue') },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
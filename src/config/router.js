import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Gallery = () => import('../views/gallery/Gallery.vue')
const Login = () => import('../views/auth/Login.vue')
const Signup = () => import('../views/auth/Signup.vue')
const NotFound = () => import('../views/NotFound.vue')


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/gallery', name: 'gallery', component: Gallery },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
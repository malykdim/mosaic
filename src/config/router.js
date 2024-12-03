import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Gallery = () => import('../views/gallery/Gallery.vue')
const NotFound = () => import('../views/NotFound.vue')


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/gallery', name: 'gallery', component: Gallery },
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
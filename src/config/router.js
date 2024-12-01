import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Gallery = () => import('../views/gallery/Gallery.vue')


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/gallery', name: 'gallery', component: Gallery },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
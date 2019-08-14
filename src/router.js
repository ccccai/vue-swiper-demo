import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/swiper/parallel'
    },
    {
      path: '/swiper/rotate',
      name: 'swiper',
      component: () => import('./views/rotate')
    },
    {
      path: '/swiper/parallel',
      name: 'swiper',
      component: () => import('./views/parallel')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../view/home.vue'),
      redirect: '/showModel',
      children: [
        {
          path: 'showModel',
          name: 'showModel',
          component: () => import('../view/showModel.vue'),
        },
        {
          path: 'hsz',
          name: 'hsz',
          component: () => import('../view/recycleBin.vue'),
        }
      ]
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../view/editModel.vue'),
      meta:{
        title:'编辑'
      }
    }
  ]
})

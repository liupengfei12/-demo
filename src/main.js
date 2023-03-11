// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRulerTool from 'vue-ruler-tool'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import draggable from 'vuedraggable'
import './utils/pxToRem'
import componentList from './utils/componenetList'
componentList.map(z => {
  Vue.component(z.modelName, z.component)
})
Vue.use(ElementUI);
Vue.component('vue-ruler-tool', VueRulerTool)
Vue.component('draggable', draggable)
Vue.config.productionTip = false
import store from './store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

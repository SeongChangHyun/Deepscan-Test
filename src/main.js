import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'proto-polyfill'
import 'ie-class-inheritance-polyfill'
import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import { TreeSelect } from 'ant-design-vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import App from './App'
import store from './store'
import router from './router'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import * as filters from './filter'//global filters

if (process.env.NODE_ENV === 'development') {
  // require('./mock') // simulation data
}
Vue.use(TreeSelect)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VuejsDialog)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

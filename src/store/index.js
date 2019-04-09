import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/app/layout/store'
import errorLog from '@/app//error-log/store'
import permission from '@/app/permission/store'
import tagsView from '@/app//tags-view/store'
import auth from '@/app/auth/store'
import campaign from '@/app/campaign/store'
import creative from '@/app/creatives/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    layout,
    errorLog,
    permission,
    tagsView,
    campaign,
    creative
  }
})

export default store

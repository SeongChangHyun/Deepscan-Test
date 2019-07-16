import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/app/layout/store'
import errorLog from '@/app//error-log/store'
import permission from '@/app/permission/store'
import tagsView from '@/app//tags-view/store'
import auth from '@/app/auth/store'
import campaign from '@/app/campaign/store'
import creative from '@/app/creatives/store'
import tool from '@/app/tool/store'
import accountsSummary from '@/app/accounts-summary/store'

import user from '@/app/account-and-billing/store'
import targeting from '@/app/targeting-reports/store'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    layout,
    errorLog,
    permission,
    tagsView,
    campaign,
    creative,
    tool,
    user,
    accountsSummary,
    targeting
  }
})

export default store

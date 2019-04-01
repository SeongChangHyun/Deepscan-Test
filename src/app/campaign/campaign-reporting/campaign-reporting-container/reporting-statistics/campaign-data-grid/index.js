export const CampaignDataGrid = require('./CampaignDataGrid.vue').default

let Vue

function install(_Vue) {
  if (Vue) {
    console.warn('[CampaignDataGrid] already installed. Vue.use(CampaignDataGrid) should be called only once.')
    return
  }

  Vue = _Vue

  Vue.component(CampaignDataGrid.name, CampaignDataGrid)
}

/* istanbul ignore next */
CampaignDataGrid.install = install

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

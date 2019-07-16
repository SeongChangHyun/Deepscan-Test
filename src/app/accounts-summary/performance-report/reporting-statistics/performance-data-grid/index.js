export const PerformanceDataGrid = require('./PerformanceDataGrid.vue').default

let Vue

function install(_Vue) {
  if (Vue) {
    console.warn('[PerformanceDataGrid] already installed. Vue.use(PerformanceDataGrid) should be called only once.')
    return
  }

  Vue = _Vue

  Vue.component(PerformanceDataGrid.name, PerformanceDataGrid)
}

/* istanbul ignore next */
PerformanceDataGrid.install = install

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

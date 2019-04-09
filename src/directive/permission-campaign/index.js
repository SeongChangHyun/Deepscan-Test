import permission from './permission'

const install = function(Vue) {
  Vue.directive('permission-campaign', permission)
}
if (window.Vue) {
  window['permission-campaign'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission

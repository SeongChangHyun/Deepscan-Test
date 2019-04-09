import Layout from '@/app/layout/Layout'

const router = {
  path: '/sample',
  component: Layout,
  redirect: '/sample/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'Sample',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'Sample Management',
      component: () =>
        import('@/app/sample/component'),
      name: 'Sample Management',
      meta: {
        title: 'Sample Management'
      }
    }
  ]
}

export default router

import Layout from '@/app/layout'

const creativeRouter = {
  path: '/creatives',
  component: Layout,
  redirect: '/creatives/list-creative',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'creatives',
    icon: 'creatives',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'list-creative',
      component: () => import('@/app/creatives/creatives-management/list-creative/index'),
      meta: {
        title: 'listCreative'
      }
    },
    {
      path: 'create-creative',
      component: () => import('@/app/creatives/creatives-management/create-creative/index'),
      meta: {
        title: 'Create Creative'
      },
      hidden: true
    },
    {
      path: ':creative_id/update-creative',
      component: () => import('@/app/creatives/creatives-management/update-creative/index'),
      meta: {
        title: 'Create Creative'
      },
      hidden: true
    },
    {
      path: 'list-ci',
      component: () => import('@/app/creatives/creatives-image/list-ci/index'),
      meta: {
        title: 'listCi'
      }
    },
    {
      path: 'create-ci',
      component: () => import('@/app/creatives/creatives-image/create-ci/index'),
      meta: {
        title: 'Create CI'
      },
      hidden: true
    }
  ]
}

export default creativeRouter

import Layout from '@/app/layout'
import { getRoleRouter } from '@/common/generatePermission'
const creativeRouter = {
  path: '/creatives',
  component: Layout,
  redirect: '/creatives/list-creative',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'creatives',
    icon: 'creatives',
    roles: getRoleRouter('creatives') // you can set roles in root nav
  },
  children: [
    {
      path: 'list-creative',
      component: () => import('@/app/creatives/creatives-management/list-creative/index'),
      meta: {
        title: 'listCreative',
        roles: getRoleRouter('creatives.listCreative')
      }
    },
    {
      path: 'create-creative',
      component: () => import('@/app/creatives/creatives-management/create-creative/index'),
      meta: {
        title: 'Create Creative',
        roles: getRoleRouter('creatives.createCreative')
      },
      hidden: true
    },
    {
      path: ':creative_id/update-creative',
      name: 'update-creative',
      component: () => import('@/app/creatives/creatives-management/update-creative/index'),
      meta: {
        title: 'Update Creative',
        roles: getRoleRouter('creatives.updateCreative')
      },
      hidden: true
    },
    {
      path: 'list-ci',
      component: () => import('@/app/creatives/creatives-image/list-ci/index'),
      meta: {
        title: 'listCi',
        roles: getRoleRouter('creatives.listCi')
      }
    },
    {
      path: 'create-ci',
      component: () => import('@/app/creatives/creatives-image/create-ci/index'),
      meta: {
        title: 'Create CI',
        roles: getRoleRouter('creatives.createCI')
      },
      hidden: true
    }
  ]
}

export default creativeRouter

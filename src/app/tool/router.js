import Layout from '@/app/layout'
import { getRoleRouter } from '@/common/generatePermission'

const toolRouter = {
  path: '/tool',
  component: Layout,
  redirect: '/tool/tracking-tag',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'tool',
    icon: 'tool',
    roles: getRoleRouter('tools') // you can set roles in root nav
  },
  children: [
    {
      path: 'tracking-tag',
      component: () =>
        import('@/app/tool/components/tracking-tag/index'),
      name: 'Tracking Tag',
      meta: {
        title: 'trackingTag',
        roles: getRoleRouter('tools.trackingTag')
      }
    },
    {
      path: 'product-feed',
      component: () =>
        import('@/app/tool/components/product-feed/index'),
      name: 'Product Feed',
      meta: {
        title: 'productFeed',
        roles: getRoleRouter('tools.producFeed')
      }
    }
  ]
}

export default toolRouter

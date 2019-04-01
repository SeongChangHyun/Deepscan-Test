import Layout from '@/app/layout'

const memberAccountRouter = {
  path: '/account-and-billing',
  component: Layout,
  alwaysShow: true,
  name: 'Accounts & Billing',
  meta: {
    title: 'accountsBilling',
    icon: 'credit-card-active',
    roles: ['admin']
  },
  redirect: '/account-and-billing/my-information',
  children: [
    {
      path: 'my-information',
      component: () => import('@/app/account-and-billing/member-account'),
      name: 'My Information',
      meta: {
        title: 'myInformation'
      }
    }
  ]
}

export default memberAccountRouter

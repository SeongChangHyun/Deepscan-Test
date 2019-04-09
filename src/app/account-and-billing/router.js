import Layout from '@/app/layout'
import BlankLayout from '@/app/layout/BlankLayout'

const memberAccountRouter = {
  path: '/account-and-billing',
  component: Layout,
  alwaysShow: true,
  name: 'Accounts & Billing',
  meta: {
    title: 'accountsBilling',
    icon: 'credit-card',
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
    },
    {
      path: 'clients-management',
      component: BlankLayout,
      meta: {
        title: 'clientsManagement'
      },
      redirect: '',
      children: [
        {
          path: '',
          component: () => import('@/app/account-and-billing/clients-management'),
          name: 'List',
          hidden: true,
          meta: {
            title: 'listClientsManagement'
          }
        },
        {
          path: 'create',
          component: () => import('@/app/account-and-billing/clients-management/create'),
          name: 'Create',
          hidden: true,
          meta: {
            title: 'createClientsManagement'
          }
        },
        {
          path: 'update/:id',
          component: () => import('@/app/account-and-billing/clients-management/update'),
          name: 'Update',
          hidden: true,
          meta: {
            title: 'updateClientsManagement'
          }
        }
      ]
    }
  ]
}

export default memberAccountRouter

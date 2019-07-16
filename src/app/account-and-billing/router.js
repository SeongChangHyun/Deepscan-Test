import Layout from '@/app/layout'
import BlankLayout from '@/app/layout/BlankLayout'
import { getRoleRouter } from '@/common/generatePermission'
const memberAccountRouter = {
  path: '/account-and-billing',
  component: Layout,
  alwaysShow: true,
  name: 'Accounts & Billing',
  meta: {
    title: 'accountsBilling',
    icon: 'credit-card',
    roles: getRoleRouter('accountAndBilling')
  },
  redirect: '/account-and-billing/my-information',
  children: [
    {
      path: 'my-information',
      component: () => import('@/app/account-and-billing/member-account'),
      name: 'My Information',
      meta: {
        title: 'myInformation',
        roles: getRoleRouter('accountAndBilling.myInformation')
      }
    },
    {
      path: 'clients-management',
      component: BlankLayout,
      meta: {
        title: 'clientsManagement',
        roles: getRoleRouter('accountAndBilling.clientsManagement')
      },
      redirect: '',
      children: [
        {
          path: '',
          component: () => import('@/app/account-and-billing/clients-management'),
          name: 'Clients Management',
          hidden: true,
          meta: {
            roles: getRoleRouter('accountAndBilling.listClientsManagement'),
            breadcrumb: false
          }
        },
        {
          path: 'create',
          component: () => import('@/app/account-and-billing/clients-management/create'),
          name: 'Create',
          hidden: true,
          meta: {
            title: 'createClientsManagement',
            roles: getRoleRouter('accountAndBilling.createClientsManagement')
          }
        },
        {
          path: 'update/:client_id',
          component: () => import('@/app/account-and-billing/clients-management/update'),
          name: 'UpdateClient',
          hidden: true,
          meta: {
            title: 'updateClientsManagement',
            roles: getRoleRouter('accountAndBilling.updateClientsManagement')
          },
          props: true
        }
      ]
    },
    {
      path: 'payment',
      component: () => import('@/app/account-and-billing/payment'),
      name: 'Payment',
      meta: {
        title: 'payment',
        roles: getRoleRouter('accountAndBilling.payment')
      }
    },
    {
      path: 'index-api',
      component: () => import('@/app/account-and-billing/index-api'),
      name: 'Index Api',
      meta: {
        title: 'Index Api',
        roles: getRoleRouter('accountAndBilling.indexApi')
      }
    },
    {
      path: 'index-api',
      component: () => import('@/app/account-and-billing/index-api'),
      name: 'Index Apis',
      meta: {
        title: 'Index Api',
        roles: getRoleRouter('accountAndBilling.indexApis')
      }
    },
    {
      path: 'settlement-api',
      component: () => import('@/app/account-and-billing/settlement-api'),
      name: 'Settlement API',
      meta: {
        title: 'settlementApi',
        roles: getRoleRouter('accountAndBilling.settlementAPI')
      }
    },
    {
      path: 'billing-history',
      component: () => import('@/app/account-and-billing/billing-history'),
      name: 'Billing History',
      meta: {
        title: 'billingHistory',
        roles: getRoleRouter('accountAndBilling.billingHistory')
      }
    },
    {
      path: 'users-management',
      component: () => import('@/app/account-and-billing/users-management'),
      name: 'usersList',
      meta: {
        title: 'users',
        roles: getRoleRouter('accountAndBilling.usersManagement')
      },
      children: []
    },
    {
      path: 'invite-user',
      component: () => import('@/app/account-and-billing/users-management/invite-user'),
      name: 'inviteUser',
      meta: {
        title: 'Invite User'
      },
      hidden: true,
      children: []
    },
    {
      path: 'edit-user-role',
      component: () => import('@/app/account-and-billing/users-management/edit-user'),
      name: 'ediUserRole',
      meta: {
        title: 'ediUserRole'
      },
      hidden: true,
      children: []
    },
    {
      path: 'service-manage',
      component: () => import('@/app/account-and-billing/service-manage'),
      name: 'Service Manage',
      meta: {
        title: 'Service Manage',
        roles: getRoleRouter('accountAndBilling.serviceManage')
      }
    }
  ]
}

export default memberAccountRouter

import Layout from '@/app/layout'
import { getRoleRouter } from '@/common/generatePermission'
const accountsSummaryRouter = {
  path: '/accounts-summary',
  component: Layout,
  redirect: '/accounts-summary/performance-report',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'accountsSummary',
    icon: 'campaign',
    roles: getRoleRouter('accountsSummary')
  },
  children: [
    {
      path: 'performance-report',
      component: () =>
        import('@/app/accounts-summary/performance-report/index'),
      name: 'Performance Reporting',
      meta: {
        title: 'performanceReport',
        roles: getRoleRouter('accountsSummary.performanceReport')
      }
    }
  ]
}

export default accountsSummaryRouter

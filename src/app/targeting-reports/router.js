import Layout from '@/app/layout'
import { getRoleRouter } from '@/common/generatePermission'
const targetingReportsRouter = {
  path: '/targeting-reports',
  component: Layout,
  redirect: '/targeting-reports/targeting-goal-type',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'targetingReports',
    icon: 'target-report',
    roles: getRoleRouter('targetingReports') // you can set roles in root nav
  },
  children: [
    {
      path: 'targeting-goal-type',
      component: () =>
        import('@/app/targeting-reports/targeting-goal-and-type/index'),
      name: 'Goal / Targeting type',
      meta: {
        title: 'targetingGoal',
        roles: getRoleRouter('targetingReports.targetingGoal')
      }
    },
    {
      path: 'creatives',
      component: () =>
        import('@/app/targeting-reports/creatives/index'),
      name: 'Creatives',
      meta: {
        title: 'Creatives',
        roles: getRoleRouter('targetingReports.creatives')
      }
    },
    {
      path: 'time&day-of-the-week',
      component: () =>
        import('@/app/targeting-reports/time-and-day-of-the-week/index'),
      name: 'Day of the week / Time',
      meta: {
        title: 'targetingReportsTime',
        roles: getRoleRouter('targetingReports.timeOfWeek')
      }
    },
    {
      path: 'user-interest',
      component: () =>
        import('@/app/targeting-reports/user-interest/index'),
      name: 'User Interest',
      meta: {
        title: 'User Interest',
        roles: getRoleRouter('targetingReports.userInterest')
      }
    }
  ]
}

export default targetingReportsRouter

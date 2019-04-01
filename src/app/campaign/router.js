import Layout from '@/app/layout'

const campaignRouter = {
  path: '/campaign',
  component: Layout,
  redirect: '/campaign/reporting',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'campaign',
    icon: 'campaign-active',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'reporting',
      component: () =>
        import('@/app/campaign/campaign-reporting/campaign-reporting-container/index'),
      name: 'Reporting',
      meta: {
        title: 'campaignReporting'
      }
    },
    {
      path: 'create-campaign',
      component: () =>
        import('@/app/campaign/campaign-management/create-campaign-container/index'),
      name: 'createCampaign',
      meta: {
        title: 'campaignManagement'
      },
      redirect: '/campaign/create-campaign/select-campaign-objectives',
      children: [
        {
          path: 'select-campaign-objectives',
          component: () =>
            import('@/app/campaign/campaign-management/create-campaign-container/select-campaign-objectives/index'),
          // hidden: true,
          // name: 'Create Campaign',
          meta: {
            title: 'createCampaign'
          }
        },
        {
          path: 'configure-campaign',
          component: () =>
            import('@/app/campaign/campaign-management/create-campaign-container/create-campaign/index'),
          hidden: true,
          meta: {
            title: 'createCampaign'
          }
        },
        {
          path: 'match-creatives',
          component: () =>
            import('@/app/campaign/campaign-management/create-campaign-container/match-creatives/index'),
          hidden: true
        }
      ]
    }
  ]
}

export default campaignRouter

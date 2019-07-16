import Layout from '@/app/layout'
import { getRoleRouter } from '@/common/generatePermission'
const campaignRouter = {
  path: '/campaign/',
  component: Layout,
  redirect: '/accounts/:account_id/clients/:client_id',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'campaign',
    icon: 'campaign',
    roles: getRoleRouter('campaign') // you can set roles in root nav
  },
  children: [
    {
      path: '/accounts/:account_id/clients/:client_id',
      pullPath: '/accounts/:account_id/clients/:client_id',
      component: () =>
        import('@/app/campaign/campaign-reporting/campaign-reporting-container/index'),
      name: 'Reporting',
      meta: {
        title: 'campaignReporting',
        roles: getRoleRouter('campaign.campaignReporting')
      }
    },
    {
      path: 'daily-report',
      component: () =>
        import('@/app/campaign/campaign-reporting/daily-reporting-container/index'),
      name: 'dailyReporting',
      meta: {
        title: 'dailyReporting',
        roles: getRoleRouter('campaign.dailyReporting')
      }
    },
    {
      path: 'reporting/creative-link',
      component: () =>
        import('@/app/campaign/campaign-reporting/creative-link/index'),
      hidden: true,
      meta: {
        title: 'creativeLink',
        roles: getRoleRouter('campaign.creativeLink')
      }
    },
    {
      path: 'create-campaign',
      component: () =>
        import('@/app/campaign/campaign-management/create-campaign-container/index'),
      name: 'createCampaign',
      meta: {
        title: 'campaignManagement',
        roles: getRoleRouter('campaign.campaignManagement')
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
            title: 'createCampaign',
            roles: getRoleRouter('campaign.selectCampaignObjectives')
          }
        },
        {
          path: 'configure-campaign',
          component: () =>
            import('@/app/campaign/campaign-management/create-campaign-container/create-campaign/index'),
          hidden: true,
          meta: {
            title: 'createCampaign',
            roles: getRoleRouter('campaign.configureCampaign')
          }
        },
        {
          path: 'match-creatives',
          component: () =>
            import('@/app/campaign/campaign-management/create-campaign-container/match-creatives/index'),
          hidden: true,
          meta: {
            title: 'createCampaign',
            roles: getRoleRouter('campaign.matchCreatives')
          }
        }
      ]
    }
  ]
}

export default campaignRouter

/**
 * Note for config definition
 * @param all definitions for access roles
 * @param comeback definitions for access roles
 * @param parent Definition for roles NOT accessed
 * @param client Definition for roles NOT accessed
 * @param element Definition for access roles
 */
export const campaign = {
  'router': {
    'all': [],
    'comeback': [],
    'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
    'client': []
  },
  'campaignReporting': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_campaign_report'
    }
  },
  'campaignManagement': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_create_campaign'
    },
    'element': {
      'create': {
        'location': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_AG', 'ROLE_CM'],
        'language': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_AG', 'ROLE_CM'],
        'device': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_AG', 'ROLE_CM'],
        'demoGraphic': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_AG', 'ROLE_CM']
      }
    }
  },
  'dailyReporting': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_daily_report'
    }
  },
  'creativeLink': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': []
    }
  },
  'selectCampaignObjectives': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': []
    }
  },
  'configureCampaign': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': []
    }
  },
  'matchCreatives': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': []
    }
  }
}

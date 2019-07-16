/**
 * Note for config definition
 * @param all definitions for access roles
 * @param comeback definitions for access roles
 * @param parent Definition for roles NOT accessed
 * @param client Definition for roles NOT accessed
 */
export const tools = {
  'router': {
    'all': [],
    'comeback': [],
    'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
    'client': []
  },
  'producFeed': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': []
    }
  },
  'trackingTag': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': []
    }
  }
}

/**
 * Note for config definition
 * @param all definitions for access roles
 * @param comeback definitions for access roles
 * @param parent Definition for roles NOT accessed
 * @param client Definition for roles NOT accessed
 */
export const targetingReports = {
  'router': {
    'all': [],
    'comeback': [],
    'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
    'client': []
  },
  'targetingGoal': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_goal_targeting_type'
    }
  },
  'creatives': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_creatives'
    }
  },
  'timeOfWeek': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_day_of_the_week_time'
    }
  },
  'userInterest': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': [],
      'service_manager': 'menu_user_interest'
    }
  }
}

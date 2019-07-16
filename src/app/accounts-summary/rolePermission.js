/**
 * Note for config definition
 * @param all definitions for access roles
 * @param comeback definitions for access roles
 * @param parent Definition for roles NOT accessed
 * @param client Definition for roles NOT accessed
 */
export const accountsSummary = {
  'router': {
    'all': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
    'comeback': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
    'parent': [],
    'client': [],
    'service_manager': 'menu_performance_report'
  },
  'performanceReport': {
    'router': {
      'all': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'comeback': ['ROLE_SUPER_ADMIN', 'ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'parent': [],
      'client': [],
      'service_manager': 'menu_performance_report'
    }
  }
}

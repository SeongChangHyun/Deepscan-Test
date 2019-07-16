/**
 * Note for config definition
 * @param all definitions for access roles
 * @param comeback definitions for access roles
 * @param parent Definition for roles NOT accessed
 * @param client Definition for roles NOT accessed
 * @param service_manager Definition for sevice manage
 * @param special Definition for special roles
 */
export const accountAndBilling = {
  'router': {
    'all': ['ROLE_CLIENT_ADMIN'],
    'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
    'parent': [],
    'client': []
  },
  'myInformation': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'parent': [],
      'client': ['ROLE_CLA', 'ROLE_AG', 'ROLE_CV', 'ROLE_CM'],
      'service_manager': 'menu_my_information'
    }
  },
  'clientsManagement': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'parent': [],
      'client': [],
      'service_manager': 'menu_client_management'
    }
  },
  'listClientsManagement': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'parent': [],
      'client': [],
      'service_manager': 'menu_client_management'
    }
  },
  'createClientsManagement': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'parent': [],
      'client': ['ROLE_AG', 'ROLE_CONSIGNOR_AGENCY'],
      'service_manager': 'menu_client_management'
    }
  },
  'updateClientsManagement': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE'],
      'parent': [],
      'client': [],
      'service_manager': 'menu_client_management'
    }
  },
  'payment': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN', 'ROLE_CONSIGNOR_AGENCY'],
      'comeback': [],
      'parent': [],
      'client': [],
      'service_manager': 'menu_payment'
    }
  },
  'settlementAPI': {
    'router': {
      'all': [],
      'comeback': ['ROLE_COMMISSION_FEE', 'ROLE_CONSIGNOR_AGENCY'],
      'parent': ['ROLE_CM', 'ROLE_VIEWER'],
      'client': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_AG'],
      'service_manager': 'menu_settlement_api'
    }
  },
  'billingHistory': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN', 'ROLE_CONSIGNOR_AGENCY'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE', 'ROLE_CONSIGNOR_AGENCY'],
      'parent': [],
      'client': [],
      'service_manager': 'menu_billing_history'
    }
  },
  'indexApi': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN', 'ROLE_CONSIGNOR_AGENCY'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE', 'ROLE_CONSIGNOR_AGENCY'],
      'parent': ['ROLE_AG', 'ROLE_CM', 'ROLE_CV', 'ROLE_CLA'],
      'client': [],
      'service_manager': 'menu_index_api_client'
    }
  },
  'indexApis': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': [],
      'client': ['ROLE_AG', 'ROLE_CM', 'ROLE_CV', 'ROLE_CLA'],
      'service_manager': 'menu_index_api_clients'
    }
  },
  'usersManagement': {
    'router': {
      'all': ['ROLE_CLIENT_ADMIN'],
      'comeback': ['ROLE_CLIENT_ADMIN', 'ROLE_COMMISSION_FEE', 'ROLE_CONSIGNOR_AGENCY'],
      'parent': ['ROLE_COMMISSION_FEE', 'ROLE_AG', 'ROLE_CAMPAIGN_MANAGER', 'ROLE_CM', 'ROLE_VIEWER', 'ROLE_CV'],
      'client': ['ROLE_CLIENT_ADMIN', 'ROLE_CLA', 'ROLE_AG'],
      'service_manager': 'menu_users'
    }
  },
  'serviceManage': {
    'router': {
      'all': [],
      'comeback': [],
      'parent': [],
      'client': [],
      'special': ['ROLE_SUPER_ADMIN']
    }
  }
}

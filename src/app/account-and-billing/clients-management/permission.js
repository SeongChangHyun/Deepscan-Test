import store from '@/store'
const ROLE_TYPE = {
  SA: 'ROLE_SUPER_ADMIN',
  CLA: 'ROLE_CLA',
  CLAU: 'ROLE_CLIENT_ADMIN',
  AG: 'ROLE_AG',
  CM: 'ROLE_CV',
  CV: 'ROLE_CM'
}

const ROLE_ALL = [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG, ROLE_TYPE.CM, ROLE_TYPE.CV]

export const ROLE_CLIENT = {
  client_name: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  website_url: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: []
  },
  category_code: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA]
  },
  timezone: {
    view: ROLE_ALL,
    create: [],
    edit: []
  },
  buttonCellPhone: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  address2: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  currency: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  otp: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  business_location: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA]
  },
  email: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  cell_phone: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  business_phone: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  payment_type: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA],
    edit: [ROLE_TYPE.SA]
  },
  tax_invoice_amount: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA],
    edit: [ROLE_TYPE.SA]
  },
  tax_invoice_issuer: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA],
    edit: [ROLE_TYPE.SA]
  },
  block_assignment_role: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    create: [],
    edit: [ROLE_TYPE.SA]
  },
  valid_impression_period: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  valid_click_period: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  valid_play_period: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  conversion_user_control: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  user_collect_control: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  mediaExtension: {
    m: {
      view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
      create: [],
      edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
    },
    g: {
      view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
      create: [],
      edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
    },
    b: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    t: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    a: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    i: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    d: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    c: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    f: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    s: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    },
    e: {
      view: [ROLE_TYPE.SA],
      create: [],
      edit: [ROLE_TYPE.SA]
    }
  },
  ip_blocking: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  },
  hcuid_control: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA]
  },
  settable: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG],
    create: [],
    edit: [ROLE_TYPE.SA]
  },
  rta: {
    view: [ROLE_TYPE.SA],
    create: [],
    edit: [ROLE_TYPE.SA]
  },
  privacy: {
    view: ROLE_ALL,
    create: [],
    edit: []
  },
  tmte: {
    view: [ROLE_TYPE.SA],
    create: [],
    edit: [ROLE_TYPE.SA]
  },
  invite: {
    view: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU]
  },
  is_admin_role: {
    create: [],
    edit: [ROLE_TYPE.SA]
  },
  is_client_admin_role: {
    create: [],
    edit: [ROLE_TYPE.CLA, ROLE_TYPE.CLAU]
  },
  is_admin_and_client_admin_role: {
    create: [],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    list: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU]
  },
  is_campaign_viewer: {
    view: ROLE_ALL,
    create: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU],
    edit: [ROLE_TYPE.SA, ROLE_TYPE.CLA, ROLE_TYPE.CLAU, ROLE_TYPE.AG]
  }
}

// userRole +  mnRole
// if SA + CLA => spAdmin
// if SA + TE/TM => spAdmin

// if CLA + null => CLA
// if CLA + CLA => CLA
// if CLA + AG => agency
// if CLA + CV => viewer

export function getRoleClient(element) {
  const roleMain = pluck(ROLE_CLIENT, element)
  let { role } = store.getters.getRoutersInfo
  const userRole = store.getters.roles
  if (userRole.indexOf(ROLE_TYPE.SA) > -1) {
    role = ROLE_TYPE.SA
  }
  if (role === undefined) {
    role = userRole[0]
  }
  let indexRole = -1
  if (roleMain && !!roleMain.length) {
    indexRole = roleMain.indexOf(role)
  }
  return indexRole > -1
}

function pluck(obj, element) {
  return `${element}`.split('.').reduce((rm = {}, key) => rm[key], obj)
}

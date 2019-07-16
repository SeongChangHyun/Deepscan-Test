export const RoleSelectAccount = [
  {
    key: 'SA',
    role: 'ROLE_SUPER_ADMIN',
    label: 'Super Admin',
    keyLabel: ''
  },
  {
    key: 'CM',
    role: 'ROLE_CM',
    label: 'Campaign Manager',
    keyLabel: 'invitedAccount',
    type: 'client'
  },
  {
    key: 'CV',
    role: 'ROLE_CV',
    label: 'Campaign Viewer',
    keyLabel: 'invitedAccount',
    type: 'client'
  },
  {
    key: 'CLA',
    role: 'ROLE_CLA',
    label: 'Client Admin',
    keyLabel: 'youOwn',
    type: 'client'
  },
  {
    key: 'CLA',
    role: 'ROLE_CLIENT_ADMIN',
    label: 'Client Admin',
    keyLabel: 'youOwn',
    type: 'client'
  },
  {
    key: 'AG',
    role: 'ROLE_AG',
    label: 'Agency',
    keyLabel: 'youEntrusted',
    type: 'client'
  },
  {
    key: 'TM',
    role: 'ROLE_TM_TE',
    label: 'TM',
    keyLabel: 'invitedAccount',
    type: 'client'
  },
  {
    key: 'TE/TM',
    role: 'ROLE_SUPER_ADMIN',
    label: 'TE/TM',
    keyLabel: 'invitedAccount',
    type: 'all'
  },
  {
    key: 'TM/TE',
    role: 'ROLE_SUPER_ADMIN',
    label: 'TM/TE',
    keyLabel: 'invitedAccount',
    type: 'all'
  },
  {
    key: 'TE',
    role: 'ROLE_TE',
    label: 'TE',
    keyLabel: 'invitedAccount',
    type: 'client'
  }
]

export const LevelRouter = {
  all: 'all',
  parent: 'parent',
  client: 'client',
  comeback: 'comeback',
  service_manager: 'service_manager',
  special: 'special'
}

const ROLE_TYPE = {
  SA: 'SA',
  CLA: 'CLA',
  AG: 'AG',
  CM: 'CM',
  CV: 'CV'
}

export const ROLE_CLIENT = {
  edit_role: [ROLE_TYPE.CM, ROLE_TYPE.CV]
}

function pluck(obj, element) {
  return `${element}`.split('.').reduce((rm = {}, key) => rm[key], obj)
}

export function getRoleClient(element, role) {
  const roleMain = pluck(ROLE_CLIENT, element)
  let indexRole = -1
  if (roleMain && !!roleMain.length) {
    indexRole = roleMain.indexOf(role)
  }
  return indexRole > -1
}

export const listUsers =
{
  users: [
    {
      id: 1,
      name: '이병환',
      email: 'abc@cmc.com.vn',
      businessPhone: '07011111111',
      cellPhone: '+82101111111',
      accountRoles: [
        {
          role: 'Client admin',
          accessTo: [
            { id: 1, clientName: 'Company(cpn00001)' },
            { id: 2, clientName: 'Company(cpn00002)' },
            { id: 3, clientName: 'Company(cpn00003)' },
            { id: 4, clientName: 'Company(cpn00004)' },
            { id: 5, clientName: 'Company(cpn00005)' },
            { id: 6, clientName: 'Company(cpn00006)' },
            { id: 7, clientName: 'Company(cpn00007)' },
            { id: 8, clientName: 'Company(cpn00008)' },
            { id: 9, clientName: 'Company(cpn00009)' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: '홍아크도',
      email: 'abc3@cmc.com.vn',
      businessPhone: '07011111111',
      cellPhone: '+82101111111',
      accountRoles: [
        {
          role: 'Agency',
          accessTo: [
            { id: 1, clientName: 'Company(cpn00001)' }
          ]
        },
        {
          role: 'CM',
          accessTo: [
            { id: 2, clientName: 'Company(cpn00002)' },
            { id: 5, clientName: 'Company(cpn00005)' }
          ]
        },
        {
          role: 'CV',
          accessTo: [
            { id: 3, clientName: 'Company(cpn00003)' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: '김아크도',
      email: 'abc2@cmc.com.vn',
      businessPhone: '07011111111',
      cellPhone: '+82101111111',
      accountRoles: [
        {
          role: 'Agency',
          accessTo: [
            { id: 1, clientName: 'Company(cpn00001)' }
          ]
        }
      ]
    }
  ],
  clients: [
    {
      id: 1,
      clientName: 'Company(cpn00001)'
    },
    {
      id: 2,
      clientName: 'Company(cpn00002)'
    },
    {
      id: 3,
      clientName: 'Company(cpn00003)'
    },
    {
      id: 4,
      clientName: 'Company(cpn00004)'
    },
    {
      id: 5,
      clientName: 'Company(cpn00005)'
    },
    {
      id: 6,
      clientName: 'Company(cpn00006)'
    },
    {
      id: 7,
      clientName: 'Company(cpn00007)'
    },
    {
      id: 8,
      clientName: 'Company(cpn00008)'
    },
    {
      id: 9,
      clientName: 'Company(cpn00009)'
    }
  ]
}
export const listUsersByClient = [
  {
    id: 1,
    name: '이병환',
    email: 'abc@cmc.com.vn',
    businessPhone: '07011111111',
    cellPhone: '+82101111111',
    accountRoles: [
      {
        role: 'Client admin',
        accessTo: [
          { id: '2', clientName: 'Company(cpn00002)' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Client user 2',
    email: 'client2@cmc.com.vn',
    businessPhone: '07011111111',
    cellPhone: '+82101111111',
    accountRoles: [
      {
        role: 'Agency',
        accessTo: [
          { id: '2', clientName: 'Company(cpn00002)' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Client user 3',
    email: 'client3@cmc.com.vn',
    businessPhone: '07011111111',
    cellPhone: '+82101111111',
    accountRoles: [
      {
        role: 'CM',
        accessTo: [
          { id: '2', clientName: 'Company(cpn00002)' }
        ]
      }
    ]
  }
]
export default {
  getListUsers: () => {
    return listUsers.users
  },
  getUserByClient: () => {
    return listUsersByClient
  },
  getListClients: () => {
    return listUsers.clients
  }
}

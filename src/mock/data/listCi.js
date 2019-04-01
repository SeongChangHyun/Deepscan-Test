
export const mockTableColumns = [
  {
    label: 'Status',
    prop: 'status',
    sortable: true
  },
  {
    label: 'Name',
    prop: 'name',
    sortable: true
  },
  {
    label: 'Size',
    prop: 'size',
    sortable: true
  },
  {
    label: 'Basic CI',
    prop: 'basicci'
  },
  {
    label: 'Auxiliary CI',
    prop: 'auxiliaryci'
  },
  {
    label: 'No. of linked Creative',
    prop: 'nooflinkedcreative',
    sortable: true
  },
  {
    label: 'Creation Date',
    prop: 'createddate'
  }
]
export const mockTableData = [
  {
    id: '1',
    status: 'Disable',
    name: '소재 001',
    type: '다이나믹',
    size: '1024x768',
    basicci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    auxiliaryci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nooflinkedcreative: 20,
    createddate: '20-03 09:13'
  }, {
    id: '2',
    status: 'Enable',
    name: '소재 002',
    type: '고정배너',
    size: '200x200',
    basicci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    auxiliaryci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nooflinkedcreative: 20,
    createddate: '20-03 09:13'
  }, {
    id: '3',
    status: 'Stop',
    name: '소재 003',
    type: '고정배너',
    size: '120x50',
    basicci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    auxiliaryci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nooflinkedcreative: 20,
    createddate: '20-03 09:13'
  }, {
    id: '4',
    status: 'Await',
    name: '소재 004',
    type: '다이나믹',
    size: '83x30',
    basicci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    auxiliaryci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nooflinkedcreative: 20,
    createddate: '20-03 09:13'
  }, {
    id: '5',
    status: 'Stop',
    name: '소재 005',
    type: '다이나믹',
    size: '51x50',
    basicci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    auxiliaryci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nooflinkedcreative: 21,
    createddate: '20-03 09:13'
  }, {
    id: '6',
    status: 'Stop',
    name: '소재 006',
    type: '다이나믹',
    size: '15x50',
    basicci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    auxiliaryci: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nooflinkedcreative: 22,
    createddate: '20-03 09:13'
  }
]
export const mockImageSizes = [
  '15x50',
  '51x50',
  '83x30',
  '120x50',
  '130x80',
  '200x200',
  '298x40',
  '1024x768'
]

export default {
  getCreativeImages: () => {
    return mockTableData
  },
  getImageSizesByAccount: () => {
    return mockImageSizes
  },
  deleteCreativeImages: (config) => {
    const listCi = JSON.parse(config.body)
    return listCi.map(ci => ci.id)
  },
  activateCreativeImages: (config) => {
    const listCi = JSON.parse(config.body)
    return listCi.map(ci => ci.id)
  },
  deactivateCreativeImages: (config) => {
    const listCi = JSON.parse(config.body)
    return listCi.map(ci => ci.id)
  }
}


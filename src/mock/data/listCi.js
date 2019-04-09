
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
    prop: 'basicCi'
  },
  {
    label: 'Auxiliary CI',
    prop: 'auxiliaryCi'
  },
  {
    label: 'No. of linked Creative',
    prop: 'noOfLinkedCreative',
    sortable: true
  },
  {
    label: 'Creation Date',
    prop: 'createdDate'
  }
]
export const mockTableData = [
  {
    id: '1',
    status: 'Disable',
    name: '소재 001',
    type: '다이나믹',
    size: '1024x768',
    basicCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    auxiliaryCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    noOfLinkedCreative: 20,
    createdDate: '20-03 09:13'
  }, {
    id: '2',
    status: 'Enable',
    name: '소재 002',
    type: '고정배너',
    size: '200x200',
    basicCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    auxiliaryCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    noOfLinkedCreative: 20,
    createdDate: '20-03 09:13'
  }, {
    id: '3',
    status: 'Stop',
    name: '소재 003',
    type: '고정배너',
    size: '120x50',
    basicCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    auxiliaryCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    noOfLinkedCreative: 20,
    createdDate: '20-03 09:13'
  }, {
    id: '4',
    status: 'Await',
    name: '소재 004',
    type: '다이나믹',
    size: '83x30',
    basicCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    auxiliaryCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    noOfLinkedCreative: 20,
    createdDate: '20-03 09:13'
  }, {
    id: '5',
    status: 'Stop',
    name: '소재 005',
    type: '다이나믹',
    size: '51x50',
    basicCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    auxiliaryCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    noOfLinkedCreative: 21,
    createdDate: '20-03 09:13'
  }, {
    id: '6',
    status: 'Stop',
    name: '소재 006',
    type: '다이나믹',
    size: '15x50',
    basicCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    auxiliaryCi: 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png',
    noOfLinkedCreative: 22,
    createdDate: '20-03 09:13'
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
    try {
      const listCi = JSON.parse(config.body)
      return listCi.map(ci => ci.id)
    } catch (e) {
      return e
    }
  },
  activateCreativeImages: (config) => {
    try {
      const listCi = JSON.parse(config.body)
      return listCi.map(ci => ci.id)
    } catch (e) {
      return e
    }
  },
  deactivateCreativeImages: (config) => {
    try {
      const listCi = JSON.parse(config.body)
      return listCi.map(ci => ci.id)
    } catch (e) {
      return e
    }
  },
  createCreativeImages: (config) => {
    try {
      const listCi = JSON.parse(config.body)
      return listCi
    } catch (e) {
      return e
    }
  }
}


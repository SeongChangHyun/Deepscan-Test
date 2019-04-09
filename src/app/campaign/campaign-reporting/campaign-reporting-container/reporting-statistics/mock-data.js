const campaignsColum = {
  label: 'Campaigns',
  prop: 'campaigns',
  width: '300px',
  fixed: 'left',
  sortable: 'true',
  className: 'fixed-column',
  status: 'A'
}
const expandColum = {
  label: '',
  expandType: true,
  width: '25px'
}
const cretiveTypeColum = {
  label: 'Cretive Type',
  prop: 'type',
  sortable: 'true',
  minWidth: '150px'
}
export const mockListDefaultColums = [campaignsColum, expandColum, cretiveTypeColum]
export const mockListColumns = [
  campaignsColum,
  expandColum,
  cretiveTypeColum,
  {
    label: 'Bid price',
    prop: 'bid_price',
    sortable: 'true',
    className: 'price-column',
    width: '250px',
    isPrice: true
  },
  {
    label: 'budget',
    prop: 'budget',
    sortable: 'true',
    width: '250px',
    isBudget: true
  },
  {
    label: 'imp',
    prop: 'imp',
    sortable: 'true',
    minWidth: '120px'
  },
  {
    label: 'clicks',
    prop: 'clicks',
    sortable: 'true',
    minWidth: '120px'
  },
  {
    label: 'ctr',
    prop: 'ctr',
    sortable: 'true',
    minWidth: '120px'
  },
  {
    label: 'spend',
    prop: 'spend',
    sortable: 'true',
    minWidth: '120px'
  },
  {
    label: 'eCPM',
    prop: 'ecpm',
    sortable: 'true',
    minWidth: '120px'
  }
]

export const mockTableData = [
  {
    campaigns: '1800313-리드타겟팅 홍보 광고 B',
    type: '필터링',
    bid_price: 200,
    budget: 200,
    imp: 46000,
    clicks: 400,
    ctr: '1.14%',
    spend: 26000,
    ecpm: 714,
    parent: true,
    status: 'Enabled',
    children: [
      {
        status: 'Enabled',
        bid_price: '120x240',
        imp: 15000,
        clicks: 200,
        ctr: '1.33%',
        spend: 15000,
        ecpm: 1000
      },
      {
        status: 'Enabled',
        bid_price: '120x300',
        imp: 15000,
        clicks: 100,
        ctr: '1.00%',
        spend: 6000,
        ecpm: 500
      },
      {
        status: 'Enabled',
        bid_price: '120x350',
        imp: 16000,
        clicks: 100,
        ctr: '1.00%',
        spend: 5000,
        ecpm: 500
      }
    ]
  },
  {
    campaigns: '1800313-리드타겟팅 홍보 광고 A',
    type: '필터링',
    bid_price: 200,
    budget: 200,
    imp: 45000,
    clicks: 400,
    ctr: '1.14%',
    spend: 25000,
    ecpm: 714,
    parent: true,
    status: 'Standby',
    children: [
      {
        bid_price: '120x240',
        imp: 15000,
        clicks: 200,
        ctr: '1.33%',
        spend: 15000,
        ecpm: 1000
      },
      {
        bid_price: '120x300',
        imp: 15000,
        clicks: 100,
        ctr: '1.00%',
        spend: 5000,
        ecpm: 500
      },
      {
        bid_price: '120x350',
        imp: 15000,
        clicks: 100,
        ctr: '1.00%',
        spend: 5000,
        ecpm: 500
      }
    ]
  },
  {
    campaigns: '1800313-리드타겟팅 홍보 광고 C',
    type: '필터링',
    bid_price: 200,
    budget: 200,
    imp: 48000,
    clicks: 400,
    ctr: '1.14%',
    spend: 28000,
    ecpm: 714,
    parent: true,
    status: 'Paused',
    children: [
      {
        bid_price: '120x240',
        imp: 18000,
        clicks: 200,
        ctr: '1.33%',
        spend: 15000,
        ecpm: 1000
      },
      {
        bid_price: '120x300',
        imp: 15000,
        clicks: 100,
        ctr: '1.00%',
        spend: 8000,
        ecpm: 500
      },
      {
        bid_price: '120x350',
        imp: 15000,
        clicks: 100,
        ctr: '1.00%',
        spend: 5000,
        ecpm: 500
      }
    ]
  }
]

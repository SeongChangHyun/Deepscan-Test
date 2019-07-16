export const FeedSetting = {
  usageStatus: [{
    label: 'Disbale (default)',
    isDefault: true,
    value: 'Disable'
  }, {
    label: 'Enable (start collecting Feed-data)',
    isDefault: false,
    value: 'Enable'
  },
  {
    label: 'Paused (but not collecting Feed-data)',
    isDefault: false,
    value: 'Paused'
  }],
  currencyOptions: [{
    label: '원화',
    isDefault: false,
    value: 'KRW'
  }, {
    label: '엔화',
    isDefault: false,
    value: 'YEN'
  },
  {
    label: '위안화',
    isDefault: false,
    value: 'CNY'
  },
  {
    label: '달러',
    isDefault: false,
    value: 'USD'
  }],
  currencyMarking: [
    {
      label: '원',
      value: true
    },
    {
      label: '₩',
      value: false
    }
  ],
  moneyExample: '14,000',
  feedType: [
    {
      label: 'Choose one',
      value: null,
      isDefault: true
    },
    {
      label: 'Naver shopping feed 2.0',
      value: 'naver_open',
      isDefault: false
    },
    {
      label: 'Naver shopping feed 3.0',
      value: 'naver_open_v3',
      isDefault: false
    },
    {
      label: 'Criteo BAR type',
      value: 'criteo',
      isDefault: false
    },
    {
      label: 'Criteo CSV type',
      value: 'criteo_csv',
      isDefault: false
    },
    {
      label: 'Criteo TSV type',
      value: 'criteo_tsv',
      isDefault: false
    },
    {
      label: 'Facebook TSV type',
      value: 'facebook_dpa',
      isDefault: false
    },
    {
      label: 'Facebook XML type',
      value: 'facebook_xml',
      isDefault: false
    },
    {
      label: 'XML',
      value: 'rss_xml',
      isDefault: false
    }
  ],
  encodingType: [
    {
      label: 'No selection(Default)',
      value: '',
      isDefault: true
    },
    {
      label: 'UTF-8',
      value: 'UTF-8',
      isDefault: false
    },
    {
      label: 'UTF-16',
      value: 'UTF-16',
      isDefault: false
    },
    {
      label: 'CP949',
      value: 'CP949',
      isDefault: false
    },
    {
      label: 'EUC-KR',
      value: 'EUC-KR',
      isDefault: false
    },
    {
      label: 'EUC-JP',
      value: 'EUC-JP',
      isDefault: false
    },
    {
      label: 'EUC-CN',
      value: 'EUC-CN',
      isDefault: false
    },
    {
      label: 'EUC-TW',
      value: 'EUC-TW',
      isDefault: false
    },
    {
      label: 'ASCII',
      value: 'ASCII',
      isDefault: false
    },
    {
      label: 'SJIS',
      value: 'SJIS',
      isDefault: false
    },
    {
      label: 'JIS',
      value: 'JIS',
      isDefault: false
    }
  ],
  regularExperssion: [
    {
      label: 'Product ID',
      value: 'mapid'
    },
    {
      label: 'Product Name',
      value: 'pname'
    },
    {
      label: 'Product Price',
      value: 'price'
    },
    {
      label: 'Product URL-PC',
      value: 'pgurl'
    },
    {
      label: 'Product URL-Mobile',
      value: 'mourl'
    },
    {
      label: 'Manufacturer',
      value: 'maker'
    },
    {
      label: 'Product Origin',
      value: 'origi'
    },
    {
      label: 'Default to be blank',
      value: ''
    }
  ],
  timeZoneLengthLimit: 4,
  timeZonePosition: [
    {
      label: '1st crawl time ',
      value: 1
    },
    {
      label: '2nd crawl time ',
      value: 2
    },
    {
      label: '3nd crawl time ',
      value: 3
    },
    {
      label: '4th (Maximum) ',
      value: 4
    }
  ],
  columnsTable: [
    {
      prop: 'product_feed_id',
      label: 'Feed no.',
      minWidth: '80',
      width: 'auto',
      align: 'center'
    },
    {
      prop: 'feed_group',
      label: 'Group',
      minWidth: '80',
      align: 'center',
      width: 'auto'
    },
    {
      prop: 'feed_name',
      label: 'Feed name',
      minWidth: '150',
      align: 'center',
      width: 'auto'
    },
    {
      prop: 'currency',
      label: 'Currency',
      minWidth: '60',
      align: 'center',
      width: 'auto'
    },
    {
      prop: 'full_feed_status',
      label: 'Full feed Status',
      minWidth: '100',
      align: 'center',
      width: 'auto'
    },
    {
      prop: 'adding_feed_status',
      label: 'Adding feed Status',
      minWidth: '150',
      align: 'center',
      width: 'auto'
    },
    {
      prop: 'soldout_feed_status',
      label: 'soldout feed Status',
      minWidth: '150',
      align: 'center',
      width: 'auto'
    },
    {
      prop: 'create_date',
      label: 'Create data',
      minWidth: '150',
      width: 'auto',
      align: 'center'
    },
    {
      prop: 'usage_status',
      label: 'Status',
      minWidth: '150',
      align: 'center',
      width: '115'
    }
  ]
}

export const StateSummary = {
  feedSummaryTableColumn: [
    { id: 0,
      label: '',
      prop: 'type',
      width: 'auto',
      minWidth: '320',
      align: 'left'
    },
    { id: 1,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 2,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 3,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 4,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 5,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 6,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 7,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 8,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { id: 9,
      label: '',
      prop: '',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    }
  ],
  productListTableColumns: [
    { label: 'Group',
      prop: 'feed_group',
      width: 'auto',
      minWidth: '130',
      align: 'center'
    },
    { label: 'Feed name',
      prop: 'feed_name',
      width: 'auto',
      minWidth: '150',
      align: 'center'
    },
    { label: 'Currency',
      prop: 'currency',
      width: 'auto',
      minWidth: '100',
      align: 'center'
    },
    { label: 'ID',
      prop: 'product_id',
      width: 'auto',
      minWidth: '150',
      align: 'center'
    },
    { label: 'Image',
      prop: 'image_url',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { label: 'Name',
      prop: 'product_name',
      width: '400',
      minWidth: '400',
      align: 'center'
    },
    { label: 'Price',
      prop: 'price',
      width: 'auto',
      minWidth: '120',
      align: 'center'
    },
    { label: 'Category',
      prop: 'category_name',
      width: 'auto',
      minWidth: '200',
      align: 'center'
    },
    { label: 'Collected date',
      prop: 'collected_date',
      width: 'auto',
      minWidth: '240',
      align: 'center'
    }
  ]
}

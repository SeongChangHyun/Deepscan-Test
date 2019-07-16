export const BusinessConstrainsSegment = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'all_campaign_goal',
    label: 'Campaign goal',
    children: [
      {
        value: 'all_campaign_goal',
        label: 'All'
      },
      {
        value: 'conversion',
        label: 'Conversion'
      },
      {
        value: 'traffic',
        label: 'Traffic'
      },
      {
        value: 'branding',
        label: 'Branding'
      },
      {
        value: 'retention',
        label: 'Retention'
      },
      {
        value: 'app',
        label: 'App'
      }
    ]
  },
  {
    value: 'all_creative',
    label: 'Creative',
    children: [
      {
        value: 'all_creative',
        label: 'All'
      },
      {
        value: 'fixed_banner',
        label: 'Fixed banner'
      },
      {
        value: 'all_dynamic_banner',
        label: 'Dynamic banner',
        children: [
          {
            value: 'all_dynamic_banner',
            label: 'All'
          },
          {
            value: 'dynamic_1',
            label: '플리에'
          },
          {
            value: 'dynamic_2',
            label: '크루아제'
          },
          {
            value: 'dynamic_3',
            label: '캄브레'
          },
          {
            value: 'dynamic_4',
            label: '디벨로페'
          },
          {
            value: 'dynamic_5',
            label: '에카르테'
          }
        ]
      },
      {
        value: 'native',
        label: 'Native'
      },
      {
        value: 'video',
        label: 'Video'
      }
    ]
  },
  {
    value: 'all_distribution',
    label: 'Distribution',
    children: [
      {
        value: 'all_distribution',
        label: 'All'
      },
      {
        value: 'standard',
        label: 'Standard'
      },
      {
        value: 'accelerated',
        label: 'Accelerated'
      }
    ]
  },
  {
    value: 'all_device_type',
    label: 'Device type',
    children: [
      {
        value: 'all_device_type',
        label: 'All'
      },
      {
        value: 'pc',
        label: 'PC'
      },
      {
        value: 'mobile',
        label: 'Mobile'
      },
      {
        value: 'tablet',
        label: 'Tablet'
      }
    ]
  },
  {
    value: 'all_bid_type',
    label: 'Bid type',
    children: [
      {
        value: 'all_bid_type',
        label: 'All'
      },
      {
        value: 'cpc',
        label: 'CPC'
      },
      {
        value: 'cpm',
        label: 'CPM'
      },
      {
        value: 'cpvc',
        label: 'CPVc'
      },
      {
        value: 'cpmg',
        label: 'CPMg'
      },
      {
        value: 'cpi',
        label: 'CPI'
      },
      {
        value: 'cpa',
        label: 'CPA'
      }
    ]
  }
]

export const dailyReportSegmentEnums = [
  'all_campaign_goal',
  'conversion',
  'traffic',
  'branding',
  'retention',
  'app',
  'all_creative',
  'fixed_banner',
  'all_dynamic_banner',
  'dynamic_1',
  'dynamic_2',
  'dynamic_3',
  'dynamic_4',
  'dynamic_5',
  'native',
  'video',
  'all_distribution',
  'standard',
  'accelerated',
  'all_device_type',
  'pc',
  'mobile',
  'all_bid_type',
  'cpc',
  'cpm',
  'cpvc',
  'cpmg',
  'cpi',
  'cpa'
]

export const BusinessConstrainsSegment = [
  {
    value: 'none',
    label: 'none'
  },
  {
    value: 'campaignGoal',
    label: 'Campaign goal',
    children: [
      {
        value: 'all',
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
        value: 'ppp',
        label: 'App'
      }
    ]
  },
  {
    value: 'creative',
    label: 'Creative',
    children: [
      {
        value: 'all',
        label: 'All'
      },
      {
        value: 'fixedBanner',
        label: 'Fixed banner'
      },
      {
        value: 'dynamicBanner',
        label: 'Dynamic banner',
        children: [
          {
            value: 'all',
            label: 'All'
          },
          {
            value: '플리에',
            label: '플리에'
          },
          {
            value: '크루아제',
            label: '크루아제'
          },
          {
            value: '캄브레',
            label: '캄브레'
          },
          {
            value: '디벨로페',
            label: '디벨로페'
          },
          {
            value: '에카르테',
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
    value: 'distribution',
    label: 'Distribution',
    children: [
      {
        value: 'all',
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
    value: 'DeviceType',
    label: 'Device type',
    children: [
      {
        value: 'all',
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
    value: 'BidType',
    label: 'Bid type',
    children: [
      {
        value: 'all',
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

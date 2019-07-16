export const mockCampaignData = [
  {
    campaign_name: 'Campaign A',
    currency: 'KRW',
    imp: 33000,
    clicks: 3600,
    ctr: '10.91%',
    spend: 220000,
    bid_price: 61,
    ecpm: 6.667,
    conv: 43,
    conv_rate: '1.19%',
    roas: 795,
    conv_cost: 5116,
    rev: 1750000,
    conv_items: 2900
  },
  {
    campaign_name: 'Campaign B',
    currency: 'KRW',
    imp: 38000,
    clicks: 4600,
    ctr: '12.11%',
    spend: 250000,
    bid_price: 54,
    ecpm: 6.579,
    conv: 78,
    conv_rate: '1.70%',
    roas: 900,
    conv_cost: 3205,
    rev: 2250000,
    conv_items: 2400
  },
  {
    campaign_name: 'Campaign C',
    currency: 'KRW',
    imp: 33000,
    clicks: 3600,
    ctr: '10.91%',
    spend: 220000,
    bid_price: 61,
    ecpm: 6.667,
    conv: 43,
    conv_rate: '1.19%',
    roas: 795,
    conv_cost: 5116,
    rev: 1750000,
    conv_items: 2900
  },
  {
    campaign_name: 'Campaign D',
    currency: 'KRW',
    imp: 38000,
    clicks: 4600,
    ctr: '12.11%',
    spend: 250000,
    bid_price: 54,
    ecpm: 6.579,
    conv: 78,
    conv_rate: '1.70%',
    roas: 900,
    conv_cost: 3205,
    rev: 2250000,
    conv_items: 2400
  },
  {
    campaign_name: 'Campaign E',
    currency: 'KRW',
    imp: 33000,
    clicks: 3600,
    ctr: '10.91%',
    spend: 220000,
    bid_price: 61,
    ecpm: 6.667,
    conv: 43,
    conv_rate: '1.19%',
    roas: 795,
    conv_cost: 5116,
    rev: 1750000,
    conv_items: 2900
  },
  {
    campaign_name: 'Campaign F',
    currency: 'KRW',
    imp: 38000,
    clicks: 4600,
    ctr: '12.11%',
    spend: 250000,
    bid_price: 54,
    ecpm: 6.579,
    conv: 78,
    conv_rate: '1.70%',
    roas: 900,
    conv_cost: 3205,
    rev: 2250000,
    conv_items: 2400
  },
  {
    campaign_name: 'total',
    currency: '-',
    imp: 71000,
    clicks: 8200,
    ctr: '1.55%',
    spend: 470000,
    bid_price: 58,
    ecpm: 6.620,
    conv: 121,
    conv_rate: '1.48%',
    roas: 851,
    conv_cost: 8321,
    rev: 4000000,
    conv_items: 5300
  }
]
export const mockAccountData = [
  {
    account_name: 'tg360(A010AAA1)',
    currency: 'KRW',
    imp: 33000,
    clicks: 3600,
    ctr: '10.91%',
    spend: 220000,
    bid_price: 61,
    ecpm: 6.667,
    conv: 43,
    conv_rate: '1.19%',
    roas: 795,
    conv_cost: 5116,
    rev: 1750000,
    conv_items: 2900,
    children: [
      {
        account_name: 'Campaign A',
        currency: '-'
      },
      {
        account_name: 'Campaign B',
        currency: '-'
      },
      {
        account_name: 'Campaign C',
        currency: '-'
      }
    ]
  },
  {
    account_name: 'arcdo(A010AAA1)',
    currency: 'KRW',
    imp: 38000,
    clicks: 4600,
    ctr: '12.11%',
    spend: 250000,
    bid_price: 54,
    ecpm: 6.579,
    conv: 78,
    conv_rate: '1.70%',
    roas: 900,
    conv_cost: 3205,
    rev: 2250000,
    conv_items: 2400,
    children: [
      {
        account_name: '    Campaign A',
        currency: '-'
      },
      {
        account_name: '    Campaign B',
        currency: '-'
      },
      {
        account_name: '    Campaign C',
        currency: '-'
      }
    ]
  },
  {
    account_name: 'total',
    currency: '-',
    imp: 71000,
    clicks: 8200,
    ctr: '1.55%',
    spend: 470000,
    bid_price: 58,
    ecpm: 6.620,
    conv: 121,
    conv_rate: '1.48%',
    roas: 851,
    conv_cost: 8321,
    rev: 4000000,
    conv_items: 5300
  }
]
export const mockAdGroupData = [
  {
    account_name: 'tg360(A010AAA1)',
    currency: 'KRW',
    imp: 33000,
    clicks: 3600,
    ctr: '10.91%',
    spend: 220000,
    bid_price: 61,
    ecpm: 6.667,
    conv: 43,
    conv_rate: '1.19%',
    roas: 795,
    conv_cost: 5116,
    rev: 1750000,
    conv_items: 2900,
    children: [
      {
        account_name: '    Group A',
        currency: '-'
      },
      {
        account_name: '    Group B',
        currency: '-'
      },
      {
        account_name: '    Group C',
        currency: '-'
      }
    ]
  },
  {
    account_name: 'arcdo(A010AAA1)',
    currency: 'KRW',
    imp: 38000,
    clicks: 4600,
    ctr: '12.11%',
    spend: 250000,
    bid_price: 54,
    ecpm: 6.579,
    conv: 78,
    conv_rate: '1.70%',
    roas: 900,
    conv_cost: 3205,
    rev: 2250000,
    conv_items: 2400,
    children: [
      {
        account_name: '    Group A',
        currency: '-'
      },
      {
        account_name: '    Group B',
        currency: '-'
      },
      {
        account_name: '    Group C',
        currency: '-'
      }
    ]
  },
  {
    account_name: 'total',
    currency: '-',
    imp: 71000,
    clicks: 8200,
    ctr: '1.55%',
    spend: 470000,
    bid_price: 58,
    ecpm: 6.620,
    conv: 121,
    conv_rate: '1.48%',
    roas: 851,
    conv_cost: 8321,
    rev: 4000000,
    conv_items: 5300
  }
]

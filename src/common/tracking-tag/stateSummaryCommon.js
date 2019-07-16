import TextCell from '@/app/tool/components/tracking-tag/components/state-summary/cell-table/TextCell'
import CheckboxCell from '@/app/tool/components/tracking-tag/components/state-summary/cell-table/CheckboxCell'

export const LIST_TYPE_DEVICE = [
  {
    key: 'all',
    label: 'Total'
  },
  {
    key: 'pc',
    label: 'Desktop'
  },
  {
    key: 'mobile_web',
    label: 'MobileWeb'
  },
  {
    key: 'mobile_app',
    label: 'MobileApp'
  }
]

export const LIST_CONFIG_TABLE = [
  'device',
  'category',
  'data'
]

export const LIST_CONFIG_TABLE_BOTTOM = [
  'category',
  'custom_tag_name'
]

export const LIST_CONFIG_CELL_TABLE = [
  {
    props: 'custom_tag_name',
    template: TextCell
  },
  {
    props: 'count',
    template: CheckboxCell
  },
  {
    props: 'count',
    template: CheckboxCell
  }
]

export const LIST_BASE = [
  {
    code: 'pc',
    device: '(Desktop)',
    category: 'General',
    data: []
  },
  {
    code: 'pc',
    device: '(Desktop)',
    category: 'Conversion',
    data: []
  },
  {
    code: 'mobile',
    device: '(Mobile)',
    category: 'General',
    data: []
  },
  {
    code: 'mobile',
    device: '(Mobile)',
    category: 'Conversion',
    data: []
  }
]

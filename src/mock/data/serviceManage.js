import { COLUMN_WIDTH } from '@/common/service-manage/serviceManage.js'

export const LIST_SERVICE = {

  SUPPORT_MENU_LABEL_NAME: [
    [{ label: 'Performance Report', width: COLUMN_WIDTH.normal_col_width }, { label: 'History Information', width: COLUMN_WIDTH.normal_col_width }, { label: 'Client management', width: COLUMN_WIDTH.normal_col_width }, { label: 'Users', width: COLUMN_WIDTH.normal_col_width }, { label: 'Payment', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Billing History', width: COLUMN_WIDTH.normal_col_width }, { label: 'Settlement API', width: COLUMN_WIDTH.normal_col_width }, { label: 'My Information', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Campaign Report', width: COLUMN_WIDTH.normal_col_width }, { label: 'Daily Report', width: COLUMN_WIDTH.normal_col_width }, { label: 'Create Campaign', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Goal / Targeting type', width: COLUMN_WIDTH.normal_col_width }, { label: 'Creatives', width: COLUMN_WIDTH.normal_col_width }, { label: 'Day ot the the week / Time', width: COLUMN_WIDTH.normal_col_width }, { label: 'OS / Browser', width: COLUMN_WIDTH.normal_col_width }, { label: 'Country / Region', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Behavior of site visit', width: COLUMN_WIDTH.normal_col_width }, { label: 'Advertising position', width: COLUMN_WIDTH.normal_col_width }, { label: 'Demographics', width: COLUMN_WIDTH.normal_col_width }, { label: 'User Interest', width: COLUMN_WIDTH.normal_col_width }, { label: 'Lookalike audience', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Feed category base user', width: COLUMN_WIDTH.normal_col_width }, { label: 'Probability of purchase', width: COLUMN_WIDTH.normal_col_width }, { label: 'Video Ad', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Creative', width: COLUMN_WIDTH.normal_col_width }, { label: 'CI', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Tracking tag', width: COLUMN_WIDTH.normal_col_width }, { label: 'Product feed', width: COLUMN_WIDTH.normal_col_width }, { label: 'Custom user group', width: COLUMN_WIDTH.normal_col_width }, { label: 'Periodic Report', width: COLUMN_WIDTH.normal_col_width }, { label: 'Index API', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Alarm', width: COLUMN_WIDTH.normal_col_width }]
  ],

  SUPPORT_GOAL_TARGET_BRANDING: [
    [{ label: 'Branding', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Retargeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Lead targeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'User targeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'Topic targeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'Keyword targeting', width: COLUMN_WIDTH.last_col_width }]
  ],

  SUPPORT_GOAL_TARGET_TRAFFIC: [
    [{ label: 'Traffic', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Retargeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Lead targeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'User targeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'Topic targeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'Keyword targeting', width: COLUMN_WIDTH.last_col_width }]
  ],

  SUPPORT_GOAL_TARGET_RENTENTION: [
    [{ label: 'Rentention', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Retargeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'Lead targeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'User targeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Topic targeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Keyword targeting', width: COLUMN_WIDTH.last_col_width, disable: true }]
  ],

  SUPPORT_GOAL_TARGET_CONVERSION: [
    [{ label: 'Conversion', width: COLUMN_WIDTH.normal_col_width }],
    [{ label: 'Retargeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'Lead targeting', width: COLUMN_WIDTH.normal_col_width }, { label: 'User targeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Topic targeting', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Keyword targeting', width: COLUMN_WIDTH.last_col_width, disable: true }]
  ],

  SUPPORT_OPTION_LABLE_NAME: [
    [{ label: 'Location', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Language', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Device', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Budget', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Bid Detail', width: COLUMN_WIDTH.last_col_width, disable: true }],
    [{ label: 'Target Group Control A', width: COLUMN_WIDTH.normal_col_width }, { label: 'Target Group Control B', width: COLUMN_WIDTH.normal_col_width }, { label: 'Select Conversion Type', width: COLUMN_WIDTH.normal_col_width }, { label: 'Probability of purchase', width: COLUMN_WIDTH.normal_col_width }, { label: 'Automatically optimize Conversion', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Lead targeting range', width: COLUMN_WIDTH.normal_col_width }, { label: 'User Interest Directory', width: COLUMN_WIDTH.normal_col_width }, { label: 'Artical Topic Directory', width: COLUMN_WIDTH.normal_col_width }, { label: 'Keyword List', width: COLUMN_WIDTH.normal_col_width }, { label: 'Demographic', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Behavior of the visit', width: COLUMN_WIDTH.normal_col_width }, { label: 'Advertising position', width: COLUMN_WIDTH.normal_col_width }, { label: 'Custom user group', width: COLUMN_WIDTH.normal_col_width }, { label: 'Forecast of conversion', width: COLUMN_WIDTH.normal_col_width }, { label: 'Feed category base user targeting', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Impression capping', width: COLUMN_WIDTH.normal_col_width, disable: true }, { label: 'Product filtering', width: COLUMN_WIDTH.normal_col_width }, { label: 'Browser', width: COLUMN_WIDTH.normal_col_width }, { label: 'IP address', width: COLUMN_WIDTH.normal_col_width }, { label: 'OS', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Carrier', width: COLUMN_WIDTH.normal_col_width }, { label: 'Manufacturer/Band', width: COLUMN_WIDTH.normal_col_width }, { label: 'Schedule', width: COLUMN_WIDTH.normal_col_width }, { label: 'Fixed date', width: COLUMN_WIDTH.normal_col_width }]
  ],

  SUPPORT_PERFORMANCE_LABEL_NAME: [
    [{ label: 'Request', width: COLUMN_WIDTH.normal_col_width }, { label: 'Bids', width: COLUMN_WIDTH.normal_col_width }, { label: 'Wins', width: COLUMN_WIDTH.normal_col_width }, { label: 'Impressions', width: COLUMN_WIDTH.normal_col_width }, { label: 'Impression UV', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Clicks', width: COLUMN_WIDTH.normal_col_width }, { label: 'Clicks UV', width: COLUMN_WIDTH.normal_col_width }, { label: 'Clicks User Rate', width: COLUMN_WIDTH.normal_col_width }, { label: 'Visit UV', width: COLUMN_WIDTH.normal_col_width }, { label: 'reVisit UV', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Visit Rate', width: COLUMN_WIDTH.normal_col_width }, { label: 'reVisit Rate', width: COLUMN_WIDTH.normal_col_width }, { label: 'CTR', width: COLUMN_WIDTH.normal_col_width }, { label: 'Bounce Clicks', width: COLUMN_WIDTH.normal_col_width }, { label: 'Bounce Rate', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Spend', width: COLUMN_WIDTH.normal_col_width }, { label: 'Bid Price', width: COLUMN_WIDTH.normal_col_width }, { label: 'Ecpm', width: COLUMN_WIDTH.normal_col_width }, { label: 'Conversions', width: COLUMN_WIDTH.normal_col_width }, { label: 'Conversion Rate', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'All conversion UV', width: COLUMN_WIDTH.normal_col_width }, { label: '1st conversion UV', width: COLUMN_WIDTH.normal_col_width }, { label: '2nd conversion UV', width: COLUMN_WIDTH.normal_col_width }, { label: '1st conversion Rate', width: COLUMN_WIDTH.normal_col_width }, { label: '2nd conversion Rate', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'ROAS', width: COLUMN_WIDTH.normal_col_width }, { label: 'Conversion cost', width: COLUMN_WIDTH.normal_col_width }, { label: 'Revenue', width: COLUMN_WIDTH.normal_col_width }, { label: 'Conversion Items', width: COLUMN_WIDTH.normal_col_width }, { label: 'Assistant Conversions', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Assistant Conversion Items', width: COLUMN_WIDTH.normal_col_width }, { label: 'Assistant ROAS', width: COLUMN_WIDTH.normal_col_width }, { label: 'Assistant Revenue', width: COLUMN_WIDTH.normal_col_width }, { label: 'Impressions conversions', width: COLUMN_WIDTH.normal_col_width }, { label: 'Impression Items', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Impression ROAS', width: COLUMN_WIDTH.normal_col_width }, { label: 'Impression revenue', width: COLUMN_WIDTH.normal_col_width }, { label: 'Conversions per Day', width: COLUMN_WIDTH.normal_col_width }, { label: 'Conversions Items per Day', width: COLUMN_WIDTH.normal_col_width }, { label: 'ROAS per Day', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Revenue per Day', width: COLUMN_WIDTH.normal_col_width }, { label: 'Play 5s', width: COLUMN_WIDTH.normal_col_width }, { label: 'Play 15s', width: COLUMN_WIDTH.normal_col_width }, { label: 'VTR', width: COLUMN_WIDTH.normal_col_width }, { label: 'Play Conversions', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Play Items', width: COLUMN_WIDTH.normal_col_width }, { label: 'Play ROAS', width: COLUMN_WIDTH.normal_col_width }, { label: 'Play Revenue', width: COLUMN_WIDTH.normal_col_width }, { label: 'Delivery Net Cost', width: COLUMN_WIDTH.normal_col_width }, { label: 'Delivery Cost', width: COLUMN_WIDTH.last_col_width }],
    [{ label: 'Spend Rate', width: COLUMN_WIDTH.normal_col_width }, { label: 'Affiliate', width: COLUMN_WIDTH.normal_col_width }]
  ]

}

export default {
  getListService: () => {
    return LIST_SERVICE
  }
}

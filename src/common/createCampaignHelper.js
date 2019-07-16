import { CampaignManagementConstants, LEAD_TARGETING_IMPRESSION, STRING_NUMBER } from '@/common/constants'
import { toTitleCase } from '@/utils'

export const buildCampaignFormData = (storeStateFormData) => {
  const formData = {}
  const {
    campaign_budget
  } = storeStateFormData

  /** Base Info */
  formData.campaign_default_information = {
    goal: storeStateFormData.g_type.toUpperCase(),
    c_type: storeStateFormData.c_type,
    campaign_name: storeStateFormData.campaign_name,
    p_type: storeStateFormData.p_type,
    campaign_group_name: storeStateFormData.campaign_group.campaign_group_name,
    campaign_group_id: storeStateFormData.campaign_group.campaign_group_id,
    landing_url: storeStateFormData.landingUrl.url,
    is_set_app_campaign: storeStateFormData.is_set_app_campaign,
    create_date: storeStateFormData.create_date,
    modified_date: storeStateFormData.modified_date,
    status: storeStateFormData.status
  }

  formData.languages = storeStateFormData.campaign_language.language_list.map(item => {
    return {
      code: item.code,
      status: item.status
    }
  })

  const { campaign_location } = storeStateFormData
  formData.location = {
    location_type: campaign_location.location_type,
    location: campaign_location.location.map(item => {
      return {
        parent_code: item.parent_code,
        code: item.code,
        status: item.status.toUpperCase()
      }
    })
  }

  formData.device = storeStateFormData.campaign_device_id

  formData.budget = {
    budget_type: storeStateFormData.budget_type,
    budget_count: storeStateFormData.budget_count,
    budge_dates: storeStateFormData.budge_dates
  }
  if (campaign_budget.budget_expenses_distribute || campaign_budget.type || campaign_budget.period) {
    formData.budget.daily_budget_option = {
      budget_expenses_distribute: campaign_budget.budget_expenses_distribute,
      type: campaign_budget.type,
      period: campaign_budget.period
    }
  }

  /** Targeting Goal Default Option */
  formData.target_control_a = {
    is_limitted_user: storeStateFormData.target_group_ctrl_a.is_limit_impression,
    limitted_count: parseInt(storeStateFormData.target_group_ctrl_a.impression_count),
    limitted_times: storeStateFormData.target_group_ctrl_a.circuit_live_time,
    is_exclude_visitted_customer: storeStateFormData.target_group_ctrl_a.is_exclude_customer,
    is_disable_exposed_ads: storeStateFormData.target_group_ctrl_a.is_disable_all_options
  }

  formData.target_control_b = {
    delivery_condition: storeStateFormData.target_group_ctrl_b.value === CampaignManagementConstants.TARGET_GROUP_CONTROL_B.SELECT_SPECIFIED_TARGET,
    period_activites_history: storeStateFormData.target_group_ctrl_b.activity_history_period,
    period_sending_ads_user: storeStateFormData.target_group_ctrl_b.sending_ads_period
  }

  formData.target_conversion_type = {
    conversion_segments: storeStateFormData.targetConversionType.segmentSelected,
    conversion_type: storeStateFormData.targetConversionType.typeSelected
  }

  /** Targeting Type Default Option */
  const { automaticallyOptimizeConversion } = storeStateFormData
  formData.automatically_optimize_conversion = {
    optimize_option: automaticallyOptimizeConversion.value,
    conversion_type: automaticallyOptimizeConversion.conversionCustom
  }

  formData.lead_targeting_range = {
    ...storeStateFormData.lead_targeting_range,
    impression: storeStateFormData.lead_targeting_range.impression ? LEAD_TARGETING_IMPRESSION.CHECK : LEAD_TARGETING_IMPRESSION.UN_CHECK
  }

  formData.article_topic_directory = storeStateFormData.article_topics
  formData.user_interest_directory = storeStateFormData.user_interest_directory

  formData.keywords = storeStateFormData.keywords
  /** Ad Delivery Restrictions Settings */
  const { demographic } = storeStateFormData
  const parsedDemographic = { is_all: parseInt(demographic.is_all) }
  formData.demographic = (demographic.is_all === STRING_NUMBER.ONE) ? parsedDemographic : { ...demographic, ...parsedDemographic }

  formData.feed_base_user_targeting = storeStateFormData.feed_base_user_targeting
  formData.advertising_position = storeStateFormData.advertising_position
  formData.Ip_addresses = storeStateFormData.Ip_addresses
  formData.os = storeStateFormData.os

  const { customUserGroup } = storeStateFormData
  formData.custom_user_groups = customUserGroup.selected.map(item => {
    return {
      campaign_library_id: item.campaign_library_id,
      status: item.status.toUpperCase()
    }
  })

  formData.forecast_conversion = storeStateFormData.forecast_conversion

  const { impression_capping } = storeStateFormData
  formData.impression_capping = {
    limit_user: parseInt(impression_capping.limit_user),
    daily_capping: impression_capping.daily_capping,
    session_capping: parseInt(impression_capping.session_capping),
    display_time: impression_capping.display_time,
    is_display_product: impression_capping.session_capping ? 1 : 0,
    is_display_product_category: impression_capping.is_display_product_category ? 1 : 0,
    weight: parseInt(impression_capping.weight),
    weight_rs: parseInt(impression_capping.weight_rs)
  }

  const { behavior_site_visit } = storeStateFormData
  formData.behavior_site_visit = {}
  formData.behavior_site_visit.window = behavior_site_visit.radio === CampaignManagementConstants.BEHAVIOR_TYPE.ALL ? 0 : behavior_site_visit.window
  const behaviorSites = behavior_site_visit.allowed.map(item => {
    return {
      client_id: item.id,
      allowedTrackingTags: item.children.map(el => {
        return {
          tracking_tag_id: el.id,
          custom_tag_name: el.label
        }
      })
    }
  })
  const blockedOnlyList = []
  behavior_site_visit.blocked.forEach(item => {
    behaviorSites.forEach(el => {
      if (el.client_id === item.id) {
        el.blockedTrackingTags = item.children
      } else {
        blockedOnlyList.push({
          client_id: item.id,
          blockedTrackingTags: item.children.map(blockItem => {
            return {
              tracking_tag_id: blockItem.id,
              custom_tag_name: blockItem.label
            }
          })
        })
      }
    })
  })
  formData.behavior_site_visit = [...behaviorSites, ...blockedOnlyList]

  const { allows, blocks, is_all } = storeStateFormData.browser
  if (is_all === STRING_NUMBER.ONE) {
    formData.browsers = {
      is_all: parseInt(is_all)
    }
  } else {
    formData.browsers = {
      is_all: parseInt(is_all),
      browser_items: [
        ...allows.map(browser => {
          return {
            code: browser,
            status: toTitleCase(CampaignManagementConstants.VERIFY_TYPE.ALLOW)
          }
        }),
        ...blocks.map(browser => {
          return {
            code: browser,
            status: toTitleCase(CampaignManagementConstants.VERIFY_TYPE.BLOCK)
          }
        })
      ]
    }
  }

  const { selected, value } = storeStateFormData.carrier
  if (value === STRING_NUMBER.ONE) {
    formData.carriers = { is_all: parseInt(value) }
  } else {
    formData.carriers = {
      is_all: parseInt(value),
      carrier_items: selected.map(carrier => {
        return {
          id: carrier.id,
          status: carrier.status
        }
      })
    }
  }

  const { manufacture } = storeStateFormData
  if (manufacture.value === STRING_NUMBER.ONE) {
    formData.manufactures = { is_all: parseInt(manufacture.value) }
  } else {
    formData.manufactures = {
      is_all: parseInt(manufacture.value),
      manufacture_items: manufacture.selected.map(item => {
        return {
          id: item.id,
          status: item.status
        }
      })
    }
  }

  formData.campain_product_filtering = storeStateFormData.campain_product_filtering
  formData.schedule = storeStateFormData.schedule
  formData.fixed_date = storeStateFormData.fixed_date
}

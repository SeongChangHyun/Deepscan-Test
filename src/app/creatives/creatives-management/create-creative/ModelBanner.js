import { Common, CreativeConstant } from '@/common/constants'

export const ModelBanner = {
  creative_id: '',
  banner_name: '',
  option: {
    transition_type: CreativeConstant.animatedTypes[6].value,
    transition_ms: CreativeConstant.motionSpeed[1].value,
    scene_time: CreativeConstant.playStopTerms[1].value,
    border_color: Common.DEFAULT_COLOR_PICKER,
    border_px: CreativeConstant.borderColors[3].value,
    gauge_style: CreativeConstant.progressBarStyles[1],
    gauge_position: CreativeConstant.progressPositions[3],
    gauge_size: CreativeConstant.progressBarSizes[2]
  },
  url: '',
  impression_check_url: '',
  app_deeplink_android: '',
  impression_check_app_deeplink_android: '',
  app_deeplink_apple: '',
  impression_check_app_deeplink_apple: '',
  app_mobile_url: '',
  impression_check_app_mobile_url: '',
  alt: '',
  banner_text: '',
  tmp_file_list: [],
  is_retina_image: 0,
  extend_options: {
    outer_color: Common.DEFAULT_COLOR_PICKER,
    is_retina_image: 0
  }
}


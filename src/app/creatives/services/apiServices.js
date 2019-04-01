import BaseApiService from '@/utils/baseApiService'
import { creative } from '@/common/apiUrlConfig'

/* ci list */
export function getCreativeImages() {
  return BaseApiService.get(creative.get_ci_apiendpoint)
}
export function deleteCreativeImages(creativeImages) {
  return BaseApiService.post(creative.delete_ci_apiendpoint, creativeImages)
}
export function activateCreativeImages(creativeImages) {
  return BaseApiService.post(creative.activate_ci_apiendpoint, creativeImages)
}
export function deactivateCreativeImages(creativeImages) {
  return BaseApiService.post(creative.deactivate_ci_apiendpoint, creativeImages)
}
export function getImageSizesByAccount() {
  return BaseApiService.get(creative.get_image_sizes_by_account_apiendpoint)
}

/* end ci list */

/* ci create */

/* end ci create */

/* Creative API */

/* fixed banner api */
export function createFixedBanner(data) {
  return BaseApiService.post(creative.create_fixed_banner_apiendpoint, data)
}
/* end fixed banner api */

/* End creative api */

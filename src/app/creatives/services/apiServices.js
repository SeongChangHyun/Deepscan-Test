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
export function createCreativeImages(creativeImages) {
  return BaseApiService.post(creative.create_creative_images_apiendpoint, creativeImages)
}

/* end ci list */
/* Get list creatives */
export function getListCreative() {
  return BaseApiService.get(creative.get_creatives_apiendpoint)
}
export function deleteCreative(data) {
  return BaseApiService.post(creative.delete_creative_apiendpoint, data)
}
export function activateCreative(data) {
  return BaseApiService.post(creative.activate_creative_apiendpoint, data)
}
export function deactivateCreative(data) {
  return BaseApiService.post(creative.deactivate_creative_apiendpoint, data)
}
export function getCreative() {
  return BaseApiService.get(creative.get_creative_apiendpoint)
}
export function updateDynamicCreative(data) {
  return BaseApiService.post(creative.update_dynamic_creative_apiendpoint, data)
}
/* end get list creatives */
/* ci create */

/* end ci create */

/* Creative API */

/* fixed banner api */
export function createFixedBanner(data) {
  return BaseApiService.post(creative.create_creative_apiendpoint, data)
}
export function createDynamicAds(data) {
  return BaseApiService.post(creative.create_fixed_banner_apiendpoint, data)
}
/* end fixed banner api */
/* native ads api */
export function createNativeAds(data) {
  return new Promise(resolve => setTimeout(resolve))
}
/* video ads api */
export function createVideoAds(data) {
  return new Promise(resolve => setTimeout(resolve))
}

/* End creative api */

import BaseApiService from '@/utils/baseApiService'

export function getSampleDataApi(payload) {
  return BaseApiService.get('sample-url', payload)
}

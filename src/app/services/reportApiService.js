import Rest from '@/services/restAdapter'
import { report, targeting } from '@/common/apiUrlConfig'

/**
 * @typedef  {ReportApiService}
 */
export default class ReportApiService extends Rest {
  /**
   * @type  {String}
   */
  static resource = Rest.resource + '/report'

  getColumns({ id }) {
    return this.get(report.crud_set_columns + `/${id}` + report.stats_columns)
  }
  getDefaultColumns() {
    return this.get(report.stats_default_columns)
  }
  getSetColumns(data) {
    return this.get(report.crud_set_columns, data)
  }
  deleteSetColumns(id) {
    return this.delete(report.crud_set_columns + `/${id}`)
  }
  saveSetColumns(data) {
    return this.post(report.stats_columns, data)
  }
  getStatsSetColumns(userStatsConfigId) {
    return this.get(report.crud_set_columns + `/${userStatsConfigId}` + report.stats_columns)
  }
  getDefaultStatsColumn() {
    return this.get(report.stats_default_columns)
  }
  getColumnsMaterials({ column_type }) {
    return this.get(`${report.get_columns}?column_type=${column_type}`)
  }
  getCreativesReportingData() {
    return this.get(targeting.get_creatives_report)
  }
  getTimeAndDayReportingData(data) {
    return this.post(targeting.get_time_and_day_report, data)
  }
  getUserInterest(campaign_id) {
    return this.get(targeting.get_user_interest, campaign_id)
  }
}

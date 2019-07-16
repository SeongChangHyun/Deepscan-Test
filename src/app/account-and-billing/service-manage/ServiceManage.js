import { ACTIVE_SERVICES, SERVICE_CHECK_LIST } from '@/common/service-manage/serviceManage.js'
import { SupportMenuList } from '@/common/account-billing/supportMenu.js'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import _ from 'lodash'
import * as cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'ServiceManage',
  data() {
    return {
      listSuportMenuCheckboxTemplate: SupportMenuList,
      listSuportMenuCheckbox: [],
      listNotAllowServices: [],
      listServices: {},
      language: '',
      services: ACTIVE_SERVICES,
      activeServices: [],
      supportMenuCheckList: SERVICE_CHECK_LIST.SUPPORT_MENU_CHECK_LIST,
      supportGoalTargetBrandingCheckList: SERVICE_CHECK_LIST.SUPPORT_GOAL_TARGET_BRANDING_CHECK_LIST,
      supportGoalTargetTrafficCheckList: SERVICE_CHECK_LIST.SUPPORT_GOAL_TARGET_TRAFFIC_CHECK_LIST,
      supportGoalTargetRententionCheckList: SERVICE_CHECK_LIST.SUPPORT_GOAL_TARGET_RENTENTION_CHECK_LIST,
      supportGoalTargetConversionCheckList: SERVICE_CHECK_LIST.SUPPORT_GOAL_TARGET_CONVERSION_CHECK_LIST,
      supportOptionCheckList: SERVICE_CHECK_LIST.SUPPORT_OPTION_CHECK_LIST,
      performanceSupportCheckList: SERVICE_CHECK_LIST.PERFORMANCE_SUPPORT_CHECK_LIST,
      supportMenuLabelName: [],
      supportGoalTargetBranding: [],
      supportGoalTargetTraffic: [],
      supportGoalTargetRentention: [],
      supportGoalTargetConversion: [],
      supportOptionLabelName: [],
      supportPerformanceLabelName: [],
      tempSupportMenu: [],
      tempSupportGoalTargetBrandingCheckList: [],
      tempSupportGoalTargetTrafficCheckList: [],
      tempSupportGoalTargetRententionCheckList: [],
      tempSupportGoalTargetConversionCheckList: [],
      tempSupportOption: [],
      tempPerformanceSupport: [],
      loading: null,
      types: {
        client: 'client',
        clients: 'clients'
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters('user', ['getListService']),
    ...mapGetters(['getServiceManage'])
  },
  watch: {
    getListService: {
      handler(newData) {
        if (newData instanceof Object) {
          this.listServices = newData
          this.supportMenuLabelName = this.listServices.SUPPORT_MENU_LABEL_NAME
          this.supportGoalTargetBranding = this.listServices.SUPPORT_GOAL_TARGET_BRANDING
          this.supportGoalTargetTraffic = this.listServices.SUPPORT_GOAL_TARGET_TRAFFIC
          this.supportGoalTargetRententionCheckList = this.listServices.SUPPORT_GOAL_TARGET_RENTENTION
          this.supportGoalTargetConversion = this.listServices.SUPPORT_GOAL_TARGET_CONVERSION
          this.supportOptionLabelName = this.listServices.SUPPORT_OPTION_LABLE_NAME
          this.supportPerformanceLabelName = this.listServices.SUPPORT_PERFORMANCE_LABEL_NAME
        }
      },
      immediate: true
    },
    getServiceManage: {
      handler(newData) {
        if (newData && newData.account_id) {
          this.mapDataListSuportMenu(newData)
        }
      },
      immediate: true
    }
  },
  created() {
    this.showLoading()
    this.language = Cookies.get('language')
    this.activeServices = this.services.slice(0)
    this.tempSupportMenu = this.supportMenuCheckList

    this.tempSupportGoalTargetBrandingCheckList = this.supportGoalTargetBrandingCheckList
    this.tempSupportGoalTargetTrafficCheckList = this.supportGoalTargetTrafficCheckList
    this.tempSupportGoalTargetRententionCheckList = this.supportGoalTargetRententionCheckList
    this.tempSupportGoalTargetConversionCheckList = this.supportGoalTargetConversionCheckList
    this.tempSupportOption = this.supportOptionCheckList
    this.tempPerformanceSupport = this.performanceSupportCheckList
  },
  methods: {
    mapDataListSuportMenu(notAllowServices) {
      this.listNotAllowServices = notAllowServices
      const listNotAllowMenuServices = notAllowServices.not_allow_menu_services
      const arrayFilter = this.listSuportMenuCheckboxTemplate.filter(item => {
        if (notAllowServices.is_business) {
          return item
        }
        return !item.is_business
      })
      for (const i in arrayFilter) {
        const index = _.findIndex(listNotAllowMenuServices, (item) => item.name === arrayFilter[i].code)
        arrayFilter[i].checked = index === -1
      }
      this.listSuportMenuCheckbox = arrayFilter
      this.listSuportMenuCheckbox = cloneDeep(this.listSuportMenuCheckbox)
      this.hideLoading()
    },
    changeCheckBoxSupportMenu(index) {
      this.listSuportMenuCheckbox[index].checked = !this.listSuportMenuCheckbox[index].checked
    },
    save() {
      // currently only makes support menu
      const notAllowMenuServices = this.listSuportMenuCheckbox.filter(item => {
        return !item.checked
      })
      const paramsPayload = {
        account_id: this.listNotAllowServices.account_id,
        not_allow_campaign_services: [],
        not_allow_report_services: [],
        not_allow_menu_services: notAllowMenuServices

      }
      this.showLoading()
      this.$store.dispatch('user/SaveListServicesConfiguration', paramsPayload).then((response) => {
        this.$message.success({
          message: this.$t(`serviceManage.saveSuccess`)
        })
        this.listSuportMenuCheckbox = []
        this.$store.dispatch('GetListServicesConfiguration', this.$store.getters.getRoutersInfo.userAccountId).then((response) => {
        })
      })
    },
    reset() {
      this.dialogVisible = false
      const paramsPayload = {
        account_id: this.listNotAllowServices.account_id,
        not_allow_campaign_services: [],
        not_allow_report_services: [],
        not_allow_menu_services: []
      }
      this.showLoading()
      this.$store.dispatch('user/SaveListServicesConfiguration', paramsPayload).then((response) => {
        this.$message.success({
          message: this.$t(`serviceManage.saveSuccess`)
        })
        this.listSuportMenuCheckbox = []
        this.$store.dispatch('GetListServicesConfiguration', this.$store.getters.getRoutersInfo.userAccountId).then((response) => {
        })
      })
    },
    showLoading() {
      if (this.loading !== null) {
        return
      }
      this.loading = this.$loading({
        lock: true,
        text: this.$t('memberAccount.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    hideLoading() {
      if (this.loading === null) {
        return
      }
      this.loading.close()
      this.loading = null
    }
  }
}

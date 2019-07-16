import set from 'lodash/set'
import { isValidURL } from '@/utils/creative'
import { buildCampaignFormData } from '@/common/createCampaignHelper'
import { targetingTypeList } from '../campaignConfig.json'
import AdGroupName from './components/AdGroupName'
import CampaignName from './components/CampaignName'
import TargetingGoalAndType from './components/TargetingGoalAndType'
import LandingUrl from './components/landing-url/LandingUrl'
import PremiumCampaign from './components/PremiumCampaign'
import Location from './components/location/Location'
import Device from './components/Device'
import Language from './components/Language'
import Budget from './components/Budget'
import BidDetail from './components/BidDetail'
import TargetGroupControlA from './components/TargetGroupControlA'
import TargetGroupControlB from './components/TargetGroupControlB'
import TargetConversionType from './components/TargetConversionType'
import ProbabilityOfPurchase from './components/ProbabilityOfPurchase'
import AutomaticallyOptimizeConversion from './components/AutomaticallyOptimizeConversion'
import LeadTargetingRange from './components/LeadTargetingRange'
import UserInterestDirectory from './components/UserInterestDirectory'
import ArticleTopicDirectory from './components/ArticleTopicDirectory'
import KeywordList from './components/KeywordList'
import Demographic from './components/Demographic'
import { mapState } from 'vuex'
import permissionCampaign from '@/directive/permission-campaign'
import Schedule from './components/Schedule'
import FixedDate from './components/FixedDate'
import ProductFiltering from './components/product-filtering/ProductFiltering'
import BehaviorOfVisit from './components/BehaviorOfVisit'
import AdvertisingPosition from './components/AdvertisingPosition'
import CustomUserGroup from './components/CustomUserGroup'
import ForecastOfConversion from './components/ForecastOfConversion'
import FeedCategoryBaseUserTargeting from './components/FeedCategoryBaseUserTargeting'
import Browser from './components/Browser'
import IPAddress from './components/IPAddress'
import OS from './components/OS'
import Carrier from './components/Carrier'
import ManufactureBrand from './components/ManufactureBrand'
import ImpressionCapping from './components/ImpressionCapping'

export default {
  components: {
    TargetingGoalAndType,
    AdGroupName,
    CampaignName,
    LandingUrl,
    PremiumCampaign,
    Location,
    Device,
    Language,
    Budget,
    BidDetail,

    TargetGroupControlA,
    TargetGroupControlB,
    TargetConversionType,

    ProbabilityOfPurchase,
    AutomaticallyOptimizeConversion,
    LeadTargetingRange,
    UserInterestDirectory,
    ArticleTopicDirectory,
    KeywordList,
    /* Ad delivery restriction setting */
    Demographic,
    BehaviorOfVisit,
    AdvertisingPosition,
    CustomUserGroup,
    ForecastOfConversion,
    FeedCategoryBaseUserTargeting,
    ImpressionCapping,
    Browser,
    IPAddress,
    OS,
    Carrier,
    ManufactureBrand,
    ProductFiltering,
    Schedule,
    FixedDate
  },
  directives: { permissionCampaign },
  data() {
    return {
      targetingTypeList,
      activeExpandCard: ['target_goal'],
      accountInfo: {},
      rules: {
        campaign_group: {
          campaign_group_id: [
            { required: true, message: this.$t('createCampaign.stepCreateCampaign.adGroupName.errorSelect'), trigger: 'change' }
          ],
          campaign_group_name: [
            { required: true, message: this.$t('createCampaign.stepCreateCampaign.adGroupName.error'), trigger: 'blur' },
            { validator: this.validateAdGroupNameExist, trigger: 'blur' }
          ]
        },
        campaign_name: [
          { required: true, message: this.$t('createCampaign.stepCreateCampaign.campaignName.error'), trigger: 'blur' }
        ],
        landingUrl: {
          url: [
            { required: true, message: this.$t('createCampaign.stepCreateCampaign.landingUrl.error'), trigger: 'blur' },
            { validator: this.validateUrl, trigger: 'blur' }
          ]
        },
        bidDetails: {
          valueType: [
            { required: true, message: this.$t('createCampaign.stepCreateCampaign.bidDetail.error'), trigger: 'blur' }
          ]
        },
        campaign_budget: {
          budget_count: [
            { required: true, message: this.$t('createCampaign.stepCreateCampaign.budget.error'), trigger: 'blur' },
            { validator: this.validateBudget, trigger: 'blur' }
          ]
        },
        campaign_device_id: [
          { required: true, message: this.$t('createCampaign.stepCreateCampaign.device.error'), trigger: 'change' }
        ],
        targetConversionType: {
          segmentSelected: [
            { type: 'array', required: true, message: this.$t('createCampaign.stepCreateCampaign.targetConversionType.errorConversionSegment'), trigger: 'change' }
          ],
          typeSelected: [
            { type: 'array', required: true, message: this.$t('createCampaign.stepCreateCampaign.targetConversionType.errorConversionType'), trigger: 'change' }
          ]
        }
      }
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'dataMatCreatives', 'listAdGroup']),
    activeBtnNext() {
      return true
    }
  },
  created() {
    this.$store.dispatch('campaign/getRevenueRange')
    if (!this.dataCreateCampaign.c_type) this.$router.replace('/campaign/create-campaign/select-campaign-objectives')

    this.$store.dispatch('user/getAccountInformationInClientManage')
      .then((response) => {
        this.accountInfo = response
      })
      .catch((error) => {
        const message = error.hasOwnProperty('message') ? error.message : error.error_description
        if (message.includes('timeout')) {
          this.$message.error(this.$t(`client.messageFromApi.timeout`))
        } else {
          this.$message.error(this.$t(`client.messageFromApi.${message}`))
        }
      })
  },
  methods: {
    updateRules(path, rule) {
      set(this.rules, path, rule)
    },
    onNext() {
      buildCampaignFormData(this.dataCreateCampaign)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$message.success({
            message: 'submit'
          })
          // TO DO: uncomment this command to go to step 3 after finish developing step 2
          // this.$store.dispatch('campaign/createCampaign')
        } else {
          this.$message.error({
            message: 'err submit'
          })
          return false
        }
      })
    },
    onCancel() {

    },
    validateUrl(rule, value, callback) {
      if (value === '') {
        return callback()
      }
      if (!isValidURL(value)) {
        const message = this.$t('createCampaign.stepCreateCampaign.landingUrl.urlFormatError')
        return callback(new Error(message))
      }
      callback()
    },
    validateBudget(rule, value, callback) {
      const parsedValue = parseInt(value)
      if (parsedValue === 0) {
        const message = this.$t('createCampaign.stepCreateCampaign.budget.zeroError')
        return callback(new Error(message))
      }
      if (parsedValue < parseInt(this.dataCreateCampaign.bid_detail.bid)) {
        const message = this.$t('createCampaign.stepCreateCampaign.budget.priceConflictError')
        return callback(new Error(message))
      }
      callback()
    },
    validateAdGroupNameExist(rule, value, callback) {
      if (this.listAdGroup.find(group => group.campaign_group_name === value)) {
        const message = this.$t('createCampaign.stepCreateCampaign.adGroupName.errorAlreadyExist')
        return callback(new Error(message))
      }
      callback()
    }
  }
}

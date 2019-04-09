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

import { CampaignManagementConstants } from '@/common/constants'

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
      activeExpandCard: [3],
      adDeliveryExpandCard: [1]
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    activeBtnNext() {
      return true
    }
  },
  created() {
    if (!this.dataCreateCampaign.targetingType) this.$router.replace('/campaign/create-campaign/select-campaign-objectives')
  },
  methods: {
    onNext() {
      this.$store.dispatch('campaign/nextStep', CampaignManagementConstants.STEP_MATCH_CREATIVES)
    },
    onCancel() {

    }
  }
}

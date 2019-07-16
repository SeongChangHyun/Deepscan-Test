<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('desc')">
    <el-row :gutter="20" class="h-mg-t-10 container-table">
      <el-col :span="12">
        <div class="content">
          <p class="header">{{ genI18n('conversionSegment') }}</p>
          <el-form-item prop="targetConversionType.segmentSelected">
            <el-checkbox-group
              v-model="targetConversionType.segmentSelected"
              prop="targetConversionType.segmentSelected"
            >
              <el-checkbox
                v-for="item in conversionSegmentList"
                :key="item.value"
                :label="item.value"
              >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="content">
          <p class="header">{{ genI18n('conversionType') }}</p>
          <el-form-item prop="targetConversionType.typeSelected">
            <el-checkbox-group
              v-model="targetConversionType.typeSelected"
              prop="targetConversionType.typeSelected"
            >
              <!-- dynamic -->
              <el-checkbox
                v-for="item in listTrackingConversions"
                :key="item.tracking_tag_id"
                :label="`${item.tracking_tag_id}`"
              >{{ item.custom_tag_name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'

export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      conversionSegmentList:
        CampaignManagementConstants.TARGET_CONVERSION_TYPE.conversionSegment,
      conversionTypeList:
        CampaignManagementConstants.TARGET_CONVERSION_TYPE.conversionType,
      listTrackingConversions: []
    }
  },
  computed: {
    ...mapState('campaign', [
      'dataCreateCampaign',
      'errorCampaign',
      'listTrackingConversationType'
    ]),
    ...mapGetters([
      'user'
    ]),
    targetConversionType() {
      return this.dataCreateCampaign.targetConversionType
    },
    showErr() {
      return this.errorCampaign.targetConversionType
    }
  },
  watch: {
    listTrackingConversationType() {
      const defaultOptions = [
        {
          tracking_tag_id: 'J',
          custom_tag_name: this.genI18n('join')
        },
        {
          tracking_tag_id: 'P',
          custom_tag_name: this.genI18n('purchaseComplete')
        }
      ]
      this.listTrackingConversions = [...defaultOptions, ...this.listTrackingConversationType]
    }
  },
  created() {
    this.$store.dispatch(
      'campaign/loadListTrackingConversationType',
      'CONVERSION'
    )
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.targetConversionType.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 10px 0;
  .h-title {
    margin-top: 0px;
  }
  .fl-1 {
    flex: 1;
  }
  .container-table {
    .header {
      margin: 0;
      background-color: #e8ebee;
      padding: 5px 0 5px 10px;
      font-size: 14px;
    }
    .content {
      border: 1px solid #ddd;
      .header{
        font-weight: 600;
      }
      .el-checkbox-group {
        padding: 10px;
        padding-bottom: 6px;
        .el-checkbox {
          margin-left: 0;
          width: 100%;
        }
      }
      /deep/ .el-form-item--medium .el-form-item__content {
        line-height: 20px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
   .group-description {
     display: none;
   }
   .conversion-segment {
     margin-bottom: 10px;
   }
}
</style>


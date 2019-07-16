<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-radio-group v-model="automaticallyOptimizeConversion.value">
        <el-radio :label="TypeConversion.CONVERSION" class="h-pd-t-5">{{ genI18n('conversion') }}</el-radio>
        <el-checkbox-group v-model="automaticallyOptimizeConversion.conversionCustom" class="group-checkbox">
          <el-checkbox
            v-for="item in listTrackingConversions"
            :key="item.custom_value_name"
            :label="item.tracking_tag_id"
            :disabled="automaticallyOptimizeConversion.value !== TypeConversion.CONVERSION"
          >{{ item.custom_tag_name }}</el-checkbox>
        </el-checkbox-group>

        <br>
        <el-radio
          :label="TypeConversion.CONVERSION_OF_NEW_VISITOR"
          class="h-pd-t-5"
        >{{ genI18n('conversionOfNewVisitor') }}</el-radio>
        <br>
        <el-radio
          :label="TypeConversion.LONG_TERM_DORMANT"
          class="h-pd-t-5"
        >{{ genI18n('longTermDormant') }}</el-radio>
      </el-radio-group>
    </el-col>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import { AutomaticallyOptimizeConversion } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      TypeConversion: AutomaticallyOptimizeConversion,
      listTrackingConversions: []
    }
  },
  computed: {
    ...mapState('campaign', [
      'dataCreateCampaign',
      'listTrackingConversationType'
    ]),
    automaticallyOptimizeConversion() {
      return this.dataCreateCampaign.automaticallyOptimizeConversion
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
        `createCampaign.stepCreateCampaign.automaticallyOptimizeConversion.${params}`
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
  .group-checkbox {
    padding: 0 20px;
    .el-checkbox {
      margin-left: 0;
      margin-right: 20px;
    }
  }
}
</style>


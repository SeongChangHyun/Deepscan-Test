<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="w-100 h-mg-t-10">
        <allow-and-block
          :lang-key="langKey"
          :verify-data="verifyKeyword"
          @on-change="onChange"
        />
      </div>
    </el-col>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import uniqBy from 'lodash/uniqBy'
import AllowAndBlock from './allow-and-block'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
import apiServices from '@/app/services/keywordApiService'
// Init api services
const KeywordApiService = apiServices.build()

export default {
  name: 'KeywordList',
  components: {
    AllowAndBlock,
    HeaderItemCreateCampaign
  },
  data() {
    return {
      langKey: 'keywordList'
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.${this.langKey} .${params}`
      )
    },
    onChange(type, list) {
      const convertedList = list.map(item => {
        return {
          status: type,
          keyword: item.name
        }
      })
      this.dataCreateCampaign.keywords = uniqBy([...this.dataCreateCampaign.keywords, ...convertedList], item => {
        return item.keyword
      })
    },
    verifyKeyword: function(value, type) {
      return KeywordApiService.verifyKeywords(value)
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
  /deep/ .el-card__header {
    padding: 10px;
    background-color: #e8ebee;
  }
  .container-table {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    padding: 20px;
    .header {
      margin: 0;
      text-align: center;
    }
    .line {
      width: 1px;
      align-self: stretch;
      background: #ddd;
      margin: 15px 0;
    }
    .content {
      padding: 10px;
      display: flex;
      flex-direction: column;
      flex: 1;
      .list {
        flex: 1;
        padding: 15px 0;
      }
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 3px 0;
        .total {
          margin: 0 10px;
        }
      }
      .item.footer-input {
        .input {
          margin: 0 10px 0 0;
        }
      }
    }
  }
}
</style>


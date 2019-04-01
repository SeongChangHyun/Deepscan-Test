<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <div>
        <span> {{ genI18n('description') }}</span>
      </div>
      <div class="w-100 h-mg-t-10">
        <allow-and-block :lang-key="'keywordList'"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import AllowAndBlock from './allow-and-block'
export default {
  name: 'KeywordList',
  components: {
    'allow-and-block': AllowAndBlock
  },
  data() {
    return {
      langKey: 'keywordList'
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.${this.langKey} .${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 20px 0;
  .h-title {
    margin-top: 0px;
  }
  .fl-1 {
    flex: 1;
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


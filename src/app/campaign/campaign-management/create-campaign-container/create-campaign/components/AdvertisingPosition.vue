<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <div class="w-100 h-mg-t-10">
      <allow-and-block
        :lang-key="langKey"
        :verify-data="verifyPosition"
        @on-change="onChangeData"
      />
    </div>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import uniqBy from 'lodash/uniqBy'
import moment from 'moment'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
import AllowAndBlock from './allow-and-block'

export default {
  components: {
    HeaderItemCreateCampaign,
    AllowAndBlock
  },
  data() {
    return {
      langKey: 'advertisingPosition'
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.advertisingPosition.${params}`
      )
    },
    onChangeData(type, list) {
      const convertedList = list.map(item => {
        return {
          status: type,
          position_date: item.stat_result,
          position_name: item.name
        }
      })
      this.dataCreateCampaign.advertising_position = uniqBy([...this.dataCreateCampaign.advertising_position, ...convertedList], item => {
        return item.position_name
      })
    },
    verifyPosition: function(value) {
      return Promise.resolve({
        target_keywords: value.map(item => {
          return {
            keyword: item,
            stat_count: moment().format('YY/MM/DD')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 5px 0;
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 15px;
  }
  .fl-1 {
    flex: 1;
  }
  .container-table {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
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
  .box-header-title {
    font-weight: 600;
    color: #323a46;
    font-size: 14px;
    padding-left: 0;
  }
  .allow-row {
    flex: 1;
    display: flex;
  }
  .allowName {
    flex: 2;
  }
  .allowDate {
    flex: 1;
    text-align: right;
  }
}
.el-card {
  border-bottom: none;
  border-radius: 0;
  .close-btn {
    float: right;
    text-align: right;
    font-size: 14px;
    color: #bac0c7;
    font-weight: 500;
    &:hover {
      color: #f20808;
    }
  }
}
.allowIconDelete {
  align-self: center;
  align-items: flex-end;
}
.box-footer {
  margin: 0;
  padding: 0;
  border: 1px solid #dee3e9;
  border-top-color: #e5e9ec;
  input {
    border: none;
  }
  button {
    border-radius: 0;
    width: 100%;
    height: 33px;
    background-color: #1d93cf;
    border: none;
    &.upload-btn {
      padding: 9px 4px;
    }
  }
  .alternative-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 20px;
      line-height: 20px;
      display: block;
      margin-top: 6px;
      color: #bbb;
      cursor: pointer;
    }
  }
  .footerRow {
    flex: 1;
    display: flex;
    height: 33px;
  }
  .footerCol1 {
    flex: 4;
    /deep/ .el-input {
      input {
        border: none;
        height: 33px;
      }
    }
  }
  .footerCol2 {
    flex: 1;
  }
  .footerCol3 {
    flex: 1;
    height: 28px;
  }
  .inputText {
    height: 33px;
  }
}
</style>

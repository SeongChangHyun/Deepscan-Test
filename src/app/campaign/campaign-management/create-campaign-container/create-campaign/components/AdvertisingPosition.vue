<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
          {{ genI18n('title') }}
        </td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ genI18n('description') }}
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'" type="default" class="border-0 p-1 expand-btn" @click="showContent=!showContent"/>
        </td>
      </tr>
    </table>
    <div
      :class="{ 'show': showContent }"
      class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height"
    >
      <div v-show="showContent" class="content-fields h-form-input w-100 ">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <div class="w-100 container-table">
              <div class="fl-1 content">
                <p class="header">{{ genI18n('allowPosition') }}</p>

                <div class="item header-action">
                  <span class="lable fl-1">2 {{ genI18n('position') }}</span>
                  <el-button type="danger" size="mini">{{ genI18n('deleteAll') }}</el-button>
                </div>

                <div class="list">
                  <div class="item">
                    <span class="lable fl-1">{{ genI18n('currency') }}</span>
                    <span class="total">50,000</span>
                    <el-button type="danger" size="mini">{{ genI18n('delete') }}</el-button>
                  </div>

                  <div class="item">
                    <span class="lable fl-1">{{ genI18n('currency') }}</span>
                    <span class="total">50,000</span>
                    <el-button type="danger" size="mini">{{ genI18n('delete') }}</el-button>
                  </div>
                </div>

                <div class="item footer-input">
                  <input class="input fl-1" type="text">
                  <button class="btn btn-enter">{{ genI18n('enter') }}</button>
                </div>
              </div>

              <div class="line"/>

              <div class="fl-1 content">
                <p class="header">{{ genI18n('blockPosition') }}</p>
                <!-- fixed -->

                <div class="item header-action">
                  <span class="lable fl-1">0 {{ genI18n('position') }}</span>
                  <el-button type="danger" size="mini">{{ genI18n('deleteAll') }}</el-button>
                </div>

                <div class="list"/>

                <div class="item footer-input">
                  <input class="input fl-1" type="text">
                  <button class="btn btn-enter">{{ genI18n('enter') }}</button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.advertisingPosition.${params}`
      )
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
}
</style>

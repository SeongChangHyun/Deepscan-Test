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
          <el-button
            :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
            type="default"
            class="border-0 p-1 expand-btn"
            @click="showContent=!showContent" />
        </td>
      </tr>
    </table>
    <div :class="{ 'show': showContent }" class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height">
      <div v-show="showContent" class="content-fields h-form-input w-100">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="12" class="allow-ip-address">
                <p>{{ genI18n('allowIpAddress') }}</p>
                <div class="block-checkbox">
                  <el-row class="text-right">
                    <div class="item header-action">
                      <el-button-group>
                        <el-button type="danger" size="mini" @click="deleteAllIpAddress('allow')">
                          {{ genI18n('deleteAll') }}</el-button>
                        <el-button type="danger" size="mini">{{ genI18n('copy') }}</el-button>
                      </el-button-group>
                    </div>

                    <div class="list-ip-address">
                      <div v-for="(item, index) in allowIpAddressList" :key="index" class="list">
                        <div class="item">
                          <span class="total">{{ item }}</span>
                          <el-button type="danger" size="mini" @click="deleteIpAddress('allow', index)">
                            {{ genI18n('delete') }}</el-button>
                        </div>
                      </div>
                    </div>

                    <div class="item footer-input">
                      <el-row>
                        <el-col :span="12" class="text-right">
                          <input v-model="allowIpAddress" class="input fl-1" type="text">
                        </el-col>
                        <el-col :span="12">
                          <el-button-group>
                            <el-button type="danger" size="mini" @click="addIpAddress('allow')">{{ genI18n('enter') }}
                            </el-button>
                            <el-button type="danger" size="mini">{{ genI18n('upload') }}</el-button>
                          </el-button-group>
                        </el-col>
                      </el-row>
                    </div>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12" class="block-ip-address">
                <p>{{ genI18n('blockIpAddress') }}</p>
                <div class="block-checkbox">
                  <el-row class="text-right">
                    <div class="item header-action">
                      <el-button-group>
                        <el-button type="danger" size="mini" @click="deleteAllIpAddress()">{{ genI18n('deleteAll') }}
                        </el-button>
                        <el-button type="danger" size="mini">{{ genI18n('copy') }}</el-button>
                      </el-button-group>
                    </div>

                    <div class="list-ip-address">
                      <div v-for="(item, index) in blockIpAddressList" :key="index" class="list">
                        <div class="item">
                          <span class="total">{{ item }}</span>
                          <el-button type="danger" size="mini" @click="deleteIpAddress(index)">{{ genI18n('delete') }}
                          </el-button>
                        </div>
                      </div>
                    </div>

                    <div class="item footer-input">
                      <el-row>
                        <el-col :span="12">
                          <input v-model="blockIpAddress" class="input fl-1" type="text">
                        </el-col>
                        <el-col :span="12">
                          <el-button-group>
                            <el-button type="danger" size="mini" @click="addIpAddress()">{{ genI18n('enter') }}
                            </el-button>
                            <el-button type="danger" size="mini">{{ genI18n('upload') }}</el-button>
                          </el-button-group>
                        </el-col>
                      </el-row>
                    </div>
                  </el-row>
                </div>
              </el-col>
            </el-row>
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
      showContent: false,
      allowIpAddress: '',
      blockIpAddress: '',
      allowIpAddressList: [],
      blockIpAddressList: []
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.ipAddress.${params}`)
    },
    addIpAddress(type = 'block') {
      if (type === 'allow') {
        this.allowIpAddressList.push(this.allowIpAddress)
        return
      }
      this.blockIpAddressList.push(this.blockIpAddress)
    },
    deleteIpAddress(type = 'block', index) {
      if (type === 'allow') {
        this.allowIpAddressList.splice(index, 1)
        return
      }
      this.blockIpAddressList.splice(index, 1)
    },
    deleteAllIpAddress(type = 'block') {
      if (type === 'allow') {
        this.allowIpAddressList = []
        return
      }
      this.blockIpAddressList = []
    }
  }
}
</script>

<style lang="scss" scoped>
  .h-form-input {
    border-bottom: 1px dotted #ddd;
  }

  .allow-ip-address {
    padding-right: 5px;
  }

  .block-ip-address {
    padding-left: 5px;
  }

  .block-checkbox {
    padding: 10px;
    border: 1px solid #cccccc;
  }

  .text-right {
    text-align: right;
  }
</style>

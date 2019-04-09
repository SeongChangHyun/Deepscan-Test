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
      <div v-show="showContent" class="content-fields h-form-input">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="12" class="allow-os">
                <p>{{ genI18n('allowOs') }}</p>
                <div class="block-checkbox">
                  <el-row v-for="device in listDevice" :key="device.id" class="margin-bottom-10">
                    <el-col :span="24">
                      <el-checkbox :label="device.name" v-model="device.isCheck">{{ $t(device.name) }}</el-checkbox>
                      <el-select :default-first-option="true" class="with-55" value="1" size="mini">
                        <el-option v-for="item in device.osVersion" :label="item.name" :value="item.code" :key="item.code" />
                      </el-select>
                      <el-select :default-first-option="true" class="with-55" value="1" size="mini">
                        <el-option v-for="item in device.osVersion" :label="item.name" :value="item.code" :key="item.code" />
                      </el-select>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12" class="block-os">
                <p>{{ genI18n('blockOs') }}</p>
                <div class="block-checkbox">
                  <el-row v-for="device in listDevice" :key="device.id" class="margin-bottom-10">
                    <el-col :span="24">
                      <el-checkbox :label="device.name" :disabled="device.isCheck">{{ $t(device.name) }}</el-checkbox>
                      <el-select :default-first-option="true" class="with-55" value="1" size="mini">
                        <el-option v-for="item in device.osVersion" :label="item.name" :value="item.code" :key="item.code" />
                      </el-select>
                      <el-select :default-first-option="true" class="with-55" value="1" size="mini">
                        <el-option v-for="item in device.osVersion" :label="item.name" :value="item.code" :key="item.code" />
                      </el-select>
                    </el-col>
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
import { CampaignManagementConstants } from '@/common/constants'

export default {
  data() {
    return {
      showContent: false,
      listDevice: CampaignManagementConstants.OS.OS_TYPE
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.os.${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .h-form-input {
    border-bottom: 1px dotted #ddd;
  }

  .allow-os {
    padding-right: 5px;
  }

  .block-os {
    padding-left: 5px;
  }

  .block-checkbox {
    padding: 10px;
    border: 1px solid #cccccc;
  }

  .text-right {
    text-align: right;
  }
  .margin-bottom-10 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
</style>

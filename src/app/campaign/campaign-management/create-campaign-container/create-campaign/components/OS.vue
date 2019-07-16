<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-row>
      <el-col :span="24" class="h-form-input">
        <el-row>
          <el-col :xs="24" :sm="12" class="allow-os">
            <div class="block-checkbox-wrap">
              <el-row class="allow-title">
                <span class="fw-bold">{{ genI18n('allowOs') }}</span>
              </el-row>
              <el-row v-for="device in listOS" :key="device.os_code" class="block-checkbox">
                <el-col :span="24" class="flex-1">
                  <el-checkbox
                    :label="device.os_name"
                    :value="getValueEnable(device.os_code)"
                    :disabled="getValueDisable(device.os_code) && getValueVersion(device.os_code, 'osDisables', 'to_version') === 0 && getValueVersion(device.os_code, 'osDisables', 'from_version') === 1"
                    class="device-name"
                    @change="(val)=>onEnableOS(device,val)"
                  >{{ device.os_name }}</el-checkbox>

                  <el-select
                    :default-first-option="true"
                    :disabled="!getValueEnable(device.os_code)"
                    :value="getValueVersion(device.os_code, 'osEnables', 'from_version')"
                    class="colFrom"
                    size="mini"
                    @change="(val)=>changeValueVersion(device.os_code, 'osEnables', 'from_version', val)"
                  >
                    <el-option
                      v-for="item in device.os_version"
                      v-show="item.version_weight !=0 && (getValueVersion(device.os_code, 'osEnables', 'to_version') === 0 || item.version_weight < getValueVersion(device.os_code, 'osEnables', 'to_version'))"
                      :label="item.version_name"
                      :value="item.version_weight"
                      :key="item.os_id"
                    />
                  </el-select>

                  <span class="colTilde">~</span>
                  <el-select
                    :default-first-option="true"
                    :disabled="!getValueEnable(device.os_code)"
                    :value="getValueVersion(device.os_code, 'osEnables', 'to_version')"
                    class="colTo"
                    size="mini"
                    @change="(val)=>changeValueVersion(device.os_code, 'osEnables', 'to_version', val)"
                  >
                    <el-option
                      v-for="item in device.os_version"
                      v-show="item.version_weight === 0 || item.version_weight > getValueVersion(device.os_code, 'osEnables', 'from_version') "
                      :label="item.version_name"
                      :value="item.version_weight"
                      :key="item.os_id"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" class="block-os">
            <div class="block-checkbox-wrap">
              <el-row class="allow-title">
                <span class="fw-bold">{{ genI18n('blockOs') }}</span>
              </el-row>
              <el-row v-for="device in listOS" :key="device.os_code" class="block-checkbox">
                <el-col :span="24" class="flex-1">
                  <el-checkbox
                    :label="device.os_name"
                    :disabled="getValueEnable(device.os_code) && getValueVersion(device.os_code, 'osEnables', 'to_version') === 0 && getValueVersion(device.os_code, 'osEnables', 'from_version') === 1"
                    :value="getValueDisable(device.os_code)"
                    class="device-name"
                    @change="(val)=>onDisableOS(device,val)"
                  >{{ device.os_name }}</el-checkbox>

                  <el-select
                    :disabled="!getValueDisable(device.os_code)"
                    :value="getValueVersion(device.os_code, 'osDisables', 'from_version')"
                    class="colFrom"
                    size="mini"
                    @change="(val)=>changeValueVersion(device.os_code, 'osDisables', 'from_version', val)"
                  >
                    <el-option
                      v-for="item in device.os_version"
                      v-show="item.version_weight !=0 &&( getValueVersion(device.os_code, 'osDisables', 'to_version') === 0 || item.version_weight < getValueVersion(device.os_code, 'osDisables', 'to_version')) "
                      :label="item.version_name"
                      :value="item.version_weight"
                      :key="item.os_id"
                    />
                  </el-select>

                  <span class="colTilde">~</span>
                  <el-select
                    :disabled="!getValueDisable(device.os_code)"
                    :value="getValueVersion(device.os_code, 'osDisables', 'to_version')"
                    class="colTo"
                    size="mini"
                    @change="(val)=>changeValueVersion(device.os_code, 'osDisables', 'to_version', val)"
                  >
                    <el-option
                      v-for="item in device.os_version"
                      v-show="item.version_weight === 0 || item.version_weight > getValueVersion(device.os_code, 'osDisables', 'from_version') "
                      :label="item.version_name"
                      :value="item.version_weight"
                      :key="item.os_id"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import uniqBy from 'lodash/uniqBy'
import { mapState } from 'vuex'
import { findIndex } from 'lodash'
import { CampaignManagementConstants } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      listDevice: CampaignManagementConstants.OS.OS_TYPE,
      osEnables: [],
      osDisables: []
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listOS'])
  },
  watch: {
    osEnables: {
      handler: function(val) {
        this.buildFormData(CampaignManagementConstants.VERIFY_TYPE.ALLOW.toUpperCase(), val)
      },
      deep: true
    },
    osDisables: {
      handler: function(val) {
        this.buildFormData(CampaignManagementConstants.VERIFY_TYPE.BLOCK.toUpperCase(), val)
      },
      deep: true
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListOS')
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.os.${params}`)
    },
    buildFormData(type, list) {
      const convertedList = list.map(item => {
        return {
          status: type,
          os_version: [item.from_version, item.to_version],
          os_code: item.os_code
        }
      })
      this.dataCreateCampaign.os = uniqBy([...this.dataCreateCampaign.os, ...convertedList], item => {
        return item.os_code
      })
    },
    onEnableOS(item, value) {
      if (value) {
        this.osEnables.push({ ...item, from_version: 1, to_version: 0 })
      } else {
        const id = item.os_code
        const index = findIndex(this.osEnables, o => o.os_code === id)
        this.osEnables.splice(index, 1)
      }
    },
    onDisableOS(item, value) {
      if (value) {
        this.osDisables.push({ ...item, from_version: 1, to_version: 0 })
      } else {
        const id = item.os_code
        const index = findIndex(this.osDisables, o => o.os_code === id)
        this.osDisables.splice(index, 1)
      }
    },
    getValueEnable(id) {
      return findIndex(this.osEnables, o => o.os_code === id) >= 0
    },
    getValueDisable(id) {
      return findIndex(this.osDisables, o => o.os_code === id) >= 0
    },
    getValueVersion(id, target, type) {
      const index = findIndex(this[target], o => o.os_code === id)
      if (index >= 0) return this[target][index][type]
      return type === 'from_version' ? 1 : 0
    },
    changeValueVersion(id, target, type, val) {
      const index = findIndex(this[target], o => o.os_code === id)
      this[target][index][type] = val
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
  border: 1px solid #e8ebee;
}

.text-right {
  text-align: right;
}
.margin-bottom-10 {
  margin-bottom: 5px;
  margin-top: 5px;
}
.block-checkbox-wrap {
  border: 1px solid #e8ebee;
}
.block-checkbox {
  padding: 10px;
}
.flex-1 {
  flex: 1;
  display: flex;
}
.device-name {
  flex: 2;
}
.colFrom {
  flex: 1;
}
.colTilde {
  flex: 1;
  text-align: center;
}
.colTo {
  flex: 1;
}
.allow-title {
  background-color: #e8ebee;
  width: 100%;
  height: 40px;
  border-block-end: 1px solid #cccccc;
  align-items: center;
  padding: 10px;
}
.fw-bold {
  font-weight: 600;
}
@media only screen and (max-width: 768px) {
  .block-os {
    margin-top: 10px;
    padding-left: 0;
  }
  /deep/.el-select .el-input__inner {
    padding-right: 15px !important ;
    padding-left: 10px !important ;
  }
}
</style>

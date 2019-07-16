<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="dataCreateCampaign.behavior_site_visit.radio">
          <el-radio
            :label="BEHAVIOR_TYPE.ALL"
            class="h-pd-t-5 w-100"
          >{{ genI18n('defaultBehaviorSelect') }}</el-radio>
          <el-radio
            :label="BEHAVIOR_TYPE.SINGLE"
            class="h-pd-t-5 w-100"
          >{{ genI18n('relativeBehaviorSelect') }}</el-radio>
        </el-radio-group>

        <el-select v-if="dataCreateCampaign.behavior_site_visit.radio === BEHAVIOR_TYPE.SINGLE" v-model="dataCreateCampaign.behavior_site_visit.window" :default-first-option="true" class="h-pd-t-5 w-100" value="6h">
          <el-option
            v-for="item in TIME_LIST"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>

        <div class="w-100 container-tree h-mg-t-10">
          <el-tree
            ref="BehaviorOfVisitDirTree"
            :data="data"
            :expand-on-click-node="false"
            node-key="id"
            icon-class="el-icon-plus"
            default-expand-all
            class="w-100 target-exclude-tree"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node button-group nodeRow">
              <span class="nodeLabel">{{ node.label }}</span>
              <span v-if="!!data.total" class="nodeTotal">{{ data.total }}</span>
              <span class="nodeStatus">
                <span v-if="data.status === targetingType.DEFAULT" class>
                  <span class="target" @click="()=>onTarget(data)">{{ genI18n('target') }}</span>
                  {{ ' | ' }}
                  <span
                    class="exclude"
                    @click="()=>onExclude(data)"
                  >{{ genI18n('exclude') }}</span>
                </span>
                <span
                  v-else-if="data.status === targetingType.TARGETED"
                  class="targeted"
                >{{ genI18n('targeted') }}</span>
                <span
                  v-else-if="data.status === targetingType.EXCLUDED"
                  class="excluded"
                >{{ genI18n('excluded') }}</span>
                <span v-else>{{ ' ' }}</span>
              </span>
            </span>
          </el-tree>
        </div>

        <div class="w-100 container-table">
          <div class="fl-1 content">
            <div class="header">
              <span class="header-title">{{ `${genI18n('allow')} ${genI18n('itemName')} (${allowedCount})` }}</span>
              <a
                class="delete-all"
                href="#"
                @click="deleteAllItem(targetingType.TARGETED)"
              >{{ genI18n('deleteAll') }}</a>
            </div>

            <el-tree
              ref="treeDataSelect"
              :data="allowData"
              :expand-on-click-node="false"
              node-key="id"
              icon-class="el-icon-plus"
              default-expand-all
              class="target-exclude-tree"
            >
              <span slot-scope="{ node, data }" class="allow-row">
                <span class="allow-label">{{ node.label }}</span>
                <span v-if="!!data.total" class="allow-total">{{ data.total }}</span>
                <span class="allowIcon">
                  <svg-icon
                    v-if="typeof data.status !== 'undefined' && data.status !== targetingType.DEFAULT"
                    icon-class="close-button"
                    class="close-btn"
                    @click="deleteItem({node, data})"
                  />
                </span>
              </span>
            </el-tree>
          </div>

          <div class="block-break"/>

          <div class="fl-1 content">
            <div class="header">
              <span class="header-title">{{ `${genI18n('block')} ${genI18n('itemName')} (${blockedCount})` }}</span>
              <a
                class="delete-all"
                href="#"
                @click="deleteAllItem(targetingType.EXCLUDED)"
              >{{ genI18n('deleteAll') }}</a>
            </div>
            <el-tree
              :data="blockData"
              :expand-on-click-node="false"
              node-key="id"
              default-expand-all
            >
              <span slot-scope="{ node, data }" class="allow-row">
                <span class="allow-label">{{ node.label }}</span>
                <span v-if="!!data.total" class="allow-total">{{ data.total }}</span>
                <span class="allowIcon">
                  <svg-icon
                    v-if="typeof data.status !== 'undefined' && data.status !== targetingType.DEFAULT"
                    icon-class="close-button"
                    class="close-btn"
                    @click="deleteItem({node, data})"
                  />
                </span>
              </span>
            </el-tree>
          </div>
        </div>
        <p>{{ genI18n('suffixDescription') }}</p>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import { getClientId } from '@/utils/auth'
import { CampaignManagementConstants, TIME_LIST } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      langKey: 'behaviorOfVisit',
      data: [],
      allowedCount: 0,
      blockedCount: 0,
      dataSelected: [],
      targetingType: CampaignManagementConstants.TARGETING_TYPE,
      BEHAVIOR_TYPE: CampaignManagementConstants.BEHAVIOR_TYPE,
      TIME_LIST: TIME_LIST,
      allowData: [],
      blockData: []
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listSiteBehaviors']),
    dataTreeSelected() {
      return this.mapData(this.data, this.dataSelected)
    }
  },
  watch: {
    listSiteBehaviors() {
      this.data = this.listSiteBehaviors.map(item => {
        return {
          id: item.client_id,
          label: item.client_name,
          children: item.tracking_tags.map(tag => {
            return {
              id: tag.tracking_tag_id,
              total: tag.conversion_value,
              label: tag.custom_tag_name,
              status: 0
            }
          })
        }
      })
    },
    allowData: {
      handler: function(val, oldVal) {
        let count = 0
        val.forEach(item => {
          count += item.children.length
        })
        this.allowedCount = count
        this.dataCreateCampaign.behavior_site_visit.allowed = val
      },
      deep: true
    },
    blockData: {
      handler: function(val, oldVal) {
        let count = 0
        val.forEach(item => {
          count += item.children.length
        })
        this.blockedCount = count
        this.dataCreateCampaign.behavior_site_visit.blocked = val
      },
      deep: true
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListSiteBehaviors', {
      client_id: getClientId()
    })
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.${this.langKey}.${params}`
      )
    },
    onTarget(data, node) {
      data.status = this.targetingType.TARGETED
      this.allowData = this.mapData(
        [...this.data],
        this.targetingType.TARGETED
      )
    },
    onExclude(data) {
      data.status = this.targetingType.EXCLUDED
      this.blockData = this.mapData(
        [...this.data],
        this.targetingType.EXCLUDED
      )
    },
    deleteItem({ data, node }) {
      this.data = this.setData(this.data, [node.key])
      this.allowData = this.mapData(
        [...this.data],
        this.targetingType.TARGETED
      )
      this.blockData = this.mapData(
        [...this.data],
        this.targetingType.EXCLUDED
      )
    },
    deleteAllItem(status) {
      this.data = this.setData(this.data, [], status)
      this.allowData = this.mapData(
        [...this.data],
        this.targetingType.TARGETED
      )
      this.blockData = this.mapData(
        [...this.data],
        this.targetingType.EXCLUDED
      )
    },
    mapData(arrayData, status) {
      const arrayTmp = []
      arrayData.map(v => {
        const item = { ...v }
        if (item.status === status || item.children) {
          if (item.children) {
            const children = this.mapData([...item.children], status)
            if (children.length) {
              item.children = children
              arrayTmp.push(item)
            }
          } else if (item.status === status) {
            arrayTmp.push(item)
          }
        }
      })
      return arrayTmp
    },
    setData(data, ids, statusAll = 0) {
      return data.map(item => {
        const status =
          ids.includes(item.id) || item.status === statusAll
            ? this.targetingType.DEFAULT
            : item.status
        item.status = status
        if (item.children) {
          item.children = this.setData(item.children, ids, statusAll)
        }
        return item
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
  .fw-b {
    font-weight: 600;
  }
  .header {
    flex: 1;
    display: flex;
  }
  .header-title {
    font-weight: 600;
    flex: 3;
  }
  .delete-all {
    flex: 1;
    color: #409eff;
    text-align: right;
  }
  .el-radio {
    margin: 0;
    padding-right: 15px;
  }
  .fl-1 {
    flex: 1;
  }
  .nodeRow {
    flex: 1;
    display: flex;
  }
  .nodeLabel {
    flex: 3;
  }
  .nodeTotal {
    flex: 1;
    text-align: right;
  }
  .nodeStatus {
    flex: 2;
    text-align: right;
  }
  .allow-row {
    flex: 1;
    display: flex;
  }
  .allow-label {
    flex: 5;
  }
  .allow-total {
    flex: 3;
    text-align: right;
  }
  .allowIcon {
    flex: 1;
    text-align: right;
    align-self: center;
  }
  .container-tree {
    margin-top: 10px;
    > p {
      margin: 10px 0;
    }
    .el-tree {
      border: 1px solid #ddd;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        .label {
          flex: 2;
        }
        .total {
          flex: 1;
          text-align: right;
        }
        .targeted,
        .target {
          flex: 1;
          color: #6dc0b7;
          text-align: right;
          max-width: 150px;
        }
        .excluded,
        .exclude {
          color: #9e99db;
        }
      }
    }
  }
  .container-table {
    display: flex;
    margin-top: 20px;
    .block-break {
      width: 40px;
      height: 10px;
    }
    .content {
      border: 1px solid #eee;
      align-self: stretch;
      .header {
        margin: 0;
        background-color: #e8ebee;
        padding: 10px 20px;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .container-table   {
    display: block !important;
  }
}
</style>

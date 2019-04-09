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
      <div v-show="showContent" class="content-fields h-form-input target-exclude-container">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <el-radio-group v-model="radio">
              <el-radio class="h-pd-t-5 w-100" label="all">{{ genI18n('defaultBehaviorSelect') }}</el-radio>
              <el-radio class="h-pd-t-5 w-100" label="single">{{ genI18n('relativeBehaviorSelect') }}</el-radio>
            </el-radio-group>

            <el-select :default-first-option="true" class="h-pd-t-5 w-100" value="6h">
              <el-option value="6h" label="6 hours"/>
              <el-option value="12h" label="12 hours"/>
              <el-option value="1d" label="1 day"/>
              <el-option value="2d" label="2 days"/>
              <el-option value="3d" label="3 days"/>
              <el-option value="4d" label="4 days"/>
              <el-option value="5d" label="5 days"/>
              <el-option value="6d" label="6 days"/>
              <el-option value="1w" label="1 week"/>
            </el-select>

            <div class="w-100 container-table h-mg-t-10">
              <el-tree
                ref="BehaviorOfVisitDirTree"
                :data="data"
                :expand-on-click-node="false"
                node-key="id"
                icon-class="el-icon-plus"
                default-expand-all
                class="w-100 target-exclude-tree"
                @check="changeData"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node button-group">
                  <span>{{ node.label }}</span>
                  <span v-if="!!data.total">{{ data.total }}</span>
                  <span>
                    <span v-if="data.status === targetingType.DEFAULT">
                      <span class="target" @click="()=>onTarget(data)" >{{ genI18n('target') }}</span>
                      {{ ' | ' }}
                      <span class="exclude" @click="()=>onExclude(data)">{{ genI18n('exclude') }}</span>
                    </span>
                    <span v-else-if="data.status === targetingType.TARGETED" class="targeted" >{{ genI18n('targeted') }}</span>
                    <span v-else-if="data.status === targetingType.EXCLUDED" class="excluded">{{ genI18n('excluded') }}</span>
                    <span v-else>{{ ' ' }}</span>
                  </span>
                </span>
              </el-tree>
            </div>

            <div class="w-100 container-table">
              <div class="fl-1 content">
                <p class="header">{{ genI18n('allow') }} {{ genI18n('itemName') }}</p>

                <el-tree
                  ref="treeDataSelect"
                  :data="data"
                  :expand-on-click-node="false"
                  node-key="id"
                  icon-class="el-icon-plus"
                  default-expand-all
                  class="target-exclude-tree"
                  @check="changeData"
                >
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span v-if="!!data.total">{{ data.total }}</span>
                    <span>
                      <svg-icon
                        v-if="data.status > targetingType.DEFAULT"
                        icon-class="close-button"
                        class="close-btn"
                        @click="()=>deleteItem({node, data})"
                      />
                    </span>
                  </span>
                </el-tree>
              </div>

              <div class="line"/>

              <div class="fl-1 content">
                <p class="header">{{ genI18n('block') }} {{ genI18n('itemName') }}</p>
                <!-- fixed -->
                <el-tree
                  :data="data"
                  :expand-on-click-node="false"
                  node-key="id"
                  default-expand-all
                  @check="changeData"
                >
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span v-if="!!data.total">{{ data.total }}</span>
                    <span>
                      <svg-icon
                        v-if="data.status > targetingType.DEFAULT"
                        icon-class="close-button"
                        class="close-btn"
                        @click="()=>deleteItem({node, data})"
                      />
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
            <p>{{ genI18n('suffixDescription') }}</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'
export default {
  data() {
    return {
      showContent: false,
      langKey: 'behaviorOfVisit',
      data: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              total: 1000,
              status: 0
            }
          ]
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              total: 500,
              label: 'Level two 2-1',
              status: 0
            },
            {
              id: 6,
              total: 500,
              label: 'Level two 2-2',
              status: 0
            }
          ]
        }
      ],
      dataSelected: [],
      targetingType: CampaignManagementConstants.TARGETING_TYPE,
      radio: 'all'
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    dataTreeSelected() {
      return this.mapData(this.data, this.dataSelected)
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.${this.langKey}.${params}`
      )
    },
    onTarget(data, node) {
      data.status = 1
    },
    onExclude(data) {
      data.status = 2
    },
    changeData() {
      const data = this.$refs.BehaviorOfVisitDirTree.getCheckedKeys()
      this.dataSelected = data
    },
    deleteItem({ data, node }) {
      this.$refs.BehaviorOfVisitDirTree.setChecked(node.key, false, true)
      this.dataSelected = this.$refs.BehaviorOfVisitDirTree.getCheckedKeys()
    },
    mapData(arrayData, arrayFilter) {
      const arrayTmp = []
      arrayData.map(v => {
        const isItemInArrayFilter = arrayFilter.includes(v.id)
        if (isItemInArrayFilter || v.children) {
          const item = { ...v }
          if (item.children) {
            const children = this.mapData(item.children, arrayFilter)
            if (children.length) {
              item.children = children
              item.total = children.reduce((vP, cV) => vP + cV.total, 0)
              arrayTmp.push(item)
            }
          } else if (isItemInArrayFilter) {
            arrayTmp.push(item)
          }
        }
      })
      return arrayTmp
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
}
</style>

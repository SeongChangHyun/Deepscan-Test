<template>
  <HeaderItemCreateCampaign
    :title="genI18n('title')"
    :desc="genI18n('description')"
    :required-data="true"
  >
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="container-tree">
        <el-tree
          ref="UserInterestDirTree"
          :data="data"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          node-key="code"
          icon-class="el-icon-plus"
          default-expand-all
          class="target-exclude-tree"
          @check="changeData"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="label">{{ data.name }}</span>
            <span class="total">{{ data.stat_count }}</span>
            <span v-if="node.checked" class="target">{{ genI18n('targeted') }}</span>
            <span v-else class="targeted">{{ genI18n('target') }}</span>
          </span>
        </el-tree>

        <p>{{ genI18n('selectedTitle') }}</p>

        <el-tree
          :data="dataTreeSelected"
          :expand-on-click-node="false"
          node-key="code"
          icon-class="el-icon-plus"
          default-expand-all
          class="target-exclude-tree"
        >
          <span slot-scope="{ node, data  }" class="custom-tree-node">
            <span>{{ data.name }}</span>
            <span>
              <span>{{ data.stat_count }}</span>
            </span>
            <span>
              <svg-icon
                icon-class="close-button"
                class="close-btn"
                @click="delItem({node, data})"
              />
            </span>
          </span>
        </el-tree>
      </div>
    </el-col>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
import { getClientId } from '@/utils/auth'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  computed: {
    ...mapState('campaign', [
      'dataCreateCampaign',
      'listUserInterestDirectories'
    ]),
    data() {
      return this.processData(this.listUserInterestDirectories)
    },
    dataTreeSelected() {
      return this.processDataSelect(this.data, this.dataCreateCampaign.user_interest_directory)
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListUserInterestDirectories', {
      lang: Cookies.get('language'),
      device_type: this.dataCreateCampaign.campaign_device_id,
      client_id: getClientId()
    })
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.userInterestDirectory.${params}`
      )
    },
    changeData() {
      const data = this.$refs.UserInterestDirTree.getCheckedKeys()
      this.dataCreateCampaign.user_interest_directory = data
    },
    delItem({ data, node }) {
      this.$refs.UserInterestDirTree.setChecked(node.key, false, true)
      this.dataCreateCampaign.user_interest_directory = this.$refs.UserInterestDirTree.getCheckedKeys()
    },
    processDataSelect(arrayData, arrayFilter) {
      const arrayTmp = []
      arrayData.map(v => {
        const isItemInArrayFilter = arrayFilter.includes(v.code)
        if (isItemInArrayFilter || v.children) {
          const item = { ...v }
          if (item.children && item.children.length) {
            const children = this.processDataSelect(item.children, arrayFilter)
            if (children.length) {
              item.children = children
              item.stat_count = children.reduce(
                (vP, cV) => vP + cV.stat_count,
                0
              )
              arrayTmp.push(item)
            }
          } else if (isItemInArrayFilter) {
            arrayTmp.push(item)
          }
        }
      })
      return arrayTmp
    },
    processData(arrayData) {
      return arrayData.map(v => {
        const { code, name, stat_count, sub_items, parent_code } = v
        let children = []
        if (sub_items && sub_items.length) {
          children = this.processData(sub_items)
        }
        return { code, name, stat_count, children, parent_code }
      })
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
  .container-tree {
    margin-top: 10px;
    >p {
      margin: 10px 0;
    }
    .el-tree {
      border: 1px solid #ddd;
      height: 200px;
      overflow-y: scroll;
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
        .targeted {
          flex: 1;
          color: #6dc0b7;
          text-align: right;
          max-width: 150px;
        }
        .target {
          flex: 1;
          text-align: right;
          color: #6dc0b7;
          max-width: 150px;
        }
      }
    }
  }
}
</style>


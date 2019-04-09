<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>
      </p>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div>
        <span>{{ genI18n('description') }}</span>
      </div>
      <div class="container-tree">
        <el-tree
          ref="UserInterestDirTree"
          :data="data"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          node-key="id"
          icon-class="el-icon-plus"
          default-expand-all
          class="target-exclude-tree"
          @check="changeData"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>{{ data.total }}</span>
            <span v-if="node.checked">
              <span class="target">{{ genI18n('targeted') }}</span>
            </span>
            <span v-else class="targeted">{{ genI18n('target') }}</span>
          </span>
        </el-tree>

        <p>{{ genI18n('selectedTitle') }}</p>

        <el-tree
          :data="dataTreeSelected"
          :expand-on-click-node="false"
          node-key="id"
          icon-class="el-icon-plus"
          default-expand-all
          class="target-exclude-tree"
        >
          <span slot-scope="{ node, data  }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <span>{{ data.total }}</span>
            </span>
            <span>
              <svg-icon
                icon-class="close-button"
                class="close-btn"
                @click="()=>delItem({node, data})"
              />
            </span>
          </span>
        </el-tree>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '1d',
      data: [
        {
          id: 1,
          label: 'Level one 1',
          total: 1000,
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              total: 1000
            }
          ]
        },
        {
          id: 2,
          label: 'Level one 2',
          total: 1000,
          children: [
            {
              id: 5,
              total: 500,
              label: 'Level two 2-1'
            },
            {
              id: 6,
              total: 500,
              label: 'Level two 2-2'
            }
          ]
        }
      ],
      dataSelected: []
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
        `createCampaign.stepCreateCampaign.userInterestDirectory.${params}`
      )
    },
    changeData() {
      const data = this.$refs.UserInterestDirTree.getCheckedKeys()
      this.dataSelected = data
    },
    delItem({ data, node }) {
      this.$refs.UserInterestDirTree.setChecked(node.key, false, true)
      this.dataSelected = this.$refs.UserInterestDirTree.getCheckedKeys()
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
  padding: 20px 0;
  .h-title {
    margin-top: 0px;
  }
  .container-tree {
    margin-top: 20px;
    .el-tree {
      border: 1px solid #ddd;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        .targeted {
          color: #6DC0B7;
        }
        .target {
          color: #6DC0B7;
        }
      }
    }
  }
}
</style>


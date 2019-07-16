<template>
  <el-table
    v-loading="isLoadingVerify"
    :show-header="false"
    :data="LIST_BASE"
    :span-method="objectSpanMethod"
    class="w-100 tracking-tag-table"
    border>
    <template v-for="(col, index) in LIST_CONFIG_TABLE">
      <el-table-column :key="index" :prop="col" :width="index < 2 ? '120px' : 'auto'" align="center">
        <template slot-scope="scope" class="text-center">
          <div v-if="col !== 'data'">
            <div v-if="col === 'device'">{{ $t('productFeed.trackingTag.trackingTag') }}</div>
            <div>{{ scope.row[col] }}</div>
          </div>
          <div v-else>
            <el-table
              :show-header="false"
              :data="scope.row[col]"
              class="w-100 cell-item"
              border>
              <template v-for="(column, index) in LIST_CONFIG_CELL_TABLE">
                <el-table-column :key="index" :prop="column.props" :width="index===1? '35px' : 'auto'" align="left">
                  <template slot-scope="scope">
                    <component
                      :is="column.template"
                      v-bind="{
                        tagName: column.props,
                        data: scope.row[column.props],
                        type: index === 1}" />
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
import TextCell from '../cell-table/TextCell'
import CheckboxCell from '../cell-table/CheckboxCell'
import { LIST_CONFIG_TABLE, LIST_CONFIG_CELL_TABLE, LIST_BASE } from '@/common/tracking-tag/stateSummaryCommon'

export default {
  name: 'TableTop',
  components: {
    TextCell,
    CheckboxCell
  },
  data() {
    return {
      LIST_BASE,
      LIST_CONFIG_CELL_TABLE,
      LIST_CONFIG_TABLE,
      dataTableTop: []
    }
  },
  computed: {
    ...mapGetters('tool', [
      'verify',
      'isLoadingVerify'
    ])
  },
  watch: {
    verify(newData, oldData) {
      this.dataTableTop = newData
      this.parseInitialDataTable(this.dataTableTop)
    }
  },
  mounted() {
    this.$store.dispatch('tool/fetchTrackingTagsVerify')
  },
  methods: {
    parseInitialDataTable(list) {
      this.LIST_BASE.forEach(element => {
        element.data = list[element.code].filter((item) => {
          return element.category === item.category
        })
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

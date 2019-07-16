<template>
  <div>
    <el-table
      v-loading="isLoadingStatus"
      :data="dataParse"
      :span-method="objectSpanMethod"
      class="w-100 table-bottom"
      border>
      <template>
        <el-table-column v-if="dataParse.length!==0" align="center" width="500px">
          <template slot="header" slot-scope="scope">
            <div class="w-100 text-left p-0">
              <el-radio-group v-model="typeDevice" size="small" @change="onChangeDevice()">
                <el-radio-button v-for="(item, index) in LIST_TYPE_DEVICE" :key="index" :label="item.key" >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <template v-for="(item, index) in LIST_CONFIG_TABLE_BOTTOM">
            <el-table-column :key="index" :prop="item" :align="index === 0 ? 'center' : 'left'" :width="index === 0 ? '100px' : '300px'">
              <template slot-scope="scope">
                {{ scope.row[item] }}
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <template v-for="(item, index) in listLabel">
          <el-table-column :key="index" :label="item" :min-width="'95px'" align="center">
            <template slot-scope="scope">
              {{ getValue(scope.row, item) }}
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LIST_CONFIG_TABLE_BOTTOM, LIST_TYPE_DEVICE } from '@/common/tracking-tag/stateSummaryCommon'
import { trackingTag } from '@/common/constants'
import TextCell from '../cell-table/TextCell'

export default {
  name: 'TableBottom',
  components: {
    TextCell
  },
  data() {
    return {
      trackingTag,
      typeDevice: 'all',
      LIST_TYPE_DEVICE,
      LIST_CONFIG_TABLE_BOTTOM,
      dataTable: [],
      listLabel: [],
      dataParse: []
    }
  },
  computed: {
    ...mapGetters('tool', [
      'status',
      'isLoadingStatus'
    ])
  },
  watch: {
    status(newData, oldData) {
      this.dataTable = [...newData]
      this.parseInitData()
    }
  },
  mounted() {
    this.$store.dispatch('tool/fetchTrackingTagsStatus', this.typeDevice)
  },
  methods: {
    getValue(value, date) {
      const result = value.data.filter(element => element.date === date)[0]
      return `${result.count}(${result.error_count})`
    },
    parseInitData() {
      this.dataTable = this.dataTable.sort((a, b) => (a.category < b.category) ? 1 : ((b.category < a.category) ? -1 : 0))
      this.dataTable.forEach(element => {
        if (!this.listLabel.includes(element.date)) {
          this.listLabel.push(element.date)
        }
      })
      const dataParseTmp = []
      this.dataTable = this.groupArr(this.dataTable, this.trackingTag.FIRST_COL_VALUE)
      for (const key in this.dataTable) {
        const element = this.dataTable[key]
        this.dataTable[key] = this.groupArr(element, this.trackingTag.SECOND_COL_VALUE)
      }
      for (const key in this.dataTable) {
        const element = this.dataTable[key]
        let tmpItem = {
          index: [...this.dataParse].length
        }
        for (const iterator in element) {
          dataParseTmp.push(Object.assign({}, tmpItem, {
            rowspan: Object.keys(element).length,
            category: key,
            custom_tag_name: iterator,
            data: element[iterator]
          }))
          tmpItem = {}
        }
        this.dataParse = dataParseTmp
      }
    },
    groupArr(list, key) {
      return list.reduce((r, a) => {
        r[a[key]] = r[a[key]] || []
        r[a[key]].push(a)
        return r
      }, Object.create(null))
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.index !== undefined) {
          return {
            rowspan: row.rowspan ? row.rowspan : 0,
            colspan: row.rowspan ? 1 : 0
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    onChangeDevice() {
      this.$store.dispatch('tool/fetchTrackingTagsStatus', this.typeDevice)
    }
  }
}
</script>


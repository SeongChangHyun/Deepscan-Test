import { mapGetters } from 'vuex'
import FeedSettingCreate from './components/feed-setting-create'
import { FeedSetting } from '@/common/product-feed/feedSetting'
import { Common } from '@/common/constants'
import { getRoleElement } from '@/common/generatePermission'
import { ContentLoader } from 'vue-content-loader'
import isEmpty from 'lodash/isEmpty'
export default {
  components: { FeedSettingCreate, ContentLoader },
  name: 'FeedSetting',
  data() {
    return {
      indexMethod: 0,
      tableData: [],
      isCreateNew: true,
      columns: FeedSetting.columnsTable,
      itemSelected: {},
      test: {},
      rolePermission: {},
      currentRole: 'admin',
      isLoading: true
    }
  },
  computed: {
    ...mapGetters('tool', [
      'feedSetting'
    ])
  },
  watch: {
    feedSetting: {
      handler(newData) {
        if (newData instanceof Array && !isEmpty(newData) && newData.length >= 0) {
          this.tableData = newData
          this.itemSelected = {}
          this.isLoading = false
          this.$refs.tableFeedsetting.clearSelection()
          this.$refs.tableFeedsetting.clearSort()
          this.$refs.tableFeedsetting.clearFilter()
        }
      },
      immediate: false
    }
  },
  created() {
    this.isLoading = true
    this.$store.dispatch('tool/getListFeedSetting')
  },
  methods: {
    checkRolePermission(element) {
      return getRoleElement('tools.producFeed.feedSetting', element)
    },
    hasValue(obj, key, value) {
      return ''
    },
    selectItemTable(row) {
      if (!row) return
      const rowNewSelected = row.product_feed_id
      for (const i in this.tableData) {
        if (this.tableData[i].product_feed_id === rowNewSelected) {
          const currentStatusSelected = this.tableData[i].isSelected
          this.tableData[i].isSelected = !currentStatusSelected
          if (this.tableData[i].isSelected) {
            this.itemSelected = this.tableData[i]
          } else {
            this.itemSelected = {}
          }
        } else {
          this.tableData[i].isSelected = false
        }
      }
      this.tableData = [...this.tableData]
    },
    resetSelectAllData(data) {
      for (const i in data) {
        data[i].isSelected = false
      }
      this.tableData = data
    },
    updateStatusCreateNew() {
      this.isCreateNew = !this.isCreateNew
    },
    createNewFeedSetting(params) {
      this.isLoading = true
      this.$store.dispatch('tool/createFeedSetting', params).then((response) => {
        this.$store.dispatch('tool/getListFeedSetting')
        this.updateStatusCreateNew()
      })
    },
    showConfirmDeleteProductFeed() {
      this.$confirm(this.$t('productFeed.messageConfirmDeleteFeedSetting'), this.$t('productFeed.warning'), {
        confirmButtonText: this.$t('productFeed.yes'),
        cancelButtonText: this.$t('productFeed.no'),
        type: Common.TYPE_POPUP_WARNING
      }).then(() => {
        this.deleteProductFeedSetting()
      })
    },
    deleteProductFeedSetting() {
      this.isLoading = true
      this.$store.dispatch('tool/deleteFeedSetting', this.itemSelected.product_feed_id).then((response) => {
        this.$store.dispatch('tool/getListFeedSetting')
      })
    }
  }
}

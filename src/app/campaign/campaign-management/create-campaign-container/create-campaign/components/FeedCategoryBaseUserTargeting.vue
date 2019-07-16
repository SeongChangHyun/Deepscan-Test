<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.feedCategory')"
              width="200"
            >
              <el-table-column width="140">
                <template slot-scope="scope">
                  <el-input :value="price" class="text-right" placeholder="-" @input="value => onInput(value, scope)"/>
                </template>
              </el-table-column>
              <el-table-column prop="currency" width="60"/>
            </el-table-column>
            <el-table-column
              :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.categoryInformation')"
              prop="category_info"
            />
            <el-table-column
              :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.productCount')"
              prop="product_count"
              width="120"
            />
            <el-table-column
              :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.averagePrice')"
              prop="average_price"
              width="120"
            />
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import findIndex from 'lodash/findIndex'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  props: {
    currency: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showContent: false,
      price: '',
      tableData: []
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listProductFeedCategoryCpc'])
  },
  watch: {
    listProductFeedCategoryCpc(val) {
      this.tableData = val.sub_items.map(item => {
        return {
          ...item,
          currency: this.currency
        }
      })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadProductFeedCategoryCpc')
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.feedCategoryBaseUser.${params}`
      )
    },
    onInput(value, item) {
      const { category_id } = item.row
      const index = findIndex(this.dataCreateCampaign.feed_base_user_targeting, el => el.feed_id === category_id)
      if (index > -1) {
        this.dataCreateCampaign.feed_base_user_targeting[index].feed_category_price = parseInt(value)
      } else {
        this.dataCreateCampaign.feed_base_user_targeting.push({
          feed_id: category_id,
          feed_category_price: parseInt(value)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
}
</style>

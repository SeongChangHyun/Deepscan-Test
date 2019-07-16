<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-radio-group v-model="campain_product_filtering.product_filter_type" class="mr-t-10">
      <el-radio :label="0" class="w-100">{{ genI18n('checkbox1') }} </el-radio>
      <el-radio v-if="dataCreateCampaign.c_type === C_TYPES.retargeting" :label="1" class="w-100">{{ genI18n('checkbox2') }} </el-radio>
      <el-radio :label="2" class="w-100">{{ genI18n('checkbox3') }}</el-radio>
    </el-radio-group>
    <div v-if="campain_product_filtering.product_filter_type === 2">
      <div class="h-form-input el-row">
        <el-select
          v-model="productFeed"
          :placeholder="genI18n('placeholderSelectProductFeed')"
          class="h-input-select-sub w-100"
        >
          <el-option v-for="item in listProductFeed" :key="item.product_feed_id" :label="item.product_feed_name" :value="item.product_feed_id">
            <el-row class="item">
              <el-col :span="18">{{ item.product_feed_name }}</el-col>
              <el-col :span="6" class="product-count">{{ item.product_count }}</el-col>
            </el-row>
          </el-option>
        </el-select>
      </div>
      <el-row class="h-form-input">
        <el-input :value="valueSearch" placeholder="Please input" class="input-with-select" @input="debouncedOnSearch" />
      </el-row>
      <el-row class="container-block target-exclude-container">
        <el-row class="container-item">
          <ItemList
            v-for="item in listProduct"
            :key="item.product_id"
            :item="item"
            :status="item.status"
            :click-target="selectProductTarget"
            :click-exclude="selectProductExclude"
            :name="item.product_name"
            :total="item.price"
          />
        </el-row>
        <div class="line"/>
        <el-row class="h-form-input container-item line-top">
          <el-col :span="20">
            <span class="h-title">{{ `${productSelected.length} ${genI18n('items')}` }}</span>
          </el-col>
          <el-col :span="4" class="remove-all-btn">
            <span class="remove-all-btn" @click="removeSelectedAll">{{ genI18n('removeAll') }}</span>
          </el-col>
        </el-row>
        <el-row class="h-form-input">
          <div v-if="!!productSelected.length">
            <el-row class="pd-h-15">
              <el-col :xs="4" :sm="2">
                <span>Status</span>
              </el-col>
              <el-col :span="4">
                <span>ID</span>
              </el-col>
              <el-col :xs="9" :sm="11">
                <span>Name</span>
              </el-col>
              <el-col :span="6">
                <span>Price</span>
              </el-col>
              <el-col :span="1"/>
            </el-row>
            <ItemTable
              v-for="item in productSelected"
              :key="item.product_id"
              :id="item.product_id"
              :item="item"
              :on-delete="deleteProduct"
              :name="item.product_name"
              :price="item.price"
              :status="item.status"
            />
          </div>
          <p v-else class="no-data">{{ genI18n('noData') }}</p>
        </el-row>
      </el-row>
    </div>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import ItemList from './components/ItemList'
import ItemTable from './components/ItemTable'
import debounce from 'lodash/debounce'
import findIndex from 'lodash/findIndex'
import { CampaignManagementConstants, C_TYPES } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  name: 'ProductFiltering',
  components: {
    ItemList,
    ItemTable,
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      C_TYPES,
      value: 'default',
      valueSearch: '',
      productFeed: '',
      productSelected: [],
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCampaign', 'listProductFeed', 'listProducts']),
    listProduct() {
      return this.listProducts
        .map(v => {
          const index = findIndex(this.productSelected, { product_id: v.product_id })
          v.status = { ...this.productSelected[index] }.status || CampaignManagementConstants.TARGETING_TYPE.DEFAULT
          return v
        })
    },
    campain_product_filtering() {
      return this.dataCreateCampaign.campain_product_filtering
    }
  },
  watch: {
    productSelected(val) {
      this.dataCreateCampaign.campain_product_filtering.products = val.map(item => {
        return {
          status: item.status.toUpperCase(),
          product_feed_id: item.product_feed_id,
          product_id: item.product_id,
          product_name: item.product_name,
          product_price: item.price
        }
      })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListProductFeed')
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.deliverCycle.productFiltering.${params}`)
    },
    changeStatus(list) {
      return list.map(v => {
        const index = findIndex(this.productSelected, { id: v.id })
        v.status =
          { ...this.productSelected[index] }.status ||
          CampaignManagementConstants.TARGETING_TYPE.DEFAULT
        return v
      })
    },
    debouncedOnSearch: debounce(function(keyword) {
      if (keyword.length >= 2) {
        this.$store.dispatch('campaign/loadProductsInAFeed', {
          product_name: keyword,
          product_feed_id: this.productFeed
        })
      }
    }, 500),
    selectProductTarget(item) {
      this.productSelected.push({ ...item, status: CampaignManagementConstants.TARGETING_TYPE.TARGETED })
    },
    selectProductExclude(item) {
      this.productSelected.push({ ...item, status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED })
    },
    deleteProduct(item) {
      const index = findIndex(this.productSelected, { id: item.product_id })
      this.productSelected.splice(index, 1)
    },
    removeSelectedAll() {
      this.productSelected = []
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-dote-line {
  border-bottom: 1px dotted #ddd;
}
.mr-t-10 {
  margin-top: 10px;
}
.el-radio {
  margin: 0;
  padding-right: 30px;
  padding-top: 5px;
}
.content-custom {
  background: #f5f7fa;
  padding: 20px;
  margin-top: 10px;
  margin-left: 20px;
  .content-list {
    border: 1px solid #ccc;
    background: #fff;
    max-height: 100px;
    overflow-y: scroll;
  }
  .content-list-select {
    border: 1px solid #ccc;
    background: #fff;
  }
}
.h-title {
  margin-top: 0px;
}
.pd-h-15 {
  padding-left: 15px;
  padding-right: 15px;
}
.product-count {
  text-align: right;
}
.no-data {
  text-align: center;
}
</style>

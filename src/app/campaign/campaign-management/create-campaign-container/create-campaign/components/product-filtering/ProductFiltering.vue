<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dote-line schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr >
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
    <div :class="{ 'show': showContent }" class="el-col-md-18 el-col-sm-18 el-col-xs-24 float-right px-0 mt-3 transition-height">
      <div v-show="showContent" class="content-fields container-tree target-exclude-container">
        <div class="h-form-input el-row">
          <el-select
            v-model="productFeed.id"
            :placeholder="genI18n('placeholderSelectProductFeed')"
            class="h-input-select-sub w-100"
          >
            <el-option
              v-for="item in productFeed"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <el-row class="h-form-input">
          <el-input v-model="valueSearch" placeholder="Please input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </el-row>
        <el-row class="container-block target-exclude-container">
          <el-row class="container-item">
            <ItemList
              v-for="item in listProduct"
              :key="item.id"
              :item="item"
              :status="item.status"
              :click-target="selectProductTarget"
              :click-exclude="selectProductExclude"
            />
          </el-row>
          <div class="line"/>
          <el-row class="h-form-input container-item line-top">
            <el-col :span="20">
              <span class="h-title">{{ genI18n('selectedTitle') }}</span>
            </el-col>
            <el-col :span="4" class="remove-all-btn">
              <span class="remove-all-btn" @click="removeSelectedAll">{{ genI18n('removeAll') }}</span>
            </el-col>
          </el-row>
          <el-row class="h-form-input container-item">
            <div v-if="!!productSelected.length">
              <ItemTable
                v-for="item in productSelected"
                :key="item.id"
                :item="item"
                :on-delete="deleteProduct"
                class="w-100"
              />
            </div>
            <p v-else>{{ genI18n('noData') }}</p>
          </el-row>
        </el-row>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import ItemList from './components/ItemList'
import ItemTable from './components/ItemTable'
import _ from 'lodash'
import { CampaignManagementConstants } from '@/common/constants'

export default {
  name: 'ProductFiltering',
  components: {
    ItemList,
    ItemTable
  },
  data() {
    return {
      showContent: false,
      value: 'default',
      valueSearch: '',
      products: [
        { id: 1, name: 'Xiaomi Zumi Smart Dust Mask 1SET 3P Genuine', total: 99000, price: 10300 },
        { id: 2, name: 'Xiaomi Zumi Smart Cleaner', total: 11000, price: 69000 },
        { id: 3, name: 'Xiaomi Zumi Cleaner', total: 3000, price: 99000 },
        { id: 4, name: 'Xiaomi Zumi Pen', total: 250, price: 5000 },
        { id: 5, name: 'Xiaomi Zumi Mask', total: 69, price: 3000 }
      ],
      productFeed: [
        { id: 1, name: 'Qoo10_cloth_JPY', total: 4138792 },
        { id: 2, name: 'Qoo10_cloth_KRW', total: 610702 }
      ],
      productSelected: [],
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCampaign']),
    listProduct() {
      return this.products
        .filter(v => {
          const index = v.name.search(this.valueSearch)
          return index > -1
        })
        .map(v => {
          const index = _.findIndex(this.productSelected, { id: v.id })
          v.status = { ...this.productSelected[index] }.status || CampaignManagementConstants.TARGETING_TYPE.DEFAULT
          return v
        })
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.deliverCycle.productFiltering.${params}`)
    },
    selectProductTarget(item) {
      this.productSelected.push({ ...item, status: CampaignManagementConstants.TARGETING_TYPE.TARGETED })
    },
    selectProductExclude(item) {
      this.productSelected.push({ ...item, status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED })
    },
    deleteProduct(item) {
      const index = _.findIndex(this.productSelected, { id: item.id })
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
</style>

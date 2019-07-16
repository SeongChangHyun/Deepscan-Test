<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-radio-group v-model="dataCreateCampaign.campaign_location.location_type">
        <el-radio :label="LOCATION.DEFAULT">{{ genI18n('optionDefault') }}</el-radio>
        <el-radio :label="LOCATION.ALL">{{ genI18n('optionAll') }}</el-radio>
        <el-radio :label="LOCATION.CUSTOM">{{ genI18n('optionCustom') }}</el-radio>
      </el-radio-group>

      <el-row v-if="dataCreateCampaign.campaign_location.location_type === LOCATION.CUSTOM" class="h-mg-t-10">
        <el-row class>
          <el-input v-model="valueSearch" :placeholder="genI18n('placeholderSearch')" />
        </el-row>
        <el-row class="container-block target-exclude-container">
          <div v-if="valueSearch.length > 0" ref="contentList" class="container-item" @scroll="onScroll">
            <div>
              <div v-if="locations.length > 0">
                <ItemList
                  v-for="item in locations"
                  :key="item.id"
                  :item="item"
                  :status="item.status"
                  :click-target="selectLocationTarget"
                  :click-exclude="selectLocationExclude"
                  :name="item.name"
                  :total="`${item.stat_count ? item.stat_count : ''}`"
                />
              </div>
              <p v-else>{{ genI18n('noData') }}</p>
            </div>
            <div class="line"/>
          </div>
          <el-row class="h-form-input container-item line-top">
            <el-col :span="20">
              <span class="h-title">{{ genI18n('selectedTitle') }}</span>
            </el-col>
            <el-col :span="4" class="remove-all-btn">
              <span class="remove-all-btn" @click="removeSelectedAll">{{ genI18n('removeAll') }}</span>
            </el-col>
          </el-row>
          <el-row class="h-form-input container-item">
            <div v-if="!!locationSelected.length">
              <ItemTable
                v-for="item in locationSelected"
                :key="item.id"
                :item="item"
                :on-delete="deleteLocation"
                :name="item.name"
                :total="''"
                :status="item.status"
                class="w-100"
              />
            </div>
            <p v-else>{{ genI18n('noData') }}</p>
            <p v-if="showErr" class="mess-error">{{ genI18n('error') }}</p>
          </el-row>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import findIndex from 'lodash/findIndex'
import uniqBy from 'lodash/uniqBy'
import { CampaignManagementConstants, PAGE_SIZE } from '@/common/constants'
import ItemList from './components/ItemList'
import ItemTable from './components/ItemTable'

export default {
  components: {
    ItemList,
    ItemTable
  },
  data() {
    return {
      valueSearch: '',
      LOCATION: CampaignManagementConstants.LOCATION,
      isLoadMore: false,
      page: 1,
      pageSize: PAGE_SIZE,
      locations: []
    }
  },
  computed: {
    ...mapState('campaign', [
      'dataCreateCampaign',
      'listLocation',
      'errorCampaign'
    ]),
    locationSelected() {
      return this.dataCreateCampaign.campaign_location.location
    },
    showErr() {
      return this.errorCampaign.location
    }
  },
  watch: {
    listLocation(val) {
      let newList
      if (this.page > 1) {
        newList = uniqBy([...this.locations, ...val], function(item) {
          return item.id
        })
      } else {
        newList = val
      }
      this.locations = this.changeStatus(newList)
      if (this.page === 1) {
        this.$refs.contentList.scrollTop = 0
      }
    },
    locationSelected(val) {
      this.$store.dispatch('campaign/setErrorCampaign', {
        location: !val.length
      })
      this.locations = this.changeStatus(this.locations)
    },
    valueSearch(keyword) {
      // TO DO: handle keyword size > 4MB instead of 2 characters
      if (keyword.length >= 2) {
        this.page = 1
        this.getLocations(keyword, this.pageSize, 0)
        return
      }
    }
  },
  created() {
  },
  methods: {
    changeStatus(list) {
      return list.map(v => {
        const index = findIndex(this.locationSelected, { id: v.id })
        v.status =
          { ...this.locationSelected[index] }.status ||
          CampaignManagementConstants.TARGETING_TYPE.DEFAULT
        return v
      })
    },
    getLocations(keyword, limit, offset) {
      this.$store.dispatch('campaign/loadListLocation', {
        keyword,
        limit,
        offset
      })
    },
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.location.${params}`)
    },
    selectLocationTarget(item) {
      this.locationSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.TARGETED
      })
    },
    selectLocationExclude(item) {
      this.locationSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED
      })
    },
    deleteLocation(item) {
      const index = findIndex(this.locationSelected, { id: item.id })
      this.locationSelected.splice(index, 1)
    },
    removeSelectedAll() {
      const lengthLocationSelected = this.locationSelected.length
      this.locationSelected.splice(0, lengthLocationSelected)
    },
    onScroll({ target }) {
      const { scrollTop, clientHeight, scrollHeight } = target
      if ((scrollTop + clientHeight >= scrollHeight) && this.listLocation.length !== 0) {
        this.page++
        this.getLocations(this.valueSearch, this.pageSize, (this.page - 1) * this.pageSize)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 30px;
  }
  .remove-all {
    text-align: right;
    color: #3498db;
    margin-right: 60px;
  }
}
</style>

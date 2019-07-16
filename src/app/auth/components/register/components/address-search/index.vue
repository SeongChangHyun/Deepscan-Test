<template>
  <div>
    <div class="search-bar">
      <div v-if="!isJapaneseSearch(country)" class="search-container">
        <div class="search-bar-item">
          <div class="search-label">{{ genI18n('province') }}</div>
          <el-select v-model="province" class="province-select-box" @change="onChangeProvince()">
            <el-option
              v-for="item in provinceOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="search-bar-item">
          <div class="search-label">{{ genI18n('city') }}</div>
          <el-select v-model="city" :disabled="!province" clearable filterable class="city-select-box" @change="onChangeCity()">
            <el-option
              v-for="item in cityOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div v-if="isRoadBase()" class="search-bar-item">
          <div class="search-label">{{ genI18n('road') }}</div>
          <el-input
            v-model="road"
            :placeholder="genI18n('road')"
            :disabled="!province"
            name="road"
            type="text"
          />
        </div>
        <div v-else class="search-bar-item">
          <div class="search-label">{{ genI18n('nameOfEupyeongDong') }}</div>
          <el-input
            v-model="nameOfEupyeongDong"
            :placeholder="genI18n('nameOfEupyeongDong')"
            :disabled="!province"
            name="nameOfEupyeongDong"
            type="text"
          />
        </div>

        <div v-if="isRoadBase()" class="search-bar-item">
          <div class="search-label">{{ genI18n('detail') }}</div>
          <el-input
            v-model="detail"
            :placeholder="genI18n('detail')"
            :disabled="!province"
            name="detail"
            type="text"
          />
        </div>
        <div v-else class="search-bar-item">
          <div class="search-label">{{ genI18n('lotNumber') }}</div>
          <el-input
            v-model="detail"
            :placeholder="genI18n('lotNumber')"
            :disabled="!province"
            name="lotNumber"
            type="text"
          />
        </div>
        <div class="btn-search-address-container">
          <el-button
            :loading="loading"
            type="info"
            class="btn-search-address w-100 rounded-0 px-0"
            @click="onSearchAddress"
          >{{ genI18n('searchBtn') }}</el-button>
        </div>
      </div>
      <div v-else class="search-container">
        <div class="search-bar-item">
          <div class="search-label">{{ genI18n('jpPostalCode') }}</div>
          <el-input
            v-model="jpPostalCode"
            :placeholder="genI18n('jpPostalCode')"
            name="jpPostalCode"
            type="text"
          />
        </div>
        <div class="btn-search-address-container">
          <el-button
            :loading="loading"
            type="info"
            class="btn-search-address w-100 rounded-0 px-0"
            @click="onSearchAddress"
          >{{ genI18n('searchBtn') }}</el-button>
        </div>
      </div>
    </div>
    <div class="search-table">
      <el-table
        :data="isRoadBase() ? postalAddressesRoadBase : postalAddressesHouseBase"
        style="width: 100%"
        @row-click="onAddressSelect"
        @selection-change="handleAddressSelect"
      >
        <el-table-column :label="genI18n('postalCodeLabel')" property="zip_no"/>
        <el-table-column :label="genI18n('roadLabel')" property="road_addr"/>
        <el-table-column :label="genI18n('addressLabel')" property="jibun_addr"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import addressSearchController from './AddressSearch'
export default addressSearchController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

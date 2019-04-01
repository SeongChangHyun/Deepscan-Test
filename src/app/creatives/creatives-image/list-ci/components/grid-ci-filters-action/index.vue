<template>
  <div class="filters-action">
    <div class="action-filters-list-ci">
      <el-select v-model="filterBySizeSeleted" clearable filterable @change="onSelectSize">
        <el-option
          v-for="item in filterBySizeOptions"
          :key="item.id"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="filterByStatusSelected" clearable filterable @change="onSelectStatus">
        <el-option
          v-for="item in filterByStatusOptions"
          :key="item.id"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button class="button-black" @click="onReset">{{ $t('creatives.ci.reset') }}</el-button>
    </div>
    <div class="right-menu-item">
      <autocomplete-search :source="searchSource" :keyexpr="keyExpr" :displayexpr="displayExpr" :headersearch="false" @onSearchResult="onSearchResult" />
    </div>
  </div>
</template>

<script>
import GridCiFiltersAction from './GridCiFiltersAction'
export default GridCiFiltersAction
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>

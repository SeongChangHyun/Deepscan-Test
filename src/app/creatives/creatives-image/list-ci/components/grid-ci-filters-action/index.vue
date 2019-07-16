<template>
  <el-row type="flex" justify="space-between" class="filters-action">
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="group-select-item">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="group-select">
        <el-col :span="12" class="size">
          <el-select v-model="filterBySizeSeleted" filterable class="size-select" @change="onSelectSize">
            <el-option v-for="item in filterBySizeOptions" :key="item.id" :label="item.label" :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="12" class="status">
          <el-select v-model="filterByStatusSelected" filterable class="status-select" @change="onSelectStatus">
            <el-option v-for="item in filterByStatusOptions" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="btn-reset-col">
        <el-button class="btn-reset" @click="onReset">{{ $t('creatives.ci.reset') }}</el-button>
      </el-col>
    </el-col>
    <el-col class="spacing">
      <p/>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="search">
      <el-row type="flex" justify="end" class="search-select">
        <el-select
          v-model="searchValue"
          :placeholder="$t('creatives.ci.search')"
          filterable
          multiple
          collapse-tags
          default-first-option
          class="search-select-item"
          popper-class="list-ci"
          autocomplete="on"
        >
          <el-option-group v-for="group in searchSource" :key="group.label" :label="group.label" class="group-list-ci">
            <el-option v-for="item in group.option" :key="item.id" :value="item.value" :label="item.label"/>
          </el-option-group>
        </el-select>
        <span>
          <img class="search-icon" src="@/assets/icon/search-icon.png" @click="showSearchResult">
        </span>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import GridCiFiltersAction from './GridCiFiltersAction'
export default GridCiFiltersAction
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

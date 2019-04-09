<template>
  <div :class="{'show':showSearch}" class="autocomplete-search">
    <svg-icon v-if="isheadersearch" class-name="search-icon" icon-class="search" @click="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="searchValue"
      :class="{ 'autocomplete-search-select': isheadersearch, 'content-search': !isheadersearch }"
      autocomplete="on"
      filterable
      default-first-option
      remote
      placeholder="Search"
      @change="change">
      <el-option v-for="item in source" :key="item[keyexpr]" :value="getFieldNameValue(item, keyexpr)" :label="getFieldNameValue(item, displayexpr)"/>
    </el-select>
    <el-button v-if="!isheadersearch" class="search-buton">Search</el-button>
  </div>
</template>

<script>
import AutocompleteSearch from './AutocompleteSearch'
export default AutocompleteSearch
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>

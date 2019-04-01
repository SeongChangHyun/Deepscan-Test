<template>
  <div class="graph-filter-child">
    <span :style="`background-color: ${colorQualify}`" class="graph-filter-child-background"/>
    <el-select v-model="itemSelectedComponent" :placeholder="$t('campaignReporting.select')" clearable filterable @change="onChangeData" @clear="onClearData">
      <el-option
        v-for="item in data"
        :key="item.id"
        :label="item.name"
        :disabled="item.isSelected"
        :value="item.id"/>
    </el-select>
  </div>
</template>

<script>
import UserStatisticData from './UserStatisticData'
export default UserStatisticData
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>


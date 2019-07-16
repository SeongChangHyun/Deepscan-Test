<template>
  <el-col :xs="11" :sm="11" :md="11" :lg="3" :xl="3" class="graph-filter-child">
    <div :style="`background-color: ${colorQualify}`" class="graph-filter-child-background"/>
    <el-select v-model="itemSelectedComponent" :placeholder="$t('campaignReporting.select')" clearable filterable @change="onChangeData">
      <el-option
        v-for="item in data"
        :key="item.id"
        :label="item.name"
        :disabled="item.isSelected"
        :value="item.id"/>
    </el-select>
  </el-col>
</template>

<script>
import UserStatisticData from './UserStatisticData'
export default UserStatisticData
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>


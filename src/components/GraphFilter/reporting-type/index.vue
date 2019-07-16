<template>
  <el-col :xs="24" :sm="11" :md="11" :lg="3" :xl="3" class="reporting-type">
    <el-dropdown @command="onSeletecItemDropdow">
      <el-button class="date-button-dropdown">
        <span class="date-title">{{ $t(itemSeleted.code) }}</span>
        <i class="el-icon-caret-bottom el-icon--right date-icon"/>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="date-dropdown-item">
        <template v-for="item in data">
          <el-dropdown-item :key="item.prop" :disabled="item.id === itemSeleted.id || !item.alow" v-bind="item" :command="item">{{ $t(item.code) }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</template>

<script>
import ReportingType from './ReportingType'
export default ReportingType
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>


<template>
  <div class="reporting-type">
    <el-dropdown @command="onSeletecItemDropdow">
      <el-button class="date-button-dropdown">
        {{ $t(itemSeleted.code) }}
        <i class="el-icon-caret-bottom el-icon--right date-icon"/>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="date-dropdown-item">
        <template v-for="item in data">
          <el-dropdown-item :key="item.prop" :disabled="item.id === itemSeleted.id" v-bind="item" :command="item">{{ $t(item.code) }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import ReportingType from './ReportingType'
export default ReportingType
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>


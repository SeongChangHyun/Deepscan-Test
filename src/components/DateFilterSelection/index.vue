<template>
  <div class="date-selection">
    <el-select v-model="itemSelectedComponent" :placeholder="$t('campaignReporting.select')" clearable @change="onChangeData" @clear="onChangeData">
      <el-option
        v-for="item in data"
        :key="item.id"
        :label="$t(item.langCode) + item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import DateFilterSelection from './DateFilterSelection'
export default DateFilterSelection
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>

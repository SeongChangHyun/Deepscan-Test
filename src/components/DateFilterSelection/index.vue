<template>
  <div class="date-selection">
    <el-select v-model="itemSelectedComponent" :placeholder="$t('campaignReporting.select')" clearable @change="onChangeData">
      <el-option
        v-for="item in data"
        :key="item.index"
        :label="$t(item.langCode) + item.label"
        :value="item.index"/>
      <div style="display: flex; padding: 10px 2px 10px 20px">
        <el-date-picker
          v-model="valueSpecificDate"
          :picker-options="pickerOptions"
          :start-placeholder="$t('campaignReporting.reportingDateSelection.specificStartDate')"
          :end-placeholder="$t('campaignReporting.reportingDateSelection.specificEndDate')"
          type="daterange"
          range-separator="-"
          unlink-panels
          align="right"
          @change="onChangeDataDatePicker"/>
      </div>
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

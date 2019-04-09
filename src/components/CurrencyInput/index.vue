<template>
  <div class="currency-input-container">
    <el-button v-if="showControls" @click="clickSubButton">-</el-button>
    <input v-model="displayValue" type="text" @focus="onFocus" @blur="onBlur">
    <el-button v-if="showControls" @click="clickAddButton">+</el-button>
    <el-button v-if="showControls" @click="clickOkbButton">{{ $t('btnOk') }}</el-button>
    <el-button v-if="showControls" @click="clickCancelButton">{{ $t('btnCancel') }}</el-button>
  </div>
</template>

<script>
import CurrencyInput from './CurrencyInput'
export default CurrencyInput
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>

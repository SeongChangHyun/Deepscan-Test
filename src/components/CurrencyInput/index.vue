<template>
  <div class="currency-input-container">
    <div class="currency-input-area">
      <el-button v-if="showControls && type" @click="clickSubButton">-</el-button>
      <span v-if="!showControls" class="currency-text">{{ displayValue }}</span>
      <el-button v-if="!showControls" :title="$t('edit')" class="edit-button" @click="editCurrencyValue">
        <svg-icon icon-class="create"/>
      </el-button>
      <input v-if="showControls" v-model="displayValue" :class="[!type ? 'custom-border' : '']" :disabled="disabled" type="text" @change="onInputChange" @focus="onFocus" @blur="onBlur">
      <el-button v-if="showControls && type" @click="clickAddButton">+</el-button>
    </div>
    <div v-if="showControls && type" class="confirm-change-btn">
      <el-button @click="clickOkbButton"><i class="el-icon-check"/></el-button>
      <el-button @click="clickCancelButton"><i class="el-icon-close"/></el-button>
    </div>
    <span v-if="!type" class="currency-append-label">{{ currencyType }}</span>
  </div>
</template>

<script>
import CurrencyInput from './CurrencyInput'
export default CurrencyInput
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>

<template>
  <div class="detail-options">
    <div class="detail-options-title" @click="showOptionsArea('detail')">
      <i v-if="showDetailOptions" class="el-icon-caret-bottom"/>
      <i v-else class="el-icon-caret-right"/>
      <span>{{ $t('creatives.ci.detailOptionsTitle') }}</span>
    </div>
    <div v-if="showDetailOptions" class="detail-options-content">
      <div v-for="item in detailOptions" :key="item.id" class="detail-options-item">
        <div class="item-title">
          <strong>{{ $t('creatives.ci.' + item.title) }}</strong>
          {{ $t('creatives.ci.' + item.description) }}
        </div>
        <div class="item-content">
          <el-checkbox :value="item.allowEdit" @change="onCheck(item)"/>
          <el-input
            :placeholder="item.key"
            :value="item.value"
            :disabled="!item.allowEdit"
            @input="onChange($event, item)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailOptionsController from './DetailOptions'
export default detailOptionsController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

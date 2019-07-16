<template>
  <el-collapse v-model="showDetailOptions" class="expand-container">
    <el-collapse-item :title="$t('creatives.ci.detailOptionsTitle')" name="target_goal">
      <div class="detail-options-content">
        <div v-for="item in detailOptions" :key="item.id" class="detail-options-item">
          <div class="item-title">
            {{ $t('creatives.ci.' + item.title) }}
            {{ $t('creatives.ci.' + item.description) }}
          </div>
          <div class="item-content">
            <el-checkbox :value="item.allowEdit" @change="onCheck(item)"/>
            <el-input
              :value="item.value"
              :disabled="!item.allowEdit"
              @input="onChange($event, item)"
            />
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import detailOptionsController from './DetailOptions'
export default detailOptionsController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

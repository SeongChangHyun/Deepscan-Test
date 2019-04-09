
<template>
  <div class="browse-image-container">
    <div class="image-wrapper">
      <div class="image">
        <img :src="src">
      </div>
    </div>
    <div/>
    <div>{{ fileName }}</div>
    <el-button size="small" type="primary" class="button-black" @click="deleteBrowseImage(id)">{{ $t('creatives.ci.del') }}</el-button>
  </div>
</template>

<script>
import browseImageController from './BrowseImage'
export default browseImageController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

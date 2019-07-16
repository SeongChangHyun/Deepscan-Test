
<template>
  <div class="browse-image-container">
    <div class="image">
      <img src="@/assets/icon/Delete-img.png" class="delete-icon" @click="deleteBrowseImage(id)">
      <img :src="src" class="image-content">
    </div>
    <div class="file-name">{{ fileName }}</div>
    <div class="file-size">{{ size.width }}x{{ size.height }} / {{ volumn }}KB</div>
  </div>
</template>

<script>
import browseImageController from './BrowseImage'
export default browseImageController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

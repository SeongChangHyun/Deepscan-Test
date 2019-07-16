
<template>
  <div class="ci-browse">
    <div class="image-list">
      <div v-for="(img, index) in importedImages" :key="index" class="item-image">
        <browse-image v-bind="img" @delete-file="deleteFile"/>
      </div>
    </div>
    <div class="upload-area-content">
      <input :id="uploadElementId" class="upload-file" type="file" accept="image/*" multiple @change="onUploadFile">
      <div class="upload-image-icon">
        <img src="@/assets/icon/icon-upload-img.png" class="icon-image" @click="clickUploadFile">
        <p class="upload-des"> {{ $t('creatives.ci.uploadBannerImage') }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import uploadImageController from './UploadImage'
export default uploadImageController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

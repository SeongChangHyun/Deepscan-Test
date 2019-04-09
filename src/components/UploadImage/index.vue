
<template>
  <div class="ci-browse">
    <el-row class="image-list">
      <el-col v-for="img in importedImages" :key="img.id" :span="24/imagesPerRow">
        <browse-image v-bind="img" @delete-file="deleteFile"/>
      </el-col>
    </el-row>
    <div class="upload-area-content">
      <span> {{ $t('creatives.ci.uploadAreaDescription') }} </span><br><br>
      <el-button :disabled="importedImages.length >= 25" type="info" @click="clickUploadFile">{{ $t('creatives.ci.uploadButtonText') }}</el-button>
      <input :id="uploadElementId" class="upload-file" type="file" accept="image/*" multiple @change="onUploadFile">
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

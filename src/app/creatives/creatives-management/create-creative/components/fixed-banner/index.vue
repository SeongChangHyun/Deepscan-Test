<template>
  <div class="fixbanner-container">
    <div class="fixbanner-content">
      <el-col :span="12" class="fixedbanner-left">
        <div class="file-info">
          <div>
            {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.fileInfoLeftTitle') }}
            <input v-model="fileName" type="text" class="file-upload-name">
            {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.fileInfoRightTitle') }}
          </div>
          <el-checkbox v-model="uploadHighResolution">{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadModeDescription') }}</el-checkbox>
        </div>
        <div class="detail-options">
          <div class="detail-options-title" @click="showOptionsArea('detail')">
            <i v-if="showDetailOptions" class="el-icon-caret-bottom"/>
            <i v-else class="el-icon-caret-right"/>
            <span>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.detailOptionsTitle') }}</span>
          </div>
          <div v-if="showDetailOptions" class="detail-options-content">
            <div v-for="item in detailOptions" :key="item.id" class="detail-options-item">
              <div class="item-title">
                <strong>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.' + item.title) }}</strong>
                {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.' + item.description) }}
              </div>
              <div class="item-content">
                <el-checkbox v-model="item.allowEdit" /><el-input v-model="formData[item.key]" :disabled="!item.allowEdit"/>
              </div>
            </div>
          </div>
        </div>
        <div class="advanced-options">
          <div class="advanced-options-title" @click="showOptionsArea('advanced')">
            <i v-if="showAdvancedOptions" class="el-icon-caret-bottom"/>
            <i v-else class="el-icon-caret-right"/>
            <span>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.advancedOptionsTitle') }}</span>
          </div>
          <div v-if="showAdvancedOptions" class="advanced-options-content">
            <div class="item-title"><strong>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.advancedOptionsTag') }}</strong></div>
            <div class="item-content">
              <el-checkbox v-model="allowEditAdvancedTag" /><el-input v-model="formData.htmlTag" :disabled="!allowEditAdvancedTag"/>
            </div>
            <div class="item-title"><strong>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.advancedOptionsDescription') }}</strong></div>
            <div class="item-content">
              <el-checkbox v-model="allowEditAdvancedDescription" /><el-input v-model="formData.description" :disabled="!allowEditAdvancedDescription"/>
            </div>
            <div class="item-title"><strong>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.advancedOptionsBackground') }}</strong></div>
            <div class="item-content">
              <el-checkbox v-model="allowEditAdvancedBackground" />
              <el-select v-model="formData.backgroudColor" :disabled="!allowEditAdvancedBackground">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <el-input v-model="formData.backgroudColor" :disabled="!allowEditAdvancedBackground"/>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="fixedbanner-right">
        <div class="upload-area">
          <div class="upload-area-content">
            <span> {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadAreaDescription') }} </span><br><br>
            <el-button type="info" @click="clickUploadFile">{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadButtonText') }}</el-button>
            <input id="upload-file" type="file" accept="image/*" multiple @change="onUploadFile">
          </div>
        </div>
        <div class="description">
          {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadFileSizeDescription') }}<br>
          {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadFileTypeDescription') }}<br>
          {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadFileNumDescription') }}<br>
          {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadFileSizes1') }}<br>
          {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadFileSizes2') }}<br>
          {{ $t('creatives.creativeManagement.creatCreative.FixedBanner.uploadFileSizes3') }}
        </div>
      </el-col>
    </div>
    <div v-if="importedImages.length > 0" class="imported-images">
      <el-col v-for="item in importedImages" :xs="12" :span="6" :key="item.id" class="imported-image-item">
        <div class="image-area">
          <div v-if="item.src === ''" class="image-area-content">{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.imgLabel') }}</div>
          <img v-else :src="item.src" :alt="item.name" >
        </div>
        <div class="image-file-name">{{ item.filename }}</div>
        <el-button type="info" @click="deleteImage(item.id)">{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.deleteButtonLabel') }}</el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
import FixedBanner from './FixedBanner'
export default FixedBanner
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './FixedBanner.scss';
</style>

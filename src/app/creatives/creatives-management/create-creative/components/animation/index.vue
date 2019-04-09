<template>
  <div class="animation-container">
    <div class="animation-content">
      <el-col :span="12" class="fixed-banner-left">
        <el-form ref="nativeForm" :model="formData" :rules="rules" class="animation-form">
          <div class="file-info">
            <div class="creative-name-title">{{ $t('creatives.creativeManagement.createCreative.creativeNameTitle') }}</div>
            <div>
              {{ getCreativeNamePrefix() }}_
              <input v-model="creativeName" type="text" class="file-upload-name">
              _{{ fileName }}
            </div>
            <el-checkbox v-model="uploadHighResolution">{{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadModeDescription') }}</el-checkbox>
          </div>
          <el-collapse v-model="collapseAnimation">
            <el-collapse-item :title="$t('creatives.creativeManagement.createCreative.fixedBanner.animatedSettingTitle')" name="collapseAnimatedSetting">
              <div class="animated-setting">
                <el-col :span="12" class="animated-setting-col">
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.typesOfAnimated') }}</div>
                  <el-select v-model="formData.typesOfAnimated">
                    <el-option v-for="item in listAnimatedTypes" :key="item" :label="item" :value="item" />
                  </el-select>
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.motionSpeed') }}</div>
                  <el-select v-model="formData.motionSpeeds">
                    <el-option v-for="item in listMotionSpeeds" :key="item" :label="item" :value="item" />
                  </el-select>
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.progressBarStyle') }}</div>
                  <el-select v-model="formData.progressBarStyle">
                    <el-option v-for="item in listProgressBarStyles" :key="item" :label="item" :value="item" />
                  </el-select>
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.progressBarSize') }}</div>
                  <el-select v-model="formData.progressBarSize">
                    <el-option v-for="item in listProgressBarSizes" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-col>
                <el-col :span="12" class="animated-setting-col">
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.borderColors') }}</div>
                  <div class="color-picker-area">
                    <el-color-picker v-model="formData.borderColor" />
                    <el-select v-model="formData.borderType">
                      <el-option v-for="item in listBorderTypes" :key="item" :label="item" :value="item" />
                    </el-select>
                  </div>
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.playStopTerm') }}</div>
                  <el-select v-model="formData.playStopTerm">
                    <el-option v-for="item in listPlayStopTerm" :key="item" :label="item" :value="item" />
                  </el-select>
                  <div class="setting-title">{{ $t('creatives.creativeManagement.createCreative.animatedSetting.progressPosition') }}</div>
                  <el-select v-model="formData.progressPosition">
                    <el-option v-for="item in listProgressPositions" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-col>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('creatives.creativeManagement.createCreative.fixedBanner.detailOptionsTitle')" name="collapseDetailOptions">
              <div class="detail-options-content">
                <detail-options
                  :detail-options="detailOptions"
                  @change-detail-options-form-data="changeDetailOptions"
                />
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsTitle')" name="collapseAdvancedOptions">
              <div class="advanced-options-content">
                <div class="item-title"><strong>{{ $t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsTag') }}</strong></div>
                <div class="item-content">
                  <el-checkbox v-model="allowEditAdvancedTag" /><el-input v-model="formData.htmlTag" :disabled="!allowEditAdvancedTag"/>
                </div>
                <div class="item-title"><strong>{{ $t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsDescription') }}</strong></div>
                <div class="item-content">
                  <el-checkbox v-model="allowEditAdvancedDescription" /><el-input v-model="formData.description" :disabled="!allowEditAdvancedDescription"/>
                </div>
                <div class="item-title"><strong>{{ $t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsBackground') }}</strong></div>
                <div class="item-content">
                  <el-checkbox v-model="allowEditAdvancedBackground" />
                  <el-color-picker v-model="formData.backgroundColor" :disabled="!allowEditAdvancedBackground" />
                  <el-form-item :label="''" prop="backgroundColor">
                    <el-input v-model="formData.backgroundColor" :disabled="!allowEditAdvancedBackground"/>
                  </el-form-item>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-col>
      <el-col :span="12" class="fixed-banner-right">
        <div class="preview-area">
          <strong>{{ $t('creatives.creativeManagement.createCreative.previewButtonText') }}</strong>
          <!-- TO DO: show creative  preview here -->
        </div>
        <div class="upload-area">
          <div class="upload-area-content">
            <upload-image
              :upload-element-id="uploadElementId"
              :image-accept-sizes="imageAcceptSizesDefault"
              :image-accept-types="imageAcceptTypes"
              :imported-images="importedImages"
              :images-per-row="imagesPerRow"
              :click-upload-file="clickUploadFile"
              @delete-image="deleteImageDefaultCi"
              @upload-handler="uploadHandler"
              @on-upload-error="onUploadError"
            />
          </div>
        </div>
        <div class="description">
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizeDescription') }}<br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileTypeDescription') }}<br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileNumDescription') }}<br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizes1') }}<br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizes2') }}<br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizes3') }}
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import Animation from './Animation'
export default Animation
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './Animation.scss';
</style>

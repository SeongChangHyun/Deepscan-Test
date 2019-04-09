<template>
  <div class="create-ci-container">
    <div class="create-ci-content">
      <el-row>
        <el-col :span="12">
          <div class="create-default-ci">
            <div class="default-ci-container">
              <strong>
                <span>{{ $t('creatives.ci.defaultCiTitle') }}</span>
              </strong>
              <div class="file-info">
                <div class="ci-name">
                  {{ prefix }}
                  <input
                    v-model="defaultCiData.fileName"
                    type="text"
                    class="file-upload-name"
                  >
                  {{ $t('creatives.ci.fileInfoRightTitle') }}
                </div>
                <el-checkbox
                  v-model="defaultCiData.uploadHighResolution"
                >{{ $t('creatives.ci.uploadModeDescription') }}</el-checkbox>
              </div>
              <upload-image
                :upload-element-id="defaultCiData.uploadElementId"
                :image-accept-sizes="imageAcceptSizesDefaultCi"
                :image-accept-types="imageAcceptTypes"
                :imported-images="defaultCiData.importedImages"
                :images-per-row="defaultCiData.imagesPerRow"
                :click-upload-file="clickUploadFileDefaultCi"
                @delete-image="deleteImageDefaultCi"
                @upload-handler="uploadHandlerDefaultCi"
                @on-upload-error="onUploadError"
              />
              <detail-options
                :detail-options="defaultCiData.detailOptions"
                @change-detail-options-form-data="changeDetailOptionsFormDataDefaultCi"
              />
              <div class="advanced-options">
                <div class="advanced-options-title" @click="showOptionsArea('advanced')">
                  <i v-if="defaultCiData.showAdvancedOptions" class="el-icon-caret-bottom"/>
                  <i v-else class="el-icon-caret-right"/>
                  <span>{{ $t('creatives.ci.advancedOptionsTitle') }}</span>
                </div>
                <div v-if="defaultCiData.showAdvancedOptions" class="advanced-options-content">
                  <div class="item-title">
                    <strong>{{ $t('creatives.ci.advancedOptionsRollingInterval') }}</strong>
                  </div>
                  <div class="item-content">
                    <el-checkbox v-model="defaultCiData.allowEditAdvancedRollingInterval"/>
                    <el-input
                      v-model="defaultCiData.advancedOptions.rollingInterval"
                      :disabled="!defaultCiData.allowEditAdvancedRollingInterval"
                    />
                  </div>
                  <div class="item-title">
                    <strong>{{ $t('creatives.ci.advancedOptionsBackground') }}</strong>
                  </div>
                  <div class="item-content">
                    <el-checkbox v-model="defaultCiData.allowEditAdvancedBackground"/>

                    <el-color-picker
                      :disabled="!defaultCiData.allowEditAdvancedBackground"
                      v-model="defaultCiData.advancedOptions.backgroundColor"
                    />
                    <el-input
                      v-model="defaultCiData.advancedOptions.backgroundColor"
                      :disabled="!defaultCiData.allowEditAdvancedBackground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="create-rolling-ci">
            <div class="rolling-ci-container">
              <strong>
                <span>{{ $t('creatives.ci.rollingCiTitle') }}</span>
              </strong>
              <div class="file-info">
                <div class="ci-name">
                  {{ prefix }}
                  <input
                    v-model="rollingCiData.fileName"
                    type="text"
                    class="file-upload-name"
                  >
                  {{ $t('creatives.ci.fileInfoRightTitle') }}
                </div>
                <el-checkbox
                  v-model="rollingCiData.uploadHighResolution"
                >{{ $t('creatives.ci.uploadModeDescription') }}</el-checkbox>
              </div>

              <upload-image
                :upload-element-id="rollingCiData.uploadElementId"
                :image-accept-sizes="imageAcceptSizesRollingCi"
                :image-accept-types="imageAcceptTypes"
                :imported-images="rollingCiData.importedImages"
                :images-per-row="rollingCiData.imagesPerRow"
                :click-upload-file="clickUploadFileRollingCi"
                @delete-image="deleteImageRollingCi"
                @upload-handler="uploadHandlerRollingCi"
                @on-upload-error="onUploadError"
              />

              <detail-options
                :detail-options="rollingCiData.detailOptions"
                @change-detail-options-form-data="changeDetailOptionsFormDataRollingCi"
              />

              <div class="description">
                {{ $t('creatives.ci.uploadFileSizeDescription') }}
                <br>
                {{ $t('creatives.ci.uploadFileTypeDescription') }}
                <br>
                {{ $t('creatives.ci.uploadFileNumDescription') }}
                <br>
                {{ $t('creatives.ci.uploadFileSizes1') }}
                <br>
                {{ $t('creatives.ci.uploadFileSizes2') }}
                <br>
                {{ $t('creatives.ci.uploadFileSizes3') }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="action-area">
      <el-button type="info" @click="actionBack()">
        <i class="el-icon-caret-left"/>
        {{ $t('creatives.creativeManagement..createCreative.FixedBanner.backButtonLabel') }}
      </el-button>
      <el-button type="info" @click="actionSave()">
        {{ $t('creatives.creativeManagement..createCreative.FixedBanner.saveButtonLabel') }}
        <i
          class="el-icon-caret-right"
        />
      </el-button>
    </div>
  </div>
</template>

<script>
import createCiController from './CreateCi'
export default createCiController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

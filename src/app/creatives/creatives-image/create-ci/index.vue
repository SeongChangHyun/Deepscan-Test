<template>
  <div class="create-ci-container">
    <el-row type="flex" class="create-ci-content">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="left-container">
        <div class="create-default-ci">
          <el-row class="file-info">
            <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5" class="ci-title">
              <span>{{ $t('creatives.ci.defaultCiTitle') }}</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" class="ci-name">
              <el-input v-model="defaultCiData.fileName" type="text" class="file-upload-name">
                <span slot="prepend">{{ prefix }}</span>
                <span slot="append">{{ $t('creatives.ci.fileInfoRightTitle') }}</span>
              </el-input>
              <el-row class="upload-text">
                <el-checkbox v-model="defaultCiData.uploadHighResolution">{{ $t('creatives.ci.uploadModeDescription') }}</el-checkbox>
              </el-row>
            </el-col>
          </el-row>
          <upload-image
            :upload-element-id="defaultCiData.uploadElementId"
            :image-accept-sizes="imageAcceptSizesDefaultCi"
            :image-accept-types="imageAcceptTypes"
            :imported-images="defaultCiData.importedImages"
            :images-per-row="defaultCiData.imagesPerRow"
            :click-upload-file="clickUploadFileDefaultCi"
            @delete-image="deleteImageDefaultCi"
            @upload-handler="uploadHandlerDefaultCi"
            @on-upload-error="onUploadError"/>
          <div class="advanced-options">
            <el-collapse v-model="defaultCiData.showAdvancedOptions" class="expand-container">
              <el-collapse-item :title="$t('creatives.ci.advancedOptionsTitle')" name="target_goal" class="collapse-panel">
                <div class="advanced-options-content">
                  <div class="rolling-title">
                    {{ $t('creatives.ci.advancedOptionsRollingInterval') }}
                  </div>
                  <div class="rolling-content">
                    <el-checkbox v-model="defaultCiData.allowEditAdvancedRollingInterval"/>
                    <el-input v-model="defaultCiData.advancedOptions.rollingInterval" :disabled="!defaultCiData.allowEditAdvancedRollingInterval"/>
                  </div>
                  <div class="background-title">
                    {{ $t('creatives.ci.advancedOptionsBackground') }}
                  </div>
                  <div class="background-content">
                    <el-checkbox v-model="defaultCiData.allowEditAdvancedBackground"/>
                    <el-color-picker :disabled="!defaultCiData.allowEditAdvancedBackground" v-model="defaultCiData.advancedOptions.backgroundColor"/>
                    <el-input v-model="defaultCiData.advancedOptions.backgroundColor" :disabled="!defaultCiData.allowEditAdvancedBackground"/>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <detail-options :detail-options="defaultCiData.detailOptions" @change-detail-options-form-data="changeDetailOptionsFormDataDefaultCi"/>
        </div>
      </el-col>
      <el-col class="middle-space">
        <p/>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="right-container">
        <div class="create-rolling-ci">
          <el-row class="file-info">
            <span>{{ $t('creatives.ci.rollingCiTitle') }}</span>
          </el-row>
          <el-row class="checkbox-text">
            <el-checkbox v-model="rollingCiData.uploadHighResolution">{{ $t('creatives.ci.uploadModeDescription') }}</el-checkbox>
          </el-row>
          <upload-image
            :upload-element-id="rollingCiData.uploadElementId"
            :image-accept-sizes="imageAcceptSizesRollingCi"
            :image-accept-types="imageAcceptTypes"
            :imported-images="rollingCiData.importedImages"
            :images-per-row="rollingCiData.imagesPerRow"
            :click-upload-file="clickUploadFileRollingCi"
            @delete-image="deleteImageRollingCi"
            @upload-handler="uploadHandlerRollingCi"
            @on-upload-error="onUploadError"/>
          <detail-options :detail-options="rollingCiData.detailOptions" @change-detail-options-form-data="changeDetailOptionsFormDataRollingCi"/>

          <div class="description">
            {{ $t('creatives.ci.uploadFileSizeDescription') }}
            <br>
            {{ $t('creatives.ci.uploadFileTypeDescription') }}
            <br>
            {{ $t('creatives.ci.uploadFileNumDescription') }}
            <br>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="action-area">
      <el-button type="info" class="back-button" @click="actionBack()">
        <span>{{ $t('creatives.common.back') }}</span>
      </el-button>
      <el-button type="info" class="save-button" @click="actionSave()">
        <span>{{ $t('creatives.common.save') }}</span>
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

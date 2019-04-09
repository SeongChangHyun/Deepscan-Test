<template>
  <div class="fixbanner-container">
    <div class="fixbanner-content">
      <el-col :span="12" class="fixed-banner-left">
        <div class="file-info">
          <div class="creative-name-title">{{ $t('creatives.creativeManagement.createCreative.creativeNameTitle') }}</div>
          <div>
            {{ getCreativeNamePrefix() }}_
            <input v-model="creativeName" type="text" class="file-upload-name">
            _{{ fileName }}
          </div>
          <el-checkbox v-model="uploadHighResolution">{{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadModeDescription') }}</el-checkbox>
        </div>
        <el-collapse v-model="collapseFixedBanner">
          <el-collapse-item :title="$t('creatives.creativeManagement.createCreative.fixedBanner.animatedSettingTitle')" name="collapseDetailOptions">
            <div class="detail-options-content">
              <detail-options
                :detail-options="detailOptions"
                @change-detail-options-form-data="changeDetailOptions"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item :title="$t('creatives.creativeManagement.createCreative.fixedBanner.animatedSettingTitle')" name="collapseAdvancedOptions">
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
                <el-color-picker v-model="formData.backgroundColor" />
                <el-input v-model="formData.backgroundColor" :disabled="!allowEditAdvancedBackground"/>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="12" class="fixed-banner-right">
        <div class="upload-area">
          <div class="upload-area-content">
            <span> {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadAreaDescription') }} </span><br><br>
            <el-button type="info" @click="clickUploadFile">{{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadButtonText') }}</el-button>
            <input id="upload-file" type="file" accept="image/*" multiple @change="onUploadFile">
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
import FixedBanner from './FixedBanner'
export default FixedBanner
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './FixedBanner.scss';
</style>

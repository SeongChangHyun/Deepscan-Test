<template>
  <div class="fixbanner-container">
    <div class="fixbanner-content">
      <el-col :span="12" class="fixed-banner-left">
        <el-form ref="nativeForm" :model="formData" :rules="rules" class="fixedbanner-form">
          <el-row class="row-item">
            <el-col :xs="24" :sm="6" :md="24" :lg="6" :xl="6">
              <span class="creative-name-info">{{ $t('creatives.creativeManagement.createCreative.creativeNameTitle') }}</span>
            </el-col>
            <el-col :xs="24" :sm="18" :md="24" :lg="18" :xl="18">
              <span class="current-date">{{ currentDate }}_</span>
              <el-input v-model="creativeName" class="input-name input-uploadImg input-common"/>
              <span>_{{ fileName }}</span>
            </el-col>
          </el-row>

          <el-row class="row-item">
            <el-col :xs="24" :sm="6" :md="24" :lg="6" :xl="6">
              <span class="creative-name-info">{{ $t('creatives.creativeManagement.createCreative.defaultBanner') }}<span class="redStar">*</span>:</span>
            </el-col>
            <el-col :xs="24" :sm="18" :md="24" :lg="18" :xl="18">
              <el-col :xs="18" :sm="20" :md="20" :lg="20" :xl="20">
                <el-form-item prop="owner" class="">
                  <el-input v-model="creativeName" class="input-uploadImg input-common"/>
                </el-form-item>
              </el-col>
              <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" class="">
                <el-form-item class="">
                  <el-button
                    :loading="loading"
                    class="btn-uploadImg btn-common">Browse</el-button>
                </el-form-item>
              </el-col>
              <el-checkbox
                v-model="formData.is_retina_image"
                class="upload-checkbox"
              >{{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadModeDescription') }}</el-checkbox>
              <div class="note-text">{{ $t('creatives.creativeManagement.createCreative.uploadFileSizeDefault') }}</div>
            </el-col>
          </el-row>

          <el-row class="row-item">
            <el-col :xs="24" :sm="6" :md="24" :lg="6" :xl="6">
              <span class="creative-name-info">{{ $t('creatives.creativeManagement.createCreative.subBannerTitle') }}</span>
            </el-col>
            <el-col :xs="24" :sm="18" :md="24" :lg="18" :xl="18">
              <el-col :xs="12" :sm="20" :md="15" :lg="18" :xl="18">
                <el-form-item prop="owner" class="">
                  <el-input v-model="creativeName" class="input-uploadImg input-common"/>
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="4" :md="9" :lg="6" :xl="6" class="">
                <el-form-item class="group_btnAction">
                  <el-button
                    :loading="loading"
                    class="btn-uploadImg btn-common">Browse</el-button>
                  <el-button
                    :loading="loading"
                    class="btn-deleteImg btn-common"><img src="@/assets/icon/delete_white.png" class="icon-remove">Del</el-button>
                </el-form-item>
              </el-col>
              <el-checkbox
                v-model="formData.is_retina_image"
                class="upload-checkbox"
              >{{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadModeDescription') }}</el-checkbox>
              <div>{{ $t('creatives.creativeManagement.createCreative.uploadFileSizeSubBanner') }}</div>
            </el-col>
          </el-row>

          <el-collapse v-model="collapseFixedBanner">
            <el-collapse-item
              :title="$t('creatives.creativeManagement.createCreative.fixedBanner.animatedSettingTitle')"
              name="collapseAdvancedOptions">
              <div class="advanced-options-content">
                <div class="item-title">
                  <strong>{{ $t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsTag') }}</strong>
                </div>
                <div class="item-content">
                  <el-checkbox v-model="allowEditAdvancedTag"/>
                  <el-input v-model="formData.alt" :disabled="!allowEditAdvancedTag" class="input-common"/>
                </div>
                <div class="item-title">
                  <strong>{{ $t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsDescription') }}</strong>
                </div>
                <div class="item-content">
                  <el-checkbox v-model="allowEditAdvancedDescription"/>
                  <el-input
                    v-model="formData.banner_text"
                    :disabled="!allowEditAdvancedDescription"
                    class="input-common"
                  />
                </div>
                <div class="item-title">
                  <strong>{{ $t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsBackground') }}</strong>
                </div>
                <div class="item-content">
                  <el-checkbox v-model="allowEditAdvancedBackground"/>
                  <el-color-picker
                    v-model="formData.extend_options.outer_color"
                    :disabled="!allowEditAdvancedBackground"
                    class="color-picker"
                  />
                  <el-form-item :label="''" prop="outer_color">
                    <el-input
                      v-model="formData.extend_options.outer_color"
                      :disabled="!allowEditAdvancedBackground"
                      class="input-common"
                    />
                  </el-form-item>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item
              :title="$t('creatives.creativeManagement.createCreative.fixedBanner.detailOptionsTitle')"
              name="collapseDetailOptions">
              <div class="detail-options-content">
                <div>
                  <el-form-item
                    v-for="item in CreativeConstant.DETAIL_OPTIONS"
                    :key="item.id"
                    :prop="item.field"
                  >
                    <div class="item-title">
                      <strong>{{ genOptionI18n(item.title) }}</strong>
                      {{ genOptionI18n(item.description) }}
                    </div>
                    <el-checkbox v-model="item.allowEdit"/>
                    <el-input v-model="formData[item.field]" :disabled="!item.allowEdit" class="input-common"/>
                  </el-form-item>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-col>

      <el-col :span="12" class="fixed-banner-right">
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
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizeDescription') }}
          <br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileTypeDescription') }}
          <br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileNumDescription') }}
          <br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizes1') }}
          <br>
          {{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadFileSizes2') }}
          <br>
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
@import "./FixedBanner.scss";
</style>

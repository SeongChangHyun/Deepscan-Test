<template>
  <div class="animation-container">
    <div class="animation-content">
      <el-col :span="12" class="fixed-banner-left">
        <el-form ref="nativeForm" :model="formData" :rules="rules" class="animation-form">
          <el-row class="row-item">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <span class="creative-name-info">{{ $t('creatives.creativeManagement.createCreative.creativeNameTitle') }}</span>
            </el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
              <span class="current-date">{{ currentDate }}_</span>
              <el-input v-model="creativeName" class="input-name input-uploadImg input-common"/>
              <span>_{{ fileName }}</span>
              <el-checkbox
                v-model="formData.is_retina_image"
                class="upload-checkbox"
              >{{ $t('creatives.creativeManagement.createCreative.fixedBanner.uploadModeDescription') }}</el-checkbox>
            </el-col>
          </el-row>
          <el-collapse v-model="collapseAnimation">
            <el-collapse-item
              :title="$t('creatives.creativeManagement.createCreative.fixedBanner.animatedSettingTitle')"
              name="collapseAnimatedSetting">
              <div class="animated-setting">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="animated-setting-col">
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.typesOfAnimated') }}</div>
                  <el-select v-model="formData.option.transition_type" class="input-common">
                    <el-option
                      v-for="item in listAnimatedTypes"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.motionSpeed') }}</div>
                  <el-select v-model="formData.option.transition_ms" class="input-common">
                    <el-option
                      v-for="item in listMotionSpeeds"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.progressBarStyle') }}</div>
                  <el-select v-model="formData.option.gauge_style" class="input-common">
                    <el-option
                      v-for="item in listProgressBarStyles"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.progressBarSize') }}</div>
                  <el-select v-model="formData.option.gauge_size" class="input-common">
                    <el-option
                      v-for="item in listProgressBarSizes"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="animated-setting-col">
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.borderColors') }}</div>
                  <div class="color-picker-area">
                    <el-color-picker v-model="formData.option.border_color" class="color-picker"/>
                    <el-select v-model="formData.option.border_px" class="input-common">
                      <el-option
                        v-for="item in listBorderTypes"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.playStopTerm') }}</div>
                  <el-select v-model="formData.option.scene_time" class="input-common">
                    <el-option
                      v-for="item in listPlayStopTerm"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <div
                    class="setting-title"
                  >{{ $t('creatives.creativeManagement.createCreative.animatedSetting.progressPosition') }}</div>
                  <el-select v-model="formData.option.gauge_position" class="input-common">
                    <el-option
                      v-for="item in listProgressPositions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <el-button
                    class="preview-button btn-common"
                  >{{ $t('creatives.creativeManagement.createCreative.previewButtonText') }}</el-button>
                </el-col>
              </div>
            </el-collapse-item>
            <el-collapse-item
              :title="$t('creatives.creativeManagement.createCreative.fixedBanner.advancedOptionsTitle')"
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
                  <el-form-item prop="outer_color" >
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
                <div v-if="showDetailOptions">
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
import Animation from './Animation'
export default Animation
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./Animation.scss";
</style>

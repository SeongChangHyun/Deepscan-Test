<template>
  <el-form :model="formData" :rules="rules" label-position="top">
    <div>
      <el-row class="update-content">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div>
            <span class="creative-name">{{ genI18n('creativeNameTitle') }}</span>
            <div class="creative-name-content">
              <span>{{ formData.baseDynamicFormPrefix }}</span>
              <input v-model="formData.baseDynamicFormName" type="text" class="inputCreative-name">
              <span>{{ creative.theme }}</span>
            </div>
            <span class="creative-name">{{ genI18n('creativeSizeTitle') }}</span>
            <div class="creative-name-content">
              <span>{{ formData.baseDynamicFormSize }}</span>
            </div>
          </div>
          <div class="creative-name" @click="showAnimatedAndDetail">
            <i class="el-icon-caret-bottom"/>
            {{ genI18n('animatedAndDetailSettingTitle') }}
          </div>
          <div v-if="isShowAnimatedAndDetail" class="align-left">
            <el-form-item :label="genI18n('motionSpeedTitle')" class="form-item">
              <el-row>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                  <el-select
                    v-model="formData.baseDynamicFormMotionSpeed"
                    :placeholder="genI18n('select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in motionSpeed"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <p/>
                </el-col>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                  <el-button type="primary" class="full-width-column">
                    {{ $t('creatives.common.preview') }}
                    <i class="el-icon-caret-right"/>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              :label="genI18n('callToAction')"
              prop="baseDynamicFormCallToAction"
              class="form-item call-error-message align-bottom"
            >
              <el-row>
                <el-input v-model="formData.baseDynamicFormCallToAction"/>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item :label="genI18n('borderColors')" class="form-item">
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormBorderColors"/>
                  </el-col>
                  <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                    <p/>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="creative.option.borderColor" class="full-width-column"/>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <p/>
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item :label="genI18n('intervalBackgroundColorTitle')" class="form-item">
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormInternalBackgroundColor"/>
                  </el-col>
                  <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                    <p/>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="creative.option.internalBgColor" class="full-width-column"/>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item :label="genI18n('lineColor')" class="form-item">
                  <el-select
                    v-model="formData.baseDynamicFormDividingLineColor"
                    :placeholder="genI18n('select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in lineColors"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <p/>
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item :label="genI18n('selectedBackgroundColor')" class="form-item">
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormSelectedBackgroundColor"/>
                  </el-col>
                  <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                    <p/>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="creative.option.selectedBgColor" class="full-width-column"/>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              :label="genI18n('titleFontColorSizeTitle')"
              prop="baseDynamicFormTitleColor"
              class="form-item color-error-message"
            >
              <el-row>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormTitleColor"/>
                  </el-col>
                  <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                    <p/>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="formData.baseDynamicFormTitleColor"/>
                  </el-col>
                </el-col>
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-input
                    v-model="formData.baseDynamicFormTitleSize"
                    class="title-font-size title-font-size-hover"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              :label="genI18n('priceFontColorSizeTitle')"
              prop="baseDynamicFormPriceColor"
              class="form-item color-error-message"
            >
              <el-row>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormPriceColor"/>
                  </el-col>
                  <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                    <p/>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="formData.baseDynamicFormPriceColor"/>
                  </el-col>
                </el-col>
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-input
                    v-model="formData.baseDynamicFormPriceSize"
                    class="title-font-size title-font-size-hover"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              :label="genI18n('ctaFontColorSizeTitle')"
              prop="baseDynamicFormCTAColor"
              class="form-item color-error-message"
            >
              <el-row>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormCTAColor"/>
                  </el-col>
                  <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                    <p/>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="formData.baseDynamicFormCTAColor"/>
                  </el-col>
                </el-col>
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-input
                    v-model="formData.baseDynamicFormCTASize"
                    class="title-font-size title-font-size-hover"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item :label="genI18n('label')" class="form-item align-bottom">
              <el-row>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                  <el-select
                    v-model="formData.baseDynamicFormLabel"
                    :placeholder="genI18n('select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in backgroundLabel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <div>
            <hr class="horizontal">
            <hr class="horizontal">
          </div>
          <div>
            <el-checkbox
              v-model="formData.baseDynamicFormApplyChange"
              class="apply-all-change"
            >{{ genI18n('applySettingToSameTemplateTitle') }}</el-checkbox>
          </div>
          <div class="advanced-options">
            <div class="creative-name" @click="showAdvancedOptions">
              <i class="el-icon-caret-bottom"/>
              {{ genI18n('advancedOptions') }}
            </div>
            <div v-if="isShowAdvancedOptions" class="align-left">
              <!-- ++++++++++++ -->
              <el-form-item :label="genI18n('backgroundImage')" class="form-item">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormBackgroundImageEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <!-- +++++++++ -->
                      <el-input
                        v-model="formData.baseDynamicFormBackgroundImage"
                        :disabled="!editMode.baseDynamicFormBackgroundImageEditMode"
                      />
                      <!-- +++++++++ -->
                    </el-col>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <!-- +++++++++ -->
                      <el-upload
                        :disabled="!editMode.baseDynamicFormBackgroundImageEditMode"
                        :auto-upload="autoUpload"
                        :on-change="getUploadBGImageFileName"
                        action
                        class="upload-file"
                      >
                        <!-- +++++++++ -->
                        <el-button
                          slot="trigger"
                          size="small"
                          type="primary"
                          class="btn-size"
                        >{{ $t('creatives.common.browse') }}</el-button>
                      </el-upload>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <p/>
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <p class="upload-image-tip">{{ genI18n('backgroundImageDescription') }}</p>
                </el-col>
              </el-row>
              <el-form-item
                :label="genI18n('externalBackgroundColor')"
                class="form-item color-error-message-external"
                prop="baseDynamicFormExternalBackgroundColor"
              >
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormExternalBackgroundColorEditMode"/>
                  </el-col>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-color-picker v-model="formData.baseDynamicFormExternalBackgroundColor"/>
                  </el-col>
                  <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21" class="input-margin-left">
                    <el-input
                      v-model="formData.baseDynamicFormExternalBackgroundColor"
                      :disabled="!editMode.baseDynamicFormExternalBackgroundColorEditMode"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </div>
          <div class="promotion-img-options">
            <div class="creative-name" @click="showPromotionImageOptions">
              <i class="el-icon-caret-bottom"/>
              {{ genI18n('promotionImageOptions') }}
            </div>
            <div v-if="isShowPromotionImageOptions" class="align-left">
              <el-form-item :label="genI18n('promotionImage')" class="form-item">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormPromotionImageEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <!-- +++++++++ -->
                      <el-input
                        v-model="formData.baseDynamicFormPromotionImage"
                        :disabled="!editMode.baseDynamicFormPromotionImageEditMode"
                      />
                      <!-- +++++++++ -->
                    </el-col>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <!-- ++++++++++++++ -->
                      <el-upload
                        :disabled="!editMode.baseDynamicFormPromotionImageEditMode"
                        :auto-upload="autoUpload"
                        :on-change="getUploadPromotionImageFileName"
                        action
                        class="upload-file"
                      >
                        <!-- +++++++++ -->
                        <el-button
                          slot="trigger"
                          size="small"
                          type="primary"
                          class="btn-size"
                        >{{ $t('creatives.common.browse') }}</el-button>
                      </el-upload>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <p/>
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <p class="upload-image-tip">{{ genI18n('backgroundImageDescription') }}</p>
                </el-col>
              </el-row>
              <el-form-item :label="genI18n('clickUrlWebsite')" class="form-item" prop="baseDynamicFormClickUrlWeb">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormClickUrlWebEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlWebEditMode"
                      v-model="formData.baseDynamicFormClickUrlWeb"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item
                :label="genI18n('impressionCheckUrlWebsite')"
                class="form-item"
                prop="baseDynamicFormImpressionCheckUrlWeb"
              >
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormImpressionCheckUrlWebEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckUrlWebEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckUrlWeb"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="genI18n('clickUrlAndroid')" class="form-item color-error-message-external">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormClickUrlAndroidAppEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlAndroidAppEditMode"
                      v-model="formData.baseDynamicFormClickUrlAndroidApp"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="genI18n('impressionCheckClickUrlAndroid')" class="form-item color-error-message-external">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox
                      v-model="editMode.baseDynamicFormImpressionCheckClickUrlAndroidEditMode"
                    />
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckClickUrlAndroidEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckClickUrlAndroid"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="genI18n('clickUrlIos')" class="form-item">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormClickUrlIosAppEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlIosAppEditMode"
                      v-model="formData.baseDynamicFormClickUrlIosApp"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="genI18n('impressionCheckClickUrlIos')" class="form-item">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox
                      v-model="editMode.baseDynamicFormImpressionCheckClickUrlIosAppEditMode"
                    />
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckClickUrlIosAppEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckClickUrlIosApp"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="genI18n('clickUrlEventPage')" class="form-item">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox v-model="editMode.baseDynamicFormClickUrlEventPageEditMode"/>
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlEventPageEditMode"
                      v-model="formData.baseDynamicFormClickUrlEventPage"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="genI18n('impressionCheckClickUrlEventPage')" class="form-item">
                <el-row>
                  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <el-checkbox
                      v-model="editMode.baseDynamicFormImpressionCheckClickUrlEventPageEditMode"
                    />
                  </el-col>
                  <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckClickUrlEventPageEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckClickUrlEventPage"
                      class="full-width-column"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="footer-btn">
        <el-button type="primary">
          <i class="el-icon-caret-left"/>
          {{ $t('creatives.common.back') }}
        </el-button>
        <el-button type="primary">
          {{ $t('creatives.common.save') }}
          <i class="el-icon-caret-right"/>
        </el-button>
      </el-row>
    </div>
  </el-form>
</template>
<script>
import updateCreativeController from './UpdateCreative.js'
export default updateCreativeController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./UpdateCreative.scss";
</style>

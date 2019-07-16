<template>
  <div>
    <el-form ref="updateDynamicBatch1Form" :model="formData" :rules="rules">
      <el-row class="update-content">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div>
            <span class="creative-name">{{ genI18n('creativeNameTitle') }}</span>
            <el-form-item class="creative-name-content" prop="baseDynamicFormName">
              <span>{{ formData.baseDynamicFormPrefix }}</span>
              <input v-model="formData.baseDynamicFormName" type="text" class="inputCreative-name">
              <span>{{ formData.baseDynamicFormTheme }}</span>
            </el-form-item>
            <span class="creative-name">{{ genI18n('creativeSizeTitle') }}</span>
            <div class="creative-name-content">
              <span>{{ formData.baseDynamicFormSize }}</span>
            </div>
          </div>
          <div class="creative-name" @click="showAnimatedAndDetail">
            <i :class="[isShowAnimatedAndDetail ? 'el-icon-caret-bottom' : 'el-icon-caret-right']"/>
            {{ genI18n('animatedAndDetailSettingTitle') }}
          </div>
          <div v-if="isShowAnimatedAndDetail" class="align-left">
            <el-row class="motion-row">
              <p class="motion">{{ genI18n('motionTypeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item prop="baseDynamicFormMotionType">
                  <el-select
                    v-model="formData.baseDynamicFormMotionType"
                    :placeholder="genI18n('select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in motionTypes"
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
                <el-button type="primary" class="full-width-column">
                  {{ $t('creatives.common.preview') }}
                  <i class="el-icon-caret-right"/>
                </el-button>
              </el-col>
            </el-row>

            <el-row class="motion-row">
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p class="motion">{{ genI18n('motionSpeedTitle') }}</p>
                <el-form-item prop="baseDynamicFormMotionSpeed">
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
                </el-form-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <p/>
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p class="motion">{{ genI18n('motionIntervalTitle') }}</p>
                <el-form-item prop="baseDynamicFormMotionInterval">
                  <el-select
                    v-model="formData.baseDynamicFormMotionInterval"
                    :placeholder="genI18n('select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in motionInterval"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="isCallToFunction" class="motion-row call-to-action">
              <p class="motion">{{ genI18n('callToAction') }}</p>
              <el-form-item prop="baseDynamicFormCallToAction">
                <el-input v-model="formData.baseDynamicFormCallToAction"/>
              </el-form-item>
            </el-row>

            <el-row class="motion-row">
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p class="motion">{{ genI18n('intervalBackgroundColorTitle') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-form-item prop="baseDynamicFormInternalBackgroundColor">
                    <el-color-picker v-model="formData.baseDynamicFormInternalBackgroundColor"/>
                  </el-form-item>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormInternalBackgroundColor">
                    <el-input
                      v-model="formData.baseDynamicFormInternalBackgroundColor"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <p/>
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p class="motion">{{ genI18n('label') }}</p>
                <el-form-item prop="baseDynamicFormLabel">
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
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <p class="motion">{{ genI18n('titleFontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-form-item prop="baseDynamicFormTitleColor">
                    <el-color-picker v-model="formData.baseDynamicFormTitleColor"/>
                  </el-form-item>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormTitleColor">
                    <el-input v-model="formData.baseDynamicFormTitleColor"/>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <hr class="diagonal diagonal-batch2">
              </el-col>
              <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <el-form-item prop="baseDynamicFormTitleSize">
                  <el-input v-model="formData.baseDynamicFormTitleSize" class="title-font-size"/>
                </el-form-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <hr class="diagonal diagonal-batch2">
              </el-col>
              <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <el-form-item prop="baseDynamicFormTitleBold">
                  <el-checkbox
                    v-model="formData.baseDynamicFormTitleBold"
                    class="bold-check"
                  >{{ genI18n('bold') }}</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <p class="motion">{{ genI18n('priceFontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-form-item prop="baseDynamicFormPriceColor">
                    <el-color-picker v-model="formData.baseDynamicFormPriceColor"/>
                  </el-form-item>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormPriceColor">
                    <el-input v-model="formData.baseDynamicFormPriceColor"/>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <hr class="diagonal diagonal-batch2">
              </el-col>
              <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <el-form-item prop="baseDynamicFormPriceSize">
                  <el-input v-model="formData.baseDynamicFormPriceSize" class="title-font-size"/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <hr class="horizontal">
            <hr class="horizontal">
          </div>
          <div>
            <el-form-item prop="baseDynamicFormApplyChange">
              <el-checkbox
                v-model="formData.baseDynamicFormApplyChange"
                class="apply-all-change"
              >{{ genI18n('applySettingToSameTemplateTitle') }}</el-checkbox>
            </el-form-item>
          </div>
          <div class="advanced-options">
            <div class="creative-name" @click="showAdvancedOptions">
              <i :class="[isShowAdvancedOptions ? 'el-icon-caret-bottom' : 'el-icon-caret-right']" />
              {{ genI18n('advancedOptions') }}
            </div>
            <div v-if="isShowAdvancedOptions" class="align-left">
              <el-row class="background-img">
                <p class="motion align-bottom">{{ genI18n('backgroundImage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-form-item prop="baseDynamicFormBackgroundImageEditMode">
                    <el-checkbox
                      v-model="editMode.baseDynamicFormBackgroundImageEditMode"
                      class="background-img-checkbox"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item prop="baseDynamicFormBackgroundImage">
                      <el-input
                        v-model="formData.baseDynamicFormBackgroundImage"
                        :disabled="!editMode.baseDynamicFormBackgroundImageEditMode"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <el-upload
                      :disabled="!editMode.baseDynamicFormBackgroundImageEditMode"
                      :auto-upload="autoUpload"
                      action
                    >
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
              <el-row class="background-img">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <p/>
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <p class="upload-image-tip">{{ genI18n('backgroundImageDescription') }}</p>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p class="motion align-bottom">{{ genI18n('externalBackgroundColor') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormExternalBackgroundColorEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-form-item prop="baseDynamicFormExternalBackgroundColor">
                    <el-color-picker
                      v-model="formData.baseDynamicFormExternalBackgroundColor"
                      :disabled="!editMode.baseDynamicFormExternalBackgroundColorEditMode"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21" class="input-margin-left">
                  <el-form-item prop="baseDynamicFormExternalBackgroundColor">
                    <el-input
                      v-model="formData.baseDynamicFormExternalBackgroundColor"
                      :disabled="!editMode.baseDynamicFormExternalBackgroundColorEditMode"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="promotion-img-options">
            <div class="creative-name" @click="showPromotionImageOptions">
              <i :class="[isShowPromotionImageOptions ? 'el-icon-caret-bottom' : 'el-icon-caret-right']" />
              {{ genI18n('promotionImageOptions') }}
            </div>
            <div v-if="isShowPromotionImageOptions" class="align-left">
              <el-row class="background-img">
                <p class="motion align-bottom">{{ genI18n('promotionImage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormPromotionImageEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item prop="baseDynamicFormPromotionImage">
                      <el-input
                        v-model="formData.baseDynamicFormPromotionImage"
                        :disabled="!editMode.baseDynamicFormPromotionImageEditMode"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <el-upload
                      :disabled="!editMode.baseDynamicFormPromotionImageEditMode"
                      :auto-upload="autoUpload"
                      action
                    >
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
              <el-row class="background-img">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <p/>
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <p class="upload-image-tip">{{ genI18n('backgroundImageDescription') }}</p>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('clickUrlWebsite') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlWebEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormClickUrlWeb">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlWebEditMode"
                      v-model="formData.baseDynamicFormClickUrlWeb"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('impressionCheckUrlWebsite') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckUrlWebEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormImpressionCheckUrlWeb">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckUrlWebEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckUrlWeb"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('clickUrlAndroid') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlAndroidAppEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormClickUrlAndroidApp">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlAndroidAppEditMode"
                      v-model="formData.baseDynamicFormClickUrlAndroidApp"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('impressionCheckClickUrlAndroid') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckClickUrlAndroidEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormImpressionCheckClickUrlAndroid">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckClickUrlAndroidEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckClickUrlAndroid"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('clickUrlIos') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlIosAppEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormClickUrlIosApp">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlIosAppEditMode"
                      v-model="formData.baseDynamicFormClickUrlIosApp"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('impressionCheckClickUrlIos') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckClickUrlIosAppEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormImpressionCheckClickUrlIosApp">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckClickUrlIosAppEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckClickUrlIosApp"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('clickUrlEventPage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlEventPageEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormClickUrlEventPage">
                    <el-input
                      :disabled="!editMode.baseDynamicFormClickUrlEventPageEditMode"
                      v-model="formData.baseDynamicFormClickUrlEventPage"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ genI18n('impressionCheckClickUrlEventPage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckClickUrlEventPageEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-form-item prop="baseDynamicFormImpressionCheckClickUrlEventPage">
                    <el-input
                      :disabled="!editMode.baseDynamicFormImpressionCheckClickUrlEventPageEditMode"
                      v-model="formData.baseDynamicFormImpressionCheckClickUrlEventPage"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="footer-btn">
        <el-button type="primary">
          <i class="el-icon-caret-left"/>
          {{ $t('creatives.common.back') }}
        </el-button>
        <el-button type="primary" @click="onSave">
          {{ $t('creatives.common.save') }}
          <i class="el-icon-caret-right"/>
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import updateCreativeController from './UpdateCreative.js'
export default updateCreativeController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './UpdateCreative.scss'
</style>

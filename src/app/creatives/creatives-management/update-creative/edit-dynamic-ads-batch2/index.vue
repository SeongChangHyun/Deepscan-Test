<template>
  <div>
    <el-form ref="updateDynamicBatch2Form" :model="formData" :rules="rules">
      <el-row class="update-content">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div>
            <span
              class="creative-name"
            >{{ $t('creatives.creativeManagement.updateCreative.creativeNameTitle') }}</span>
            <div class="creative-name-content">
              <span>{{ formData.baseDynamicFormPrefix }}</span>
              <input v-model="formData.baseDynamicFormName" type="text" class="inputCreative-name">
              <span>{{ formData.baseDynamicFormTheme }}</span>
            </div>
            <span
              class="creative-name"
            >{{ $t('creatives.creativeManagement.updateCreative.creativeSizeTitle') }}</span>
            <div class="creative-name-content">
              <span>{{ formData.baseDynamicFormSize }}</span>
            </div>
          </div>
          <div class="creative-name" @click="showAnimatedAndDetail">
            <i class="el-icon-caret-bottom"/>
            {{ $t('creatives.creativeManagement.updateCreative.animatedAndDetailSettingTitle') }}
          </div>
          <div v-if="isShowAnimatedAndDetail" class="align-left">
            <el-row class="motion-row">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.motionSpeedTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-select
                  v-model="formData.baseDynamicFormMotionSpeed"
                  :placeholder="$t('creatives.creativeManagement.updateCreative.select')"
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

            <el-row class="motion-row">
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p
                  class="motion"
                >{{ $t('creatives.creativeManagement.updateCreative.borderColors') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormBorderColors"/>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormBorderColors">
                    <el-input
                      v-model="formData.baseDynamicFormBorderColors"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <p/>
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p
                  class="motion"
                >{{ $t('creatives.creativeManagement.updateCreative.intervalBackgroundColorTitle') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormInternalBackgroundColor"/>
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
            </el-row>
            <el-row class="motion-row">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.titleFontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormTitleColor"/>
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
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <el-input v-model="formData.baseDynamicFormTitleSize" class="title-font-size"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-select
                    v-model="titleSelect"
                    :placeholder="$t('creatives.creativeManagement.updateCreative.select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in titleSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.priceFontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormPriceColor"/>
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
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <el-input v-model="formData.baseDynamicFormPriceSize" class="title-font-size"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-select
                    v-model="priceSelect"
                    :placeholder="$t('creatives.creativeManagement.updateCreative.select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in priceSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.ctaFontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormCTAColor"/>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormCTAColor">
                    <el-input v-model="formData.baseDynamicFormCTAColor"/>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <hr class="diagonal diagonal-batch2">
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <el-input v-model="formData.baseDynamicFormCTASize" class="title-font-size"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-input v-model="formData.baseDynamicFormCTAColor"/>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p
                  class="motion"
                >{{ $t('creatives.creativeManagement.updateCreative.selectedBorderColors') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormSelectedBorderColor"/>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormSelectedBorderColor">
                    <el-input
                      v-model="formData.baseDynamicFormSelectedBorderColor"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <p/>
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <p
                  class="motion"
                >{{ $t('creatives.creativeManagement.updateCreative.selectedBackgroundColor') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormSelectedBackgroundColor"/>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormSelectedBackgroundColor">
                    <el-input
                      v-model="formData.baseDynamicFormSelectedBackgroundColor"
                      class="full-width-column"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.option1FrontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormOption1Color"/>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormOption1Color">
                    <el-input v-model="formData.baseDynamicFormOption1Color"/>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <hr class="diagonal diagonal-batch2">
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <el-input v-model="formData.baseDynamicFormOption1Size" class="title-font-size"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-select
                    v-model="option1Select"
                    :placeholder="$t('creatives.creativeManagement.updateCreative.select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in option1Select"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="motion-row">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.option2FrontColorSizeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker v-model="formData.baseDynamicFormOption2Color"/>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <p/>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-form-item prop="baseDynamicFormOption2Color">
                    <el-input v-model="formData.baseDynamicFormOption2Color"/>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <hr class="diagonal diagonal-batch2">
              </el-col>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                  <el-input v-model="formData.baseDynamicFormOption2Size" class="title-font-size"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <hr class="diagonal diagonal-batch2">
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-select
                    v-model="option2Select"
                    :placeholder="$t('creatives.creativeManagement.updateCreative.select')"
                    class="full-width-column"
                  >
                    <el-option
                      v-for="item in option2Select"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div>
            <hr class="horizontal">
            <hr class="horizontal">
          </div>
          <div>
            <el-checkbox
              v-model="formData.baseDynamicFormApplyChange"
              class="apply-all-change"
            >{{ $t('creatives.creativeManagement.updateCreative.applySettingToSameTemplateTitle') }}</el-checkbox>
          </div>
          <div class="advanced-options">
            <div class="creative-name" @click="showAdvancedOptions">
              <i class="el-icon-caret-bottom"/>
              {{ $t('creatives.creativeManagement.updateCreative.advancedOptions') }}
            </div>
            <div v-if="isShowAdvancedOptions" class="align-left">
              <el-row class="background-img">
                <p
                  class="motion align-bottom"
                >{{ $t('creatives.creativeManagement.updateCreative.backgroundImage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormBackgroundImageEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-input/>
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
                  <p
                    class="upload-image-tip"
                  >{{ $t('creatives.creativeManagement.updateCreative.backgroundImageDescription') }}</p>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p
                  class="motion align-bottom"
                >{{ $t('creatives.creativeManagement.updateCreative.externalBackgroundColor') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormExternalBackgroundColorEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-color-picker
                    v-model="formData.baseDynamicFormExternalBackgroundColor"
                    :disabled="!editMode.baseDynamicFormExternalBackgroundColorEditMode"
                  />
                </el-col>
                <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21" class="input-margin-left">
                  <el-input
                    v-model="formData.baseDynamicFormExternalBackgroundColor"
                    :disabled="!editMode.baseDynamicFormExternalBackgroundColorEditMode"
                  />
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="promotion-img-options">
            <div class="creative-name" @click="showPromotionImageOptions">
              <i class="el-icon-caret-bottom"/>
              {{ $t('creatives.creativeManagement.updateCreative.promotionImageOptions') }}
            </div>
            <div v-if="isShowPromotionImageOptions" class="align-left">
              <el-row class="background-img">
                <p
                  class="motion align-bottom"
                >{{ $t('creatives.creativeManagement.updateCreative.promotionImage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormPromotionImageEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-input/>
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
                  <p
                    class="upload-image-tip"
                  >{{ $t('creatives.creativeManagement.updateCreative.backgroundImageDescription') }}</p>
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlWebsite') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlWebEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-input
                    :disabled="!editMode.baseDynamicFormClickUrlWebEditMode"
                    v-model="formData.baseDynamicFormClickUrlWeb"
                    class="full-width-column"
                  />
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckUrlWebsite') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckUrlWebEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-input
                    :disabled="!editMode.baseDynamicFormImpressionCheckUrlWebEditMode"
                    v-model="formData.baseDynamicFormImpressionCheckUrlWeb"
                    class="full-width-column"
                  />
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlAndroid') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlAndroidAppEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-input
                    :disabled="!editMode.baseDynamicFormClickUrlAndroidAppEditMode"
                    v-model="formData.baseDynamicFormClickUrlAndroidApp"
                    class="full-width-column"
                  />
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckClickUrlAndroid') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckClickUrlAndroidEditMode"
                    class="background-img-checkbox"
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
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlIos') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlIosAppEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-input
                    :disabled="!editMode.baseDynamicFormClickUrlIosAppEditMode"
                    v-model="formData.baseDynamicFormClickUrlIosApp"
                    class="full-width-column"
                  />
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckClickUrlIos') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckClickUrlIosAppEditMode"
                    class="background-img-checkbox"
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
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlEventPage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormClickUrlEventPageEditMode"
                    class="background-img-checkbox"
                  />
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <el-input
                    :disabled="!editMode.baseDynamicFormClickUrlEventPageEditMode"
                    v-model="formData.baseDynamicFormClickUrlEventPage"
                    class="full-width-column"
                  />
                </el-col>
              </el-row>
              <el-row class="background-img">
                <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckClickUrlEventPage') }}</p>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox
                    v-model="editMode.baseDynamicFormImpressionCheckClickUrlEventPageEditMode"
                    class="background-img-checkbox"
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
@import "./UpdateCreative.scss"
</style>

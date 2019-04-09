<template>
  <div>
    <el-row class="update-content">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div>
          <span
            class="creative-name"
          >{{ $t('creatives.creativeManagement.updateCreative.creativeNameTitle') }}</span>
          <div class="creative-name-content">
            <span>{{ creative.bannerNamePrefix }}</span>
            <input v-model="creative.name" type="text" class="inputCreative-name">
            <span>{{ creative.theme }}</span>
          </div>
          <span
            class="creative-name"
          >{{ $t('creatives.creativeManagement.updateCreative.creativeSizeTitle') }}</span>
          <div class="creative-name-content">
            <span>{{ creative.ci.size }}</span>
          </div>
        </div>
        <div class="creative-name" @click="showAnimatedAndDetail">
          <i class="el-icon-caret-bottom"/>
          {{ $t('creatives.creativeManagement.updateCreative.animatedAndDetailSettingTitle') }}
        </div>
        <div v-if="isShowAnimatedAndDetail">
          <el-row class="motion-row">
            <div>
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.motionTypeTitle') }}</p>
              <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                <el-select v-model="motion_type_value" placeholder="Flip" class="full-width-column">
                  <el-option
                    v-for="item in motion_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="motion-col-2">
                <el-button type="primary" class="full-width-column">
                  {{ $t('creatives.common.preview') }}
                  <i class="el-icon-caret-right"/>
                </el-button>
              </el-col>
            </div>
          </el-row>

          <el-row class="motion-row">
            <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.motionSpeedTitle') }}</p>
              <el-select
                v-model="motion_speed_value"
                multiple
                placeholder="1 sec"
                class="full-width-column"
              >
                <el-option
                  v-for="item in motion_speed"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="motion-col-2">
              <p
                class="motion"
              >{{ $t('creatives.creativeManagement.updateCreative.motionIntervalTitle') }}</p>
              <el-select
                v-model="motion_interval_value"
                multiple
                placeholder="3 sec"
                class="full-width-column"
              >
                <el-option
                  v-for="item in motion_interval"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </div>
        <el-row class="motion-row">
          <p
            class="motion"
          >{{ $t('creatives.creativeManagement.updateCreative.intervalBackgroundColorTitle') }}</p>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-color-picker v-model="creative.dynamicOption.backgroundColor"/>
          </el-col>
          <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" class="itnl-bg-col-2">
            <el-input v-model="color" class="full-width-column"/>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="itnl-bg-col-3">
            <el-select
              v-model="background_label_value"
              placeholder="사용안함"
              class="full-width-column"
            >
              <el-option
                v-for="item in background_label"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <p
            class="motion"
          >{{ $t('creatives.creativeManagement.updateCreative.titleFontColorSizeTitle') }}</p>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-color-picker v-model="creative.dynamicOption.titleColor"/>
          </el-col>
          <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" class="color-code">
            <el-input v-model="creative.dynamicOption.titleColor"/>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <hr class="diagonal">
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-input v-model="creative.dynamicOption.titlePt" class="title-font-size"/>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <hr class="diagonal">
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-checkbox v-model="creative.dynamicOption.titleBold" class="bold-check">Bold</el-checkbox>
          </el-col>
        </el-row>
        <el-row class="motion-row">
          <p
            class="motion"
          >{{ $t('creatives.creativeManagement.updateCreative.priceFontColorSizeTitle') }}</p>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-color-picker v-model="creative.dynamicOption.priceColor" class="full-width-column"/>
          </el-col>
          <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" class="color-code">
            <el-input v-model="creative.dynamicOption.priceColor" class="full-width-column"/>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <hr class="diagonal">
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-input v-model="creative.dynamicOption.pricePt" class="title-font-size"/>
          </el-col>
        </el-row>
        <div>
          <hr class="horizontal">
          <hr class="horizontal">
        </div>
        <div class="advanced-options">
          <el-checkbox
            v-model="applyChange"
            class="apply-all-change"
          >{{ $t('creatives.creativeManagement.updateCreative.applySettingToSameTemplateTitle') }}</el-checkbox>
          <div class="creative-name">
            <i class="el-icon-caret-bottom"/>
            {{ $t('creatives.creativeManagement.updateCreative.advancedOptions') }}
          </div>
          <el-row class="background-img">
            <p
              class="motion align-bottom"
            >{{ $t('creatives.creativeManagement.updateCreative.backgroundImage') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showBGImage" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21" class="align-left">
              <el-input/>
              <p
                class="motion upload-image-tip"
              >{{ $t('creatives.creativeManagement.updateCreative.backgroundImageDescription') }}</p>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-upload
                ref="upload"
                :disabled="!showBGImage"
                :auto-upload="false"
                action
                class="upload-background-image"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  class="full-width-column"
                >{{ $t('creatives.common.browse') }}</el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p
              class="motion align-bottom"
            >{{ $t('creatives.creativeManagement.updateCreative.externalBackgroundColor') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showExtendBGColor" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-color-picker v-model="color" :disabled="!showExtendBGColor"/>
            </el-col>
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
              <el-input
                v-model="color"
                :disabled="!showExtendBGColor"
                class="align-left full-width-column"
              />
            </el-col>
          </el-row>
        </div>
        <div class="promotion-img-options">
          <div class="creative-name">
            <i class="el-icon-caret-bottom"/>
            {{ $t('creatives.creativeManagement.updateCreative.promotionImageOptions') }}
          </div>
          <el-row class="background-img">
            <p
              class="motion align-bottom"
            >{{ $t('creatives.creativeManagement.updateCreative.promotionImage') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showPromotionImage" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21" class="align-left">
              <el-input/>
              <p
                class="motion upload-image-tip"
              >{{ $t('creatives.creativeManagement.updateCreative.backgroundImageDescription') }}</p>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-upload
                ref="upload"
                :disabled="!showPromotionImage"
                :auto-upload="false"
                action="https://jsonplaceholder.typicode.com/posts/"
                class="upload-background-image"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  class="full-width-column"
                >{{ $t('creatives.common.browse') }}</el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlWebsite') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showClickUrlWeb" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
              <el-input
                :disabled="!showClickUrlWeb"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckUrlWebsite') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showImpressionCheckUrl" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
              <el-input
                :disabled="!showImpressionCheckUrl"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlAndroid') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showClickUrlAndroidApp" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <el-input
                :disabled="!showClickUrlAndroidApp"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckClickUrlAndroid') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox
                v-model="showImpressionCheckClickUrlAndroid"
                class="background-img-checkbox"
              />
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <el-input
                :disabled="!showImpressionCheckClickUrlAndroid"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlIos') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showClickUrlIosApp" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <el-input
                :disabled="!showClickUrlIosApp"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckClickUrlIos') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox
                v-model="showImpressionCheckClickUrlIos"
                class="background-img-checkbox"
              />
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <el-input
                :disabled="!showImpressionCheckClickUrlIos"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.clickUrlEventPage') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox v-model="showClickUrlEventPage" class="background-img-checkbox"/>
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <el-input
                :disabled="!showClickUrlEventPage"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
          <el-row class="background-img">
            <p>{{ $t('creatives.creativeManagement.updateCreative.impressionCheckClickUrlEventPage') }}</p>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-checkbox
                v-model="showImpressionCheckClickUrlEventPage"
                class="background-img-checkbox"
              />
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <el-input
                :disabled="!showImpressionCheckClickUrlEventPage"
                v-model="defaultURL"
                class="full-width-column url-left-align"
              />
            </el-col>
          </el-row>
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
</template>
<script>
import updateCreativeController from './UpdateCreative.js'
export default updateCreativeController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./UpdateCreative.scss"
</style>

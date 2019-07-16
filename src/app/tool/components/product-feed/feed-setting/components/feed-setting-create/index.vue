<template>
  <el-row class="feed-setting-create">
    <!-- Start Defautl Setting -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__header">
        <h5>{{ genI18n('defautlSetting') }}</h5>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__content" >
        <el-form ref="defaultSettingForm" :model="defaultSettingFormModel" :rules="defaultSettingFormRules" label-width="180px" class="default-setting-form">
          <el-form-item :label="genI18n('usageStatus')" prop="usageStatus">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-select v-model="defaultSettingFormModel.usageStatus">
                <el-option
                  v-for="item in usageStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('feedName')" prop="feedName" required>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-tooltip :content="genI18n('validateMessage.feedNameHint')" placement="top" effect="light">
                <el-input v-model="defaultSettingFormModel.feedName" :placeholder="genI18n('feedNamePlacehoder')"/>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('currency')" prop="currency">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-select v-model="defaultSettingFormModel.currency">
                <el-option
                  v-for="item in currencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('fullFeedUrl')" prop="fullFeedURL" required>
            <el-col :xs="17" :sm="20" :md="20" :lg="22" :xl="22">
              <el-input v-model="defaultSettingFormModel.fullFeedURL" :placeholder="genI18n('fullFeedUrlPlacehoder')"/>
            </el-col>
            <el-col :xs="7" :sm="4" :md="4" :lg="2" :xl="2" class="table-item_btnCheck">
              <el-button :disabled="isCheckFullFeedDisable" @click="checkFullFeed">{{ genI18n('check') }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('schedule')" class="schedule-field hour-field" prop="schedule">
            <el-col :xs="10" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="hour-block">
                <div
                  v-for="(item, index) in scheduleHourOptions"
                  :key="item.value"
                  :class="{ 'active': item.selected, 'frist-item': index === 0, 'border-right': (index + 1)%3===0 }"
                  class="hour-item"
                  @click="selectHour(item)" />
              </div>
              <span>{{ accountTimeZone }} </span>
            </el-col>
            <el-col v-if="checkListHasItemSeleted" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="list-hour-block">
                <div v-for="(item, index) in hourSelectedList" :key="index">
                  <span>{{ generateLabelHourSelected(item, index) }}</span>
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!-- End Defautl Setting -->
    <!-- Start Additional Options -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__header">
        <h5>{{ genI18n('additionalOptions') }}</h5>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__content">
        <el-form ref="additionalOptionsForm" :model="additionalOptions" :rules="defaultSettingFormRules" label-width="180px" class="default-setting-form">
          <el-form-item :label="genI18n('addingFeedURL')" prop="addingFeedURL">
            <el-col :xs="17" :sm="20" :md="22" :lg="22" :xl="22">
              <el-input v-model="additionalOptions.addingFeedURL" :placeholder="genI18n('fullFeedUrlPlacehoder')" @change="handleChangeAddingFeed"/>
            </el-col>
            <el-col :xs="7" :sm="4" :md="2" :lg="2" :xl="2" class="table-item_btnCheck">
              <el-button :disabled="isCheckAddingFeedDisable" @click="checkAddingFeedURL">{{ genI18n('check') }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('soldoutFeedURL')" prop="soldoutFeedURL">
            <el-col :xs="17" :sm="20" :md="22" :lg="22" :xl="22">
              <el-input v-model="additionalOptions.soldoutFeedURL" :placeholder="genI18n('fullFeedUrlPlacehoder')" @change="handleChangeSoldoutFeed"/>
            </el-col>
            <el-col :xs="7" :sm="4" :md="2" :lg="2" :xl="2" class="table-item_btnCheck">
              <el-button :disabled="isCheckSoldoutFeedDisable" @click="checkSoldoutFeedURL">{{ genI18n('check') }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('feedGroupName')" prop="feedGroupName">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="additionalOptions.feedGroupName" :placeholder="genI18n('feedGroupNamePlacehoder')"/>
              <el-checkbox v-model="additionalOptions.setFeedToExtraGroud">{{ genI18n('setFeedToExtraGroup') }}</el-checkbox>
              <el-select v-model="additionalOptions.group" :disabled="!additionalOptions.setFeedToExtraGroud" class="table-item__specialSelect" @change="onChangeFeedGroupNameSelect">
                <el-option
                  v-for="item in groupOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!-- End Additional Options -->
    <!-- Start URL pattern -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__header">
        <h5>{{ genI18n('urlPattern') }}</h5>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__content">
        <el-form ref="urlPatternForm" :model="urlPattern" :rules="defaultSettingFormRules" label-width="180px" class="default-setting-form">
          <el-form-item :label="genI18n('desktopWebsite')" prop="desktopWebsite">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="urlPattern.desktopWebsite" :placeholder="genI18n('desktopWebsitePlacehoder')"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('mobileWebsite')" prop="mobileWebsite">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="urlPattern.mobileWebsite" :placeholder="genI18n('mobileWebsitePlacehoder')"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('androidApp')" prop="androidApp">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="urlPattern.androidApp" :placeholder="genI18n('androidAppPlacehoder')"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('iOSApp')" prop="iOSApp">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="urlPattern.iOSApp" :placeholder="genI18n('iOSAppPlacehoder')"/>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!-- End URL pattern -->
    <!-- Start Click URL parameter -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__header">
        <h5>{{ genI18n('clickURLParameter') }}</h5>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__content">
        <el-form ref="clickURLParameterForm" :model="clickURLParameter" :rules="defaultSettingFormRules" label-width="180px" class="default-setting-form">
          <el-form-item :label="genI18n('desktopWebsite')" prop="desktopWebsite">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="clickURLParameter.desktopWebsite"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('mobileWebsite')" prop="mobileWebsite">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="clickURLParameter.mobileWebsite"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('androidApp')" prop="androidApp">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="clickURLParameter.androidApp"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('iOSApp')" prop="iOSApp">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="clickURLParameter.iOSApp"/>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!-- End Click URL parameter -->
    <!-- Start Impression URL Parameter -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__header">
        <h5>{{ genI18n('impressionURLParameter') }}</h5>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__content">
        <el-form ref="impressionURLParameterForm" :model="impressionURLParameter" :rules="defaultSettingFormRules" label-width="200px" class="default-setting-form">
          <el-form-item :label="genI18n('desktopWebsite')" prop="desktopWebsite">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="impressionURLParameter.desktopWebsite"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('mobileWebsite')" prop="mobileWebsite">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="impressionURLParameter.mobileWebsite"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('androidApp')" prop="androidApp">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="impressionURLParameter.androidApp"/>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('iOSApp')" prop="iOSApp">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-input v-model="impressionURLParameter.iOSApp"/>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!-- End Impression URL Parameter -->
    <!-- Start Advanced Settings -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__header">
        <h5>{{ genI18n('advancedSettings') }}</h5>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-item__content">
        <el-form ref="advancedSettins" :model="advancedSettings" label-width="200px" class="default-setting-form">
          <el-form-item :label="genI18n('currencyMarking')" prop="currencyMarking">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-col :xs="10" :sm="3" :md="3" :lg="3" :xl="3">
                <el-radio-group v-model="advancedSettings.currencyMarking">
                  <el-radio :label="0">{{ currencyMarkingOptions[0].label }}</el-radio>
                  <el-radio :label="1">{{ currencyMarkingOptions[1].label }}</el-radio>
                </el-radio-group>
              </el-col>
              <el-col :xs="14" :sm="21" :md="21" :lg="21" :xl="21">
                <span>{{ genI18n('preview') }} {{ generateReviewCurrencry }}</span>
              </el-col>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('feedType')" prop="feedType">
            <el-col :xs="16" :sm="22" :md="22" :lg="22" :xl="22">
              <el-select v-model="advancedSettings.feedType">
                <el-option
                  v-for="item in feedTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
            <el-col :xs="8" :sm="2" :md="2" :lg="2" :xl="2" class="table-item_btnCheck">
              <el-button :disabled="isCheckFullFeedDisable" @click="checkFeedType">{{ genI18n('detection') }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('encodingType')" prop="encodingType">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-select v-model="advancedSettings.encodingType">
                <el-option
                  v-for="item in encodingTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item :label="genI18n('regularExpression')" class="form-item-inline" prop="regularExpression">
            <el-col v-for="(item, index) in advancedSettings.regularExpression" :key="item.id" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="regular-expression">
              <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <el-select v-model="advancedSettings.regularExpression[index].field" @change="onChangeRegularExpression">
                  <el-option
                    v-for="item in regularExpressionOptions"
                    :key="item.value"
                    :disabled="item.selected"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-col>
              <el-col :xs="11" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item :label="genI18n('existingValue')" label-width="150px" prop="existingValue" class="regular-expression-item">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-input :maxlength="maxLength" :disabled="checkHasValueRegularExpression(item.field)" v-model="advancedSettings.regularExpression[index].pattern"/>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :xs="11" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item :label="genI18n('changedValue')" label-width="150px" prop="changedValue" class="regular-expression-item">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-input :maxlength="maxLength" :disabled="checkHasValueRegularExpression(item.field)" v-model="advancedSettings.regularExpression[index].replacement"/>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" class="group_btnAction">
                <el-form-item class="regular-expression-icon">
                  <el-col :xs="12">
                    <el-button class="table-item__btnAction" @click="addFieldRegularExpression()">
                      <i class="el-icon-plus"/>
                    </el-button>
                  </el-col>
                </el-form-item>
                <el-form-item v-if="index !== 0" class="regular-expression-icon" >
                  <el-col :xs="12">
                    <el-button class="table-item__btnAction" @click="deleteFieldRegularExpression(index)">
                      <i class="el-icon-minus"/>
                    </el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!-- End Advanced Settings -->
    <div class="button-bottom">
      <el-button @click="createNewProductFeedSetting">{{ $t('productFeed.create') }}</el-button>
      <el-button @click="cancelCreateNew" >{{ $t('productFeed.cancel') }}</el-button>
    </div>
  </el-row>
</template>

<script>
import FeedSettingCreate from './FeedSettingCreate'
export default FeedSettingCreate
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

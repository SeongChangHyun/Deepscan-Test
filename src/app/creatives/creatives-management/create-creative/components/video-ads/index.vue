<template>
  <div class="video-ads">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form ref="nativeForm" :model="formData" :rules="rules" class="video-ads-form">
          <el-form-item v-if="!isMatchCampaign" :label="genI18n('connectCampaignType')" prop="campaign_type" label-width="180px">
            <el-radio-group v-model="formData.campaign_type">
              <el-radio :label="creativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN">{{ genI18n('webCampaign') }}</el-radio>
              <el-radio :label="creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN">{{ genI18n('appCampaign') }}</el-radio>
            </el-radio-group>
            <div v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN" class="select-app-group">
              <div class="android-app">
                <el-select v-model="appIdAndroid" placeholder="Select">
                  <el-option
                    key="0"
                    :label="genI18n('selectAndroidApp')"
                    :value="0"/>
                  <el-option
                    v-for="item in creativeConstant.ANDROID_APP_LIST"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    <el-row>
                      <el-col :span="2"><svg-icon icon-class="android-logo"/></el-col>
                      <el-col :span="2">{{ item.currency }}</el-col>
                      <el-col :span="10">{{ item.value }}</el-col>
                      <el-col :span="10">{{ item.name }}</el-col>
                    </el-row>
                  </el-option>
                </el-select>
              </div>
              <div class="ios-app">
                <el-select v-model="appIdIos" placeholder="Select">
                  <el-option
                    key="0"
                    :label="genI18n('selectIosApp')"
                    :value="0"/>
                  <el-option
                    v-for="item in creativeConstant.IOS_APP_LIST"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    <el-row>
                      <el-col :span="2"><svg-icon icon-class="ios-logo"/></el-col>
                      <el-col :span="2">{{ item.currency }}</el-col>
                      <el-col :span="10">{{ item.value }}</el-col>
                      <el-col :span="10">{{ item.name }}</el-col>
                    </el-row>
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>

          <el-form-item :label="genI18n('createName')" prop="ci_ids" class="create-name" label-width="180px">
            <el-col class="create-name-content">
              <span>{{ currentDate }}_</span>
              <el-input v-model="formData.ci_ids" />
              <span>_</span>
            </el-col>
          </el-form-item>

          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN && isMatchCampaign" :label="genI18n('appInformation')" prop="ci_ids" class="create-name">
            <br >
            <div>
              <div class="item-info-app">
                <div class="icon-app">
                  <svg-icon icon-class="android-logo"/>
                </div>
                <div class="country">{{ appInformation.android.country }}</div>
                <el-input
                  :value="appInformation.android.appId"
                  class="app-id"
                  disabled
                >
                  <el-button
                    slot="append"
                    disabled
                    class="btn-append-input"
                    type="primary"
                  >{{ $t('btnCheck') }}</el-button>
                </el-input>
              </div>

              <div class="item-info-app">
                <div class="icon-app">
                  <svg-icon icon-class="ios-logo"/>
                </div>
                <div class="country">{{ appInformation.ios.country }}</div>
                <el-input
                  :value="appInformation.ios.appId"
                  class="app-id"
                  disabled
                >
                  <el-button
                    slot="append"
                    disabled
                    class="btn-append-input"
                    type="primary"
                  >{{ $t('btnCheck') }}</el-button>
                </el-input>
              </div>
            </div>
          </el-form-item>

          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN" :label="genI18n('titleText')" prop="ad_headline" label-width="180px">
            <el-input v-model="formData.ad_headline" />
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN" :label="genI18n('appName')" prop="app_name" label-width="180px">
            <el-input v-model="formData.app_name" />
          </el-form-item>
          <el-form-item :label="genI18n('mainText')" prop="ad_body" label-width="180px">
            <el-input v-model="formData.ad_body" />
          </el-form-item>
          <el-form-item :label="genI18n('videoFile')" prop="video_file_name" label-width="180px">
            <el-upload
              :auto-upload="false"
              :on-change="uploadVideoImage"
              :class="[formData.video_file_name ? 'has-image' : '', 'upload-single-image']"
              :on-remove="handleRemoveVideo"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.video_file_name" class="upload-file-name">{{ formData.video_file_name }}</span>
              <el-button size="medium" type="primary">{{ genI18n('browser') }}</el-button>
            </el-upload>
            <div>{{ genI18n('videoFileRule') }}</div>
          </el-form-item>
          <el-form-item :label="genI18n('watermarkImage')" prop="watermark_image" label-width="180px">
            <el-upload
              :auto-upload="false"
              :on-change="uploadWaterMarkImage"
              :class="[formData.watermark_image ? 'has-image' : '', 'upload-single-image']"
              :on-remove="handleRemoveWatermarkImage"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.watermark_image" class="upload-file-name">{{ formData.watermark_image }}</span>
              <el-button size="medium" type="primary">{{ genI18n('browser') }}</el-button>
            </el-upload>
            <div>{{ genI18n('watermarkImageRule') }}</div>
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN" :label="genI18n('appIconImage')" prop="app_icon_image" label-width="180px">
            <el-upload
              :auto-upload="false"
              :on-change="uploadAppIconImage"
              :class="[formData.app_icon_image ? 'has-image' : '', 'upload-single-image']"
              :on-remove="handleRemoveAppIconImage"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.app_icon_image" class="upload-file-name">{{ formData.app_icon_image }}</span>
              <el-button size="medium" type="primary">{{ genI18n('browser') }}</el-button>
            </el-upload>
            <div>{{ genI18n('ciLogoImageRule') }}</div>
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN" :label="genI18n('ciLogoImage')" prop="ci_image" label-width="180px">
            <el-upload
              :auto-upload="false"
              :on-change="uploadCiImage"
              :class="[formData.ci_image ? 'has-image' : '', 'upload-single-image']"
              :on-remove="handleRemoveCiImage"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.ci_image" class="upload-file-name">{{ formData.ci_image }}</span>
              <el-button size="medium" type="primary">{{ genI18n('browser') }}</el-button>
            </el-upload>
            <div>{{ genI18n('ciLogoImageRule') }}</div>
          </el-form-item>
          <el-form-item :label="genI18n('callToAction')" prop="call_to_action" label-width="180px">
            <el-input v-model="formData.call_to_action" :placeholder="genI18n('enterUpEightCharacter')" />
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN" :label="genI18n('brandName')" prop="brand_name" label-width="180px">
            <el-input v-model="formData.brand_name" :placeholder="genI18n('enterUpEightCharacter')" />
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN" :label="genI18n('endCapImage')" prop="end_cap_image" label-width="180px">
            <el-input v-model="formData.end_cap_image">
              <template slot="append">{{ genI18n('browser') }}</template>
            </el-input>
            <span>{{ genI18n('endCapImageRule') }}</span>
          </el-form-item>
          <el-row v-if="formData.campaign_type === creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN" class="group-start-score">
            <el-form-item :label="genI18n('starScore')" prop="star_rating" class="start-score" label-width="180px">
              <el-input v-model="formData.star_rating" maxlength="1"/>
              <span class="group-star-icon">
                <i v-for="i in 5" :key="i" :class="[formData.star_rating >= i && formData.star_rating <= 5 ? 'el-icon-star-on' : 'el-icon-star-off']" />
              </span>
            </el-form-item>
            <el-form-item :label="genI18n('price')" prop="app_price" class="app-price" label-width="180px">
              <el-input v-model="formData.app_price">
                <template slot="append">{{ genI18n('krw') }}</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-form-item class="btn-preview">
            <el-button type="primary">{{ genI18n('preview') }}<i class="el-icon-caret-right el-icon-right" /></el-button>
          </el-form-item>
          <div class="detail-options">
            <el-collapse v-model="collapseVideoAds">
              <el-collapse-item :title="genI18n('detailOptions')">
                <div class="detail-options-content">
                  <el-form-item v-for="item in creativeConstant.DETAIL_OPTIONS" :key="item.id" :prop="item.field">
                    <div class="item-title">
                      <strong>{{ genI18n(item.title) }}</strong>{{ genI18n(item.description) }}
                    </div>
                    <el-checkbox v-model="item.allowEdit" /><el-input v-model="formData[item.field]" :disabled="!item.allowEdit" />
                  </el-form-item>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="submitForm()">{{ genI18n('create') }}</el-button>
            <el-button @click="resetForm()">{{ genI18n('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="preview"> {{ genI18n('preview') }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import videoAds from './videoAds'
export default videoAds
</script>

<style lang="scss" scoped>
.video-ads {
  .create-name-content{
    padding: 0 !important;
  }
  .video-ads-form {
    background-color: #ffffff;
    padding: 20px;
    /deep/ .el-form-item__content{
      @media(max-width: 768px) {
        margin-left: 0px !important;
      }
    }
    /deep/ .el-form-item {
      margin-bottom: 10px;
      &.create-name .el-input{
        width: 300px;
        @media(max-width: 768px) {
          width: 60%;
        }
      }
      &.btn-preview {
        margin-top: 10px;
        text-align: right;
        .el-button {
          width: 50%;
        }
      }
      &.btn-submit {
        display: none;
      }
      .el-button {
        background-color: #1D93D0;
      }
    }
    /deep/ .el-form-item > .el-form-item__label {
      display: block;
      width: 100%;
      text-align: left;
    }
    .detail-options {
      .el-form-item {
        /deep/ .el-input {
          margin-left: 6px;
          width: calc(100% - 20px);
        }
      }
      .el-collapse {
        border: 1px solid #F4F5F7;
        /deep/ .el-collapse-item__header {
          background-color: #F4F5F7;
          font-weight: bold;
          padding: 0 15px;
        }
        /deep/ .el-collapse-item__content {
          padding: 0 15px;
        }
      }
    }
    /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label{
      &::before {
        content: '';
      }
      &::after {
        content: '*';
        color: #f56c6c;
      }
    }
    /deep/ .start-score .el-input {
      width: 100px;
    }
    /deep/ .upload-single-image {
      &.has-image {
        float: left;
        width: 100%;
        .el-upload {
          display: none;
        }
        .el-upload-list {
          clear: both;
          a {
            color: #1C94D0;
          }
        }
      }
      .el-upload {
        width: 100%;
        text-align: right;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        font-size: 16px;
        .upload-file-name {
          float:left;
          margin-left: 6px;
        }
        .el-button {
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }
      }
    }
    .is-error /deep/ .el-upload {
      border: 1px solid #f56c6c;
    }
    /deep/ .el-form-item__error {
      position: relative;
    }
    .group-star-icon {
      .el-icon-star-on {
        color: #1C94D0;
      }
      .el-icon-star-off {
        &::before {
          color: #1C94D0;
        }
      }
    }
    .select-app-group {
      .android-app {
        margin-bottom: 10px;
      }
      .el-select {
        width: 100%;
      }
    }
  }
  .preview {
    border: 1px solid #ccc;
    height: 600px;
    padding: 15px;
    background-color: #ffffff;
  }
    .item-info-app{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    .icon-app {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #e8ebee;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .btn-append-input {
      background: #3498db !important;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      color: #fff;
      border: 0;
      margin: 0px -21px;
      font-weight: bold;
    }
    .app-id{
      flex: 1;
    }
    .country {
      width: 100px;
      padding: 0 10px;
      margin:  0 20px;
      background: #f9fafe;
      border: 1px solid #ddd;
      height: 36px;
      text-align: center;
      color: #4c5154

    }
  }
}

</style>

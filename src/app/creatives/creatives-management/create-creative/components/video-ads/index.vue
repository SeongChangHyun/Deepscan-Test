<template>
  <div class="video-ads">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="nativeForm" :model="formData" :rules="rules" class="video-ads-form">
          <el-form-item :label="genI18n('connectCampaignType')" prop="campaign_type">
            <el-radio-group v-model="formData.campaign_type">
              <el-radio :label="webCampaignValue">{{ genI18n('webCampaign') }}</el-radio><br>
              <el-radio :label="appCampaignValue">{{ genI18n('appCampaign') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="genI18n('createName')" prop="ci_ids" class="create-name">
            <span>{{ currentDate.replace(/-/g, '') }}_</span>
            <el-input v-model="formData.ci_ids" />
            <span>_{{ genI18n('fileName') }}</span>
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === webCampaignValue" :label="genI18n('titleText')" prop="ad_headline">
            <el-input v-model="formData.ad_headline" />
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === appCampaignValue" :label="genI18n('appName')" prop="app_name">
            <el-input v-model="formData.app_name" />
          </el-form-item>
          <el-form-item :label="genI18n('mainText')" prop="ad_body">
            <el-input v-model="formData.ad_body" />
          </el-form-item>
          <el-form-item :label="genI18n('videoFile')" prop="video_file_name">
            <el-upload
              :auto-upload="false"
              :on-change="uploadVideoImage"
              class="upload-single-image"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.video_file_name" class="upload-file-name">{{ formData.video_file_name }}</span>
              <el-button size="medium" type="info">{{ genI18n('browser') }}</el-button>
              <div slot="tip" class="el-upload__tip">{{ genI18n('videoFileRule') }}</div>
            </el-upload>
          </el-form-item>
          <el-form-item :label="genI18n('watermarkImage')" prop="watermark_image">
            <el-upload
              :auto-upload="false"
              :on-change="uploadWaterMarkImage"
              class="upload-single-image"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.watermark_image" class="upload-file-name">{{ formData.watermark_image }}</span>
              <el-button size="medium" type="info">{{ genI18n('browser') }}</el-button>
              <div slot="tip" class="el-upload__tip">{{ genI18n('watermarkImageRule') }}</div>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === appCampaignValue" :label="genI18n('appIconImage')" prop="app_icon_image">
            <el-upload
              :auto-upload="false"
              :on-change="uploadAppIconImage"
              class="upload-single-image"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.app_icon_image" class="upload-file-name">{{ formData.app_icon_image }}</span>
              <el-button size="medium" type="info">{{ genI18n('browser') }}</el-button>
              <div slot="tip" class="el-upload__tip">{{ genI18n('ciLogoImageRule') }}</div>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === webCampaignValue" :label="genI18n('ciLogoImage')" prop="ci_image">
            <el-upload
              :auto-upload="false"
              :on-change="uploadCiImage"
              class="upload-single-image"
              action="https://jsonplaceholder.typicode.com/posts/">
              <span v-if="formData.ci_image" class="upload-file-name">{{ formData.ci_image }}</span>
              <el-button size="medium" type="info">{{ genI18n('browser') }}</el-button>
              <div slot="tip" class="el-upload__tip">{{ genI18n('ciLogoImageRule') }}</div>
            </el-upload>
          </el-form-item>
          <el-form-item :label="genI18n('callToAction')" prop="call_to_action">
            <el-input v-model="formData.call_to_action" :placeholder="genI18n('enterUpEightCharacter')" />
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === webCampaignValue" :label="genI18n('brandName')" prop="brand_name">
            <el-input v-model="formData.brand_name" :placeholder="genI18n('enterUpEightCharacter')" />
          </el-form-item>
          <el-form-item v-if="formData.campaign_type === appCampaignValue" :label="genI18n('endCapImage')" prop="end_cap_image">
            <el-input v-model="formData.end_cap_image">
              <template slot="append">{{ genI18n('browser') }}</template>
            </el-input>
            <span>{{ genI18n('endCapImageRule') }}</span>
          </el-form-item>
          <el-row v-if="formData.campaign_type === appCampaignValue" class="group-start-score">
            <el-col :span="12" class="start-score">
              <el-form-item :label="genI18n('startScore')" prop="star_rating">
                <el-input v-model="formData.star_rating" :disabled="true" />
                <span class="group-star-icon">
                  <i class="el-icon-star-on" />
                  <i class="el-icon-star-on" />
                  <i class="el-icon-star-on" />
                  <i class="el-icon-star-on" />
                  <i class="el-icon-star-off" />
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="app-price">
              <el-form-item :label="genI18n('price')" prop="app_price">
                <el-input v-model="formData.app_price">
                  <template slot="append">{{ genI18n('krw') }}</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="btn-preview">
            <el-button type="primary">{{ genI18n('preview') }}<i class="el-icon-caret-right el-icon-right" /></el-button>
          </el-form-item>
          <div class="detail-options">
            <div class="detail-options-title" @click="isShowDetailOptions = !isShowDetailOptions">
              <i :class="[isShowDetailOptions ? 'el-icon-caret-bottom' : 'el-icon-caret-right']"/>
              <strong>{{ genI18n('detailOptions') }}</strong>
            </div>
            <div v-if="isShowDetailOptions" class="detail-options-content">
              <el-form-item v-for="item in creativeConstant.DETAIL_OPTIONS" :key="item.id" :prop="item.field">
                <div class="item-title">
                  <strong>{{ genI18n(item.title) }}</strong>{{ genI18n(item.description) }}
                </div>
                <el-checkbox v-model="item.allowEdit" /><el-input v-model="formData[item.field]" :disabled="!item.allowEdit" />
              </el-form-item>
            </div>
          </div>
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="submitForm()">{{ genI18n('create') }}</el-button>
            <el-button @click="resetForm()">{{ genI18n('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
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
  .video-ads-form {
    /deep/ .el-form-item {
      margin-bottom: 10px;
      &.create-name .el-input{
        width: 300px;
      }
      &.btn-preview {
        margin-top: 10px;
        text-align: right;
      }
      &.btn-submit {
        display: none;
      }
    }
    /deep/ .el-form-item > .el-form-item__label {
      display: block;
      width: 100%;
      text-align: left;
    }
    .detail-options-content {
      margin-left: 20px;
      .el-form-item {
        /deep/ .el-input {
          margin-left: 6px;
          width: calc(100% - 20px);
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
      }
      .el-upload-list {
        display: none;
      }
    }
  }
  .preview {
    border: 1px solid #ccc;
    height: 600px;
    padding: 15px;
  }
}

</style>

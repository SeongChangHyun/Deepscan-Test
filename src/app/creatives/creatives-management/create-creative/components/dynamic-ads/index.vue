<template>
  <div class="native-ads">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="nativeForm" :model="formData" :rules="rules" class="native-ads-form">
          <el-form-item :label="genI18n('createName')" prop="ci_ids" class="create-name">
            <span>{{ currentDate.replace(/-/g, '') }}_</span>
            <el-input v-model="formData.ci_ids"/>
            <span>_{{ genI18n('fileName') }}</span>
          </el-form-item>

          <el-form-item :label="genI18n('feed')" prop="feed">
            <el-select v-model="formData.feed" :placeholder="genI18n('placeholderFeed')">
              <el-option
                v-for="item in listFeed"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="genI18n('logo')" prop="logoCI">
            <div class="border-container">
              <el-checkbox-group v-model="formData.logoCI">
                <el-checkbox v-for="item in listLogoCI" :key="item.id" :label="item.name"/>
              </el-checkbox-group>
            </div>
          </el-form-item>

          <el-form-item :label="genI18n('theme')" prop="theme">
            <div class="border-container">
              <p class="btn-select-all" @click="onSelectAllTheme">{{ genI18n('selectAll') }}</p>
              <el-checkbox-group v-model="formData.theme">
                <el-checkbox v-for="item in listTheme" :key="item.id" :label="item.id" false-label>
                  <span class="label">{{ item.name }}</span>
                  <span class="btn-preview" @click="onClickPreview(item)">{{ genI18n('preview') }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="preview">{{ genI18n('preview') }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DynamicAds from './DynamicAds'
export default DynamicAds
</script>

<style lang="scss" scoped>
.native-ads {
  .native-ads-form {
    background-color: #ffffff;
    padding: 20px;
    /deep/ .el-form-item {
      margin-bottom: 10px;
      &.create-name .el-input {
        width: 300px;
      }
      &.btn-preview {
        margin-top: 10px;
        text-align: right;
      }
      &.btn-submit {
        display: none;
      }
      .el-select {
        width: 100%;
        margin-right: 20px;
      }
    }
    /deep/ .el-form-item > .el-form-item__label {
      display: block;
      width: 100%;
      text-align: left;
    }
    /deep/
      .el-form-item.is-required:not(.is-no-asterisk)
      > .el-form-item__label {
      &::before {
        content: "";
      }
      &::after {
        content: "*";
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
          float: left;
          margin-left: 6px;
        }
      }
      .el-upload-list {
        display: none;
      }
    }
    .border-container {
      margin-top: 36px;
      border: 1px solid #eee;
      max-height: 360px;
      overflow: hidden;
      overflow-y: auto;
      padding-left: 10px;
      .el-checkbox-group {
        .el-checkbox {
          width: 100%;
          margin-left: 0;
          /deep/ .el-checkbox__label {
            width: 100%;
            .btn-preview {
              float: right;
              margin-right: 50px;
              cursor: pointer;
            }
          }
        }
      }
      .btn-select-all {
        line-height: 36px;
        margin: 0;
        padding: 0;
        cursor: pointer;
        color: #3498db;
      }
    }
  }
  .preview {
    border: 1px solid #ccc;
    height: 600px;
    padding: 15px;
    background-color: #ffffff;
  }
}
</style>

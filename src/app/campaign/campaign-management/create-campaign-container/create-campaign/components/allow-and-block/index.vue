<template>
  <el-row :gutter="30">
    <el-col :span="12" class="fl-1 box-left-item">
      <div class="box-card">
        <el-card shadow="never">
          <div slot="header" class="box-header el-row">
            <el-col :span="13" class="box-header-title">
              <span>{{ genI18n('allow') }} {{ genI18n('itemName') }} ({{ allowList.length }})</span>
            </el-col>
            <el-col :span="8" class="delete-all-btn">
              <a href="#" @click="deleteAllItem('allow')">{{ genI18n('deleteAll') }}</a>
            </el-col>
            <el-col :span="1" class="copy-operation">
              <svg-icon icon-class="copy" />
            </el-col>
          </div>
          <div v-for="(item, index) in allowList" :key="index" class="list item">
            <el-row class="item">
              <el-col :span="21" class="total">{{ item }}</el-col>
              <el-col :span="3" class="">
                <svg-icon icon-class="close-button" class="close-btn" @click="deleteItem"/>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div class="box-footer">
          <el-row>
            <el-col :span="12" class="text-right">
              <el-input v-model="allowItem" class="input fl-1" size="mini" type="text"/>
            </el-col>
            <el-col :span="6" class="">
              <el-button type="danger" size="small" @click="addItem('allow')">{{ genI18n('enter') }}</el-button>
            </el-col>
            <el-col :span="6" class="alternative-btn">
              <svg-icon icon-class="photo" class="icon"/>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-col :span="12" class="fl-1 box-right-item">
      <div class="box-card">
        <el-card shadow="never">
          <div slot="header" class="box-header el-row">
            <el-col :span="13" class="box-header-title">
              <span>{{ genI18n('block') }} {{ genI18n('itemName') }} ({{ blockList.length }})</span>
            </el-col>
            <el-col :span="8" class="delete-all-btn">
              <a href="#" @click="deleteAllItem('block')">{{ genI18n('deleteAll') }}</a>
            </el-col>
            <el-col :span="1" class="copy-operation">
              <svg-icon icon-class="copy" />
            </el-col>
          </div>
          <div v-for="(item, index) in blockList" :key="index" class="list item">
            <el-row class="item">
              <el-col :span="21" class="total">{{ item }}</el-col>
              <el-col :span="3" class="">
                <svg-icon icon-class="close-button" class="close-btn" @click="deleteItem"/>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div class="box-footer">
          <el-row>
            <el-col :span="12" class="text-right">
              <el-input v-model="blockItem" class="input fl-1" size="mini" type="text"/>
            </el-col>
            <el-col :span="6" class="">
              <el-button type="danger" size="small" @click="addItem('block')">{{ genI18n('enter') }}</el-button>
            </el-col>
            <el-col :span="6" class="alternative-btn">
              <svg-icon icon-class="photo" class="icon" />
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import AllowAndBlock from './AllowAndBlock'
export default AllowAndBlock
</script>

<style lang='scss'>
  .h-form-input {
    .container-table {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .fl-1 {
      flex: 1;
    }
  }
  .box-card {
    width: 100%;
  }
  .el-card {
    border-bottom: none;
    border-radius: 0;
    .close-btn {
      font-size: 14px;
      color: #BAC0C7;
      font-weight: 500;
      &:hover {
        color: #F20808;
      }
    }
  }
  .el-card__header {
    background-color: #E8EBEE;
    border-radius: 0;
    padding: 10px;
    .box-header-title {
      font-weight: 500;
      color: #323A46;
      font-size: 14px;
      padding-left: 0;
    }
    .delete-all-btn {
      color: #1D93CF;
      font-size: 14px;
    }
    .copy-operation {
      border-left: 1px solid #ccc;
      text-align: center;
      padding-left: 8px;
      color: #1D93CF;
    }
  }
  .box-footer {
    margin: 0;
    padding: 0;
    border: 1px solid #DEE3E9;
    border-top-color: #E5E9EC;
    input {
      border: none;
    }
    button {
      border-radius: 0;
      width: 100%;
      background-color: #1D93CF;
      border: none;
      &.upload-btn {
        padding: 9px 4px;
      }
    }
    .alternative-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        font-size: 20px;
        line-height: 20px;
        display: block;
        margin-top: 6px;
        color: #bbb;
        cursor: pointer;
      }
    }
  }

  .allow-item {
    padding-right: 5px;
  }

  .block-item {
    padding-left: 5px;
  }

  .block-checkbox {
    padding: 10px;
    border: 1px solid #cccccc;
  }

  .text-right {
    text-align: right;
  }

  .list-item {
    min-height: 50px;
  }
</style>

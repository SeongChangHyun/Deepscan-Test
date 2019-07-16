<template>
  <el-row :gutter="30">
    <el-col :xs="24" :sm="12" class="fl-1 box-left-item">
      <div class="box-card">
        <el-card shadow="never">
          <div slot="header" class="box-header el-row">
            <el-col :span="14" class="box-header-title">
              <span>{{ genI18n('allow') }} {{ genI18n('itemName') }} ({{ allowList.length }})</span>
            </el-col>
            <el-col :span="7" class="delete-all-btn">
              <a href="#" @click="deleteAllItem('allow')">{{ genI18n('deleteAll') }}</a>
            </el-col>
            <el-col :span="3" class="copy-operation">
              <svg-icon icon-class="copy"/>
            </el-col>
          </div>
          <div v-for="(item, index) in allowList" :key="index" class="list item">
            <el-row class="item">
              <el-col :xs="16" :sm="18" class="total">{{ item.name }}</el-col>
              <el-col :xs="4" :sm="3" class="total">{{ item.stat_result }}</el-col>
              <el-col :xs="4" :sm="3" class="allowIconDelete">
                <svg-icon
                  icon-class="close-button"
                  class="close-btn"
                  @click="deleteItem('allow',index)"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div class="box-footer">
          <el-row class="footerRow">
            <el-col class="footerCol1">
              <el-input v-model="allowItem" class="input fl-1" size="mini" type="text"/>
            </el-col>
            <el-col :span="8" class="footerCol2">
              <el-button-group>
                <el-button class="enter-btn" type="danger" size="small" @click="addItem('allow')">{{ genI18n('enter') }}</el-button>
                <el-button class="upload-button"><svg-icon icon-class="attach_file-material_2x" class="attach-file-icon"/></el-button>
              </el-button-group>
            </el-col>
            <el-col v-if="!!onUpload" :span="4" class="alternative-btn footerCol3">
              <svg-icon icon-class="photo" class="icon"/>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" class="fl-1 box-right-item">
      <div class="box-card">
        <el-card shadow="never">
          <div slot="header" class="box-header el-row">
            <el-col :span="14" class="box-header-title">
              <span>{{ genI18n('block') }} {{ genI18n('itemName') }} ({{ blockList.length }})</span>
            </el-col>
            <el-col :span="7" class="delete-all-btn">
              <a href="#" @click="deleteAllItem('block')">{{ genI18n('deleteAll') }}</a>
            </el-col>
            <el-col :span="3" class="copy-operation">
              <svg-icon icon-class="copy"/>
            </el-col>
          </div>
          <div v-for="(item, index) in blockList" :key="index" class="list item">
            <el-row class="item">
              <el-col :xs="16" :sm="18" class="total">{{ item.name }}</el-col>
              <el-col :xs="4" :sm="3" class="total">{{ item.stat_result }}</el-col>
              <el-col :xs="4" :sm="3" class="allowIconDelete">
                <svg-icon icon-class="close-button" class="close-btn" @click="deleteItem"/>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div class="box-footer">
          <el-row class="footerRow">
            <el-col class="footerCol1">
              <el-input v-model="blockItem" class="inputText" size="mini" type="text"/>
            </el-col>
            <el-col class="footerCol2">
              <el-button-group>
                <el-button class="enter-btn" type="danger" size="small" @click="addItem('block')">{{ genI18n('enter') }}</el-button>
                <el-button class="upload-button"><svg-icon icon-class="attach_file-material_2x" class="attach-file-icon"/></el-button>
              </el-button-group>
            </el-col>
            <el-col v-if="!!onUpload" class="alternative-btn footerCol3">
              <svg-icon icon-class="photo" class="icon"/>
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

<style lang='scss' scoped>
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
    float: right;
    font-size: 14px;
    color: #bac0c7;
    font-weight: 500;
    &:hover {
      color: #f20808;
    }
  }
}
.el-card__header {
  background-color: #e8ebee;
  border-radius: 0;
  padding: 10px;
  .box-header{
    .el-col{
      padding: 0px !important;
    }
  }
  .box-header-title {
    font-weight: 600;
    color: #323a46;
    font-size: 14px;
  }
  .delete-all-btn {
    color: #1d93cf;
    font-size: 14px;
  }
  .copy-operation {
    border-left: 1px solid #ccc;
    text-align: center;
    align-items: center;
    float: right;
    padding-left: 8px !important;
    color: #1d93cf;
  }
}
.box-footer {
  margin: 0;
  padding: 0;
  border: 1px solid #dee3e9;
  border-top-color: #e5e9ec;
  input {
    border: none;
  }
  .enter-btn {
    border-radius: 0;
    height: 33px;
    background-color: #1d93cf;
    border: none;
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
  .footerRow {
    flex: 1;
    display: flex;
    height: 33px;
  }
  .footerCol1 {
    flex: 4;
    /deep/ .el-input {
      input {
        border: none;
        height: 33px;
      }
    }
  }
  .footerCol2 {
    flex: 1;
  }
  .footerCol3 {
    flex: 1;
    height: 28px;
  }
  .inputText {
    height: 33px;
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
}

.text-right {
  text-align: right;
}

.list-item {
  min-height: 50px;
}
.allowIconDelete {
  align-items: right;
  margin-top: 5px;
}
.attach-file-icon {
  font-size: 20px;
}
.el-button-group {
  float: right;
  .upload-button {
    border: none;
    border-radius: 0;
    background-color: #F5F5F5;
    height: 33px;
  }
}
@media only screen and (max-width: 768px) {
  .box-right-item   {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="reporting-type">
    <el-cascader
      :options="mainOptions"
      v-model="itemSeleted"
      :placeholder="$t('campaignReporting.reportingAction.custom')"
      clearable
      @change="onSeletecItemDropdown"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      title="Custom Column Report"
      width="900px">
      <el-tabs v-if="tabCategoryColumn.length > 0" tab-position="left" type="border-card">
        <el-tab-pane v-for="(item, indexParent) in tabCategoryColumn" :key="item.value" :item="item" :label="item.label">
          <template>
            <div class="tab-content">
              <div class="item-parent-lv2">
                <div class="item-button-add-all">
                  <el-button type="text" @click="onSelectAllColumn(indexParent)">Add all columns</el-button>
                  <i class="el-icon-back"/>
                </div>
                <div v-for="(itemLv2, indexChildren) in item.children" :key="itemLv2.value" class="item-children-lv2">
                  <h4 class="item-label-lv2">{{ itemLv2.label }}</h4>
                  <el-button :disabled="itemLv2.isSelected" :style="`color: ${itemLv2.isSelected? 'gray' : 'black'}`" type="text" @click="onColumnSelected(indexChildren, indexParent, itemLv2.default)">Added</el-button>
                </div>
              </div>
              <div class="item-parent-lv3">
                <div class="item-button-add-all">
                  <el-button type="text">Account name</el-button>
                </div>
                <div v-for="(itemLv2) in arrayItemChildSelected" :key="itemLv2.value">
                  <div v-if="itemLv2.isSelected && !itemLv2.default" class="item-children-lv2">
                    <h4 class="item-label-lv2">{{ itemLv2.label }}</h4>
                    <el-button type="text" @click="onRemoveSelectedColumn(itemLv2)">Remove</el-button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="name-column-report">
        <div class="label-name-column-report">
          <el-checkbox v-model="isUseNameForTemplateReport" class="check-box-name"/>
          <span>Save this set of columns</span>
        </div>
        <el-input
          v-model="nameTemplateColumnReport"
          class="input-name-column-report"
          placeholder="Name"
          clearable
          @change="onChangeName"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btn-apply" @click="applyModifyColumn">Apply</el-button>
        <el-button @click="handleClose">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomColumnReport from './CustomColumnReport'
export default CustomColumnReport
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>


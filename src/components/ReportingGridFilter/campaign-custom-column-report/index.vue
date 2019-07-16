<template>
  <div class="reporting-type ">
    <el-select :value="itemSelected" :placeholder="$t('campaignReporting.reportingAction.custom')" clearable >
      <el-option
        v-for="item in setOfColumns"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <div :class="{ 'set-column-label-wrapper': true, 'small-size': !isCustomOption(item) }">
          <i v-if="itemSelected === item.value" class="el-icon-check"/>
          <span :class="{ 'set-column-label': true, 'medium-size': !isCustomOption(item) }" @click="onSelectItemDropDown(item)">
            {{ item.label }}
          </span>
        </div>
        <span v-if="!isCustomOption(item)" class="set-column-remove" @click="onRemove(item)">Remove</span>
      </el-option>
    </el-select>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :title="$t('modifyColumnTitle')"
      width="50%"
      class="popup"
    >
      <el-tabs v-if="tabCategoryColumn.length > 0" tab-position="left" type="border-card" class="tab-panel" @tab-click="clickTab">
        <el-tab-pane v-for="(item, indexParent) in tabCategoryColumn" :key="item.value" :item="item" :label="item.label">
          <template>
            <div class="tab-content">
              <div class="item-parent-lv2">
                <div class="item-button-add-all">
                  <el-checkbox v-model="selectedAll" @change="onSelectAllColumn(indexParent)"/>
                  <el-button type="text" class="ml-12" @click="onSelectAllColumn(indexParent)">{{ $t('campaignReporting.reportingAction.addAllColumns') }}</el-button>
                </div>
                <div class="scroll">
                  <div v-for="(itemLv2, indexChildren) in item.children" :key="itemLv2.value" class="item-children-lv2">
                    <el-checkbox v-model="tabCategoryColumn[indexParent].children[indexChildren].isSelected" @change="updateListColumnSelected(indexParent)"/>
                    <h4 class="item-label-lv2">{{ itemLv2.label }}</h4>
                  </div>
                </div>
              </div>
              <div class="item-parent-lv3">
                <div class="text-default">
                  <span type="text">{{ $t('campaignReporting.reportingAction.accountName') }}</span>
                </div>
                <div class="scroll">
                  <div v-for="(itemLv2) in arrayItemChildSelected" :key="itemLv2.value">
                    <div v-if="itemLv2.isSelected && !itemLv2.default" class="item-children-lv2">
                      <h4 class="item-label-lv2">{{ itemLv2.label }}</h4>
                      <el-button type="text" class="mr-10" @click="onRemoveSelectedColumn(itemLv2)">
                        <i :title="$t('campaignReporting.reportingAction.remove')" class="el-icon-close"/>
                      </el-button>
                    </div>
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
          <span>{{ $t('campaignReporting.reportingAction.saveThisSet') }}</span>
        </div>
        <el-input
          v-model="nameTemplateColumnReport"
          :disabled="!isUseNameForTemplateReport"
          class="input-name-column-report"
          placeholder="Name"
          clearable
          @change="onChangeName"/>
      </div>
      <span slot="footer" class="">
        <el-button type="primary" class="btn-apply" @click="applyModifyColumn">{{ $t('campaignReporting.reportingAction.apply') }}</el-button>
        <el-button @click="handleClose">{{ $t('campaignReporting.reportingAction.cancel') }}</el-button>
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


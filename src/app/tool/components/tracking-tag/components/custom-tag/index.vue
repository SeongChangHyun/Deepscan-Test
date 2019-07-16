<template>
  <div class="custom-tag">
    <el-row :gutter="20" class="custom-tag-form">
      <el-col :span="24">
        <el-form ref="customTagForm" :model="formData" :rules="rules" label-width="170px">
          <el-form-item :label="`${$t('productFeed.trackingTag.form.customTagName')}: `" prop="custom_tag_name">
            <el-input v-model="formData.custom_tag_name" :placeholder="$t('productFeed.trackingTag.form.customTagNamePlaceholder')" class="custom-tag-name" />
          </el-form-item>
          <el-form-item :label="`${$t('productFeed.trackingTag.form.rule')}: `" prop="rule">
            <el-radio-group v-model="formData.rule" @change="changeRule">
              <el-radio :label="ruleValues.default" class="form-rule-default">{{ $t('productFeed.trackingTag.form.urlEqualsLabel') }}</el-radio> <br>
              <el-radio :label="ruleValues.install">{{ $t('productFeed.trackingTag.form.installCustomTagLabel') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="conversion-container">
            <el-form-item prop="category">
              <el-select v-model="formData.category" :placeholder="$t('productFeed.trackingTag.form.conversionPlaceholder')" class="category-select-box" @change="changeCategory">
                <el-option :label="$t('productFeed.trackingTag.form.conversionDefault')" :value="conversionValues.default" />
                <el-option :label="$t('productFeed.trackingTag.form.conversionGeneral')" :value="conversionValues.general" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="formData.rule === ruleValues.install" class="custom-value-name-container" prop="custom_value_name">
              <el-input v-model="formData.custom_value_name" :placeholder="$t('productFeed.trackingTag.form.customValueNamePlaceholder')" class="custom-value-name" @keyup.native.prevent="customValueNameInvalid = null">
                <el-button slot="append" :class="{ 'check-exist-button': true, 'un-check': customValueNameInvalid === null, 'invalid': customValueNameInvalid }" @click="checkCustomValueName">{{ genI18n('check') }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item v-if="formData.rule === ruleValues.default" class="destination-container" prop="destination_url">
              <el-input v-model="formData.destination_url" :disabled="formData.category === conversionValues.general" :placeholder="$t('productFeed.trackingTag.form.destinationUrl')" @keyup.native.prevent="destinationUrlInvalid = null">
                <template slot="prepend">{{ $t('productFeed.trackingTag.form.urlPrepend') }}</template>
                <el-button slot="append" :class="{ 'check-exist-button': true, 'un-check': destinationUrlInvalid === null, 'invalid': destinationUrlInvalid }" @click="checkDestinationUrl">{{ genI18n('check') }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item v-if="formData.rule === ruleValues.default" prop="referer_url">
              <el-input v-model="formData.referer_url" :disabled="formData.category === conversionValues.general" :placeholder="$t('productFeed.trackingTag.form.refererUrl')">
                <template slot="prepend">{{ $t('productFeed.trackingTag.form.urlPrepend') }}</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="conversion">
              <el-checkbox ref="setConversionValue" v-model="formData.conversion" :disabled="formData.category === conversionValues.general" @change="changeSetConversionValue"> {{ $t('productFeed.trackingTag.form.setConversionValue') }}</el-checkbox>
            </el-form-item>
            <el-form-item prop="conversion_value">
              <el-row>
                <el-col :span="12" class="conversion-value">
                  <el-input
                    :disabled="!formData.set_conversion_value"
                    :value="displayConversionValue()"
                    class="conversion-value-input"
                    @change="onChangeConversionValue"
                  />
                  <span :class="{ 'conversion-value-currency': true, 'disabled-view': !formData.set_conversion_value }">{{ getCurrencyType() }}</span>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item v-if="formData.rule === ruleValues.install">
            <div class="generate-btn-wrapper">
              <el-button type="primary" class="generate-btn" @click="onGenerate">{{ $t('productFeed.trackingTag.generateBtn') }}</el-button>
            </div>
            <div v-if="generateFlag" class="generate-information-container">
              <div>{{ $t('productFeed.trackingTag.form.followingInformation') }}</div>
              <div class="generate-tracking-tag-result">
                <el-tabs v-model="activeName" @tab-click="changeDevice">
                  <el-tab-pane :label="$t('productFeed.trackingTag.form.pcWeb')" name="pcWeb">
                    <div class="xml-information-container">
                      <div>{{ xmlPanelLabels.XML_HEADER }}</div>
                      <div class="information-content">{{ `${xmlPanelLabels.WP_HCUID}:"${generateDefaultValue(formData.wpHcuid)}",` }}</div>
                      <div class="information-content">{{ `${xmlPanelLabels.TI}:"${generateDefaultValue(getClientId())}",` }}</div>
                      <div class="information-content">{{ `${xmlPanelLabels.TY}:"` }}<span class="ty-value">{{ generateDefaultValue(formData.custom_value_name) }}</span>",</div>
                      <div class="information-content">{{ `${xmlPanelLabels.DEVICE}:"${generateDefaultValue(formData.device)}"` }}</div>
                      <div v-if="formData.conversion_value !== null" class="information-content">
                        <div>{{ `,${xmlPanelLabels.ITEMS}: [` }}</div>
                        <div class="information-content-items">{{ `{ ${xmlPanelLabels.I}: "` }}
                          <span class="i-value">{{ generateDefaultValue(formData.custom_tag_name) }}</span>
                          ", {{ `${xmlPanelLabels.T}: "` }}
                          <span class="t-value">{{ generateDefaultValue(formData.custom_tag_name) }}</span>
                          ", {{ `${xmlPanelLabels.P }: "` }}
                          <span class="p-value">{{ generateDefaultValue(formData.conversion_value) }}</span>"
                          ", {{ `${xmlPanelLabels.Q}: "` }}
                          <span class="q-value">{{ generateDefaultValue(1) }}</span>
                          "}
                        </div>
                        <div>{{ `]` }}</div>
                      </div>
                      <div>{{ xmlPanelLabels.XML_FOOTER }}</div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('productFeed.trackingTag.form.mobileWeb')" name="mobileWeb">
                    <div class="xml-information-container">
                      <div>{{ xmlPanelLabels.XML_HEADER }}</div>
                      <div class="information-content">{{ `${xmlPanelLabels.WP_HCUID}:"${generateDefaultValue(formData.wpHcuid)}"` }}</div>
                      <div class="information-content">{{ `${xmlPanelLabels.TI}:"${generateDefaultValue(getClientId())}"` }}</div>
                      <div class="information-content">{{ `${xmlPanelLabels.TY}:"` }}<span class="ty-value">{{ generateDefaultValue(formData.custom_value_name) }}</span>"</div>
                      <div class="information-content">{{ `${xmlPanelLabels.DEVICE}:"${generateDefaultValue(formData.device)}"` }}</div>
                      <div v-if="formData.conversion_value !== null" class="information-content">
                        <div>{{ `${xmlPanelLabels.ITEMS}: [` }}</div>
                        <div class="information-content-items">{{ `{ ${xmlPanelLabels.I}: "` }}
                          <span class="i-value">{{ generateDefaultValue(formData.custom_tag_name) }}</span>
                          ", {{ `${xmlPanelLabels.T}: "` }}
                          <span class="t-value">{{ generateDefaultValue(formData.custom_tag_name) }}</span>"
                          {{ `${xmlPanelLabels.P }: "` }}
                          <span class="p-value">{{ generateDefaultValue(formData.conversion_value) }}</span>"
                          {{ `${xmlPanelLabels.Q}: "` }}
                          <span class="q-value">{{ generateDefaultValue(1) }}</span>
                          "}
                        </div>
                        <div>{{ `]` }}</div>
                      </div>
                      <div>{{ xmlPanelLabels.XML_FOOTER }}</div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="formData.rule !== ruleValues.install" class="actions-container">
            <el-button type="primary" @click="onSubmit">{{ $t('productFeed.create') }}<i v-if="isLoadingSave" class="el-icon-loading"/></el-button>
            <el-button class="cancel-btn" @click="onCancel">{{ $t('productFeed.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="custom-tag-table">
      <div :class="showLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
        <content-loader :speed="2" :animate="true">
          <rect x="0" y="0" rx="3" ry="3" width="400" height="8" />
          <rect x="20" y="20" rx="3" ry="3" width="330" height="8" />
          <rect x="10" y="40" rx="3" ry="3" width="360" height="8" />
        </content-loader>
      </div>
      <el-table :data="tableData">
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.status')" align="center" prop="usage_status" width="150">
          <template slot-scope="scope">
            <div class="status-area">
              <span :class="[scope.row.usage_status ? 'unused' : '']" class="status"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.customTagName')" prop="custom_tag_name" width="250">
          <template slot-scope="scope">
            <a @click="editCustomTag(scope.row)"> {{ scope.row.custom_tag_name }} </a>
          </template>
        </el-table-column>
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.rule')" prop="rule"/>
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.category')" prop="category"/>
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.createData')" prop="create_date"/>
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.checkedData')" prop="checked_date"/>
        <el-table-column :sortable="true" :label="$t('productFeed.trackingTag.table.action')" prop="usage_status">
          <template slot-scope="scope">
            <el-button :class="{ 'status-action': true, isUsed: scope.row.usage_status }" @click="changeStatus(scope.$index, scope.row)">
              {{ $t(`productFeed.trackingTag.table.${scope.row.usage_status ? listStatus.used : listStatus.unused}`) }}
              <i v-if="loadingTagIndex.indexOf(scope.$index) > -1" class="el-icon-loading"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="note-message">{{ getNoteMessage() }}</div>
    </el-row>
  </div>
</template>

<script>
import CustomTag from './CustomTag'
export default CustomTag
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

<template>
  <div class="content-wrapper">
    <div :class="isLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
    </div>
    <el-form
      ref="clientForm"
      :model="clientForm"
      :rules="clientRules"
      class="content-under-loading client-form"
      auto-complete="on"
      label-width="150px"
      label-position="left"
    >
      <h3 class="title">{{ $t('client.clientInformation') }}</h3>

      <!-- Item 1 -->
      <el-form-item :label="$t('client.clientNo')+' :'" class="no-wrap client-no" prop="clientNo">
        <span>{{ Object.values(clientDetail).length > 0 ? clientDetail.client_id : '-' }}</span>
      </el-form-item>

      <!-- Item 2 -->
      <el-form-item :label="$t('client.clientName')+':'" prop="client_name" class="required">
        <el-input
          v-model="clientForm.client_name"
          :disabled="!getRoleClient(`client_name.${typeForm}`)"
          placeholder=""
          name="clientName"
          type="text"
        />
      </el-form-item>

      <!-- Item 3 -->
      <el-form-item :label="$t('client.webUrl')+':'" prop="website_url" class="required">
        <el-input
          v-model="clientForm.website_url"
          :disabled="!getRoleClient(`website_url.${typeForm}`)"
          placeholder="http://"
          name="webUrl"
          type="text"
        />
      </el-form-item>

      <!-- Item 4 -->
      <el-form-item :label="$t('client.industry')+':'" prop="category_code" class="required">
        <a-tree-select :disabled="!getRoleClient(`category_code.${typeForm}`)" :value="value" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" show-search class="select-industry" @change="handleNodeClick">
          <a-tree-select-node
            v-for="(item, index) in listIns"
            :key="index"
            :value="item.code + ',' + item.name"
            :title="item.name"
            :disabled="item.sub_items.length > 0"
          >
            <a-tree-select-node
              v-for="(itemLv2, indexlv2) in item.sub_items"
              :key="index + ',' +indexlv2"
              :value="itemLv2.code + ',' + itemLv2.name"
              :title="itemLv2.name"
              :disabled="itemLv2.sub_items.length > 0"
            >
              <a-tree-select-node
                v-for="(itemLv3, indexlv3) in itemLv2.sub_items"
                :key="index + ',' +indexlv2 + ',' + indexlv3"
                :value="itemLv3.code + ',' + itemLv3.name"
                :title="itemLv3.name"
              />
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
      </el-form-item>

      <el-form-item :label="$t('client.businessLoc')+':'" class="business-location required">
        <!-- Item 5 -->
        <el-col class="px-0 color-gray">
          <span>{{ getCountryName(accountInfo.country_code) }}{{ $t('cantChange') }}</span>
        </el-col>
        <el-col class="px-0" >
          <el-col :span="18" class="px-0 input-append-btn-70">
            <el-form-item prop="postal_code">
              <!-- Item 6 -->
              <el-input
                v-model="clientForm.postal_code"
                :disabled="true"
                :placeholder="$t('client.postalCode')"
                name="postalCode"
                type="text"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="pd-r-0 pd-l-0 btn-70">
            <el-form-item>
              <!-- Item 7 -->
              <el-button
                :disabled="!getRoleClient(`buttonCellPhone.${typeForm}`)"
                type="info"
                class="custom btn-custom w-100 rounded-0"
                @click="openAddressSearchDialog"
              >{{ $t('client.find') }}</el-button>
            </el-form-item>
          </el-col>
        </el-col>
        <div class="clear"/>
        <el-form-item>
          <!-- Item 8 -->
          <el-input
            v-model="clientForm.address1"
            :disabled="true"
            :placeholder="$t('client.adr1PH')"
            name="adr1"
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <!-- Item 9 -->
          <el-input
            v-model="clientForm.address2"
            :placeholder="$t('client.adr2PH')"
            :disabled="!getRoleClient(`address2.${typeForm}`)"
            name="adr2"
            type="text"
            class="mb-0"
          />
        </el-form-item>
      </el-form-item>

      <!-- Item 10 -->
      <el-form-item :label="$t('client.timeZone')+':'">
        <span>
          (UTC +09:00) Seoul/Tokyo
          <span class="color-gray">{{ $t('cantChange') }}</span>
        </span>
      </el-form-item>

      <!-- Item 11 -->
      <el-form-item :label="$t('client.currency')+':'" prop="currency" class="required">
        <el-select v-model="clientForm.currency" :disabled="!getRoleClient(`currency.${typeForm}`)" filterable class="w-100">
          <el-option
            v-for="item in accountAndBillings.LIST_CURRENCY"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- Item 12 -->
      <el-form-item :label="$t('client.email')+':'" prop="email" class="required">
        <el-input
          v-model="clientForm.email"
          :disabled="!getRoleClient(`email.${typeForm}`)"
          placeholder=""
          name="email"
          type="text"
        />
      </el-form-item>

      <!-- Item 13 -->
      <el-form-item :label="`${$t('memberAccount.cellPhone')} ${$t('option')}`+':'" class="phone-group form-type">
        <el-row>
          <!-- Item 13-a -->
          <el-col :xs="4" :sm="4" :md="4" :lg="4">
            {{ accountInfo.country_code === accountAndBillings.KOREA_CODE ? accountAndBillings.PHONE_CODE_KO : accountAndBillings.PHONE_CODE_JP }}
          </el-col>
          <el-col :xs="24" :sm="20" :md="20" :lg="20">
            <el-row class="mb-2" >
              <!-- Item 13-c -->
              <el-col :span="16" class="pd-r-0 input-append-btn-70" >
                <el-form-item prop="cell_phone" class="cell-phone">
                  <el-input
                    v-model="clientForm.cell_phone"
                    :disabled="!getRoleClient(`cell_phone.${typeForm}`) || isSentCode"
                    :placeholder="$t('memberAccount.phoneNumber')"
                    :maxlength="common.MAX_LENGTH_PHONE_NUMBER"
                    name="phoneNumber"
                    auto-complete="on"
                    type="text"
                    @keyup.native.prevent="formatNumberEvent($event, 'cell_phone')"
                  />
                </el-form-item>
              </el-col>
              <!-- Item 13-d -->
              <el-col :span="8" class="pd-l-0 btn-70">
                <el-button
                  :disabled="isSentCode || isDisableButtonVerifyOtp"
                  type="info"
                  class="custom w-100 rounded-0 px-0 mg-l-5"
                  @click.native.prevent="onChangePhone"
                >{{ $t('client.verify') }}</el-button>
              </el-col>
            </el-row>
            <!-- Item 13-e -->
            <el-row class="h-36px">
              <el-form-item prop="otp" class="otp">
                <el-input
                  v-model="clientForm.otp"
                  :placeholder="$t('memberAccount.confirmTelCode')"
                  :disabled="!getRoleClient(`otp.${typeForm}`)"
                  maxlength="6"
                  name="confirmTelCode"
                  type="text"
                  auto-complete="on"
                  @keyup.native.prevent="formatNumberEvent($event, 'otp')"
                >
                  <span v-if="isSentCode" slot="suffix" class="text-muted text-right px-2 position-relative mt--heightRow timer">{{ expiredLeft }}</span>
                </el-input>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- Item 17 -->
      <el-form-item :label="`${$t('memberAccount.legalPhoneNumber')} ${$t('option')}`+':'" class="phone-group form-type">
        <el-row>
          <el-col :xs="4" :sm="4" :md="4" :lg="4">
            {{ accountInfo.country_code === accountAndBillings.KOREA_CODE ? accountAndBillings.PHONE_CODE_KO : accountAndBillings.PHONE_CODE_JP }}
          </el-col>
          <el-col :xs="24" :sm="20" :md="20" :lg="20">
            <el-row>
              <el-form-item prop="business_phone">
                <el-input
                  v-model="clientForm.business_phone"
                  :disabled="!getRoleClient(`business_phone.${typeForm}`)"
                  :placeholder="$t('memberAccount.phoneNumber')"
                  :maxlength="common.MAX_LENGTH_PHONE_NUMBER"
                  name="phoneNumber"
                  auto-complete="on"
                  type="text"
                  @keyup.native.prevent="formatNumberEvent($event, 'business_phone')"
                />
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- Item 18 -->
      <el-form-item :label="$t('client.payment')+':'">
        <el-select v-model="clientForm.payment_type" :disabled="!getRoleClient(`payment_type.${typeForm}`)" filterable class="w-100">
          <el-option
            v-for="item in accountAndBillings.LIST_PAYMENT_SETTING"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- Item 19 -->
      <el-form-item :label="$t('client.taxAmount')+':'">
        <el-select v-model="clientForm.tax_invoice_amount" :disabled="!getRoleClient(`tax_invoice_amount.${typeForm}`)" filterable class="w-100">
          <el-option
            v-for="item in accountAndBillings.LIST_TAX_INVOICE_AMOUNT"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- Item 27 -->
      <el-form-item :label="$t('client.taxIssuer')+':'">
        <el-select v-model="clientForm.tax_invoice_issuer" :disabled="!getRoleClient(`tax_invoice_issuer.${typeForm}`)" placeholder="-" filterable class="w-100">
          <el-option
            v-for="item in accountAndBillings.LIST_TAX_INVOICE_ISSUER"
            :key="item.value"
            :label="item.value === common.AGENCY ? showAgencyName(item.label) : item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <slot />

      <!-- Item 28 -->
      <el-form-item v-if="Object.keys(clientDetail).length === 0 && clientDetail.constructor === Object" :label="$t('client.privacy')+':'">
        <el-input
          v-model="advertiserTerms"
          :disabled="!getRoleClient(`advertiser_terms.${typeForm}`)"
          :rows="5"
          placeholder=""
          name="privacy"
          type="textarea"
        />
      </el-form-item>

      <!-- Dialog: Address Search -->
      <el-dialog :modal-append-to-body="true" :append-to-body="true" :visible.sync="dialogVisible" :show-close="false" class="dialog">
        <i class="el-icon-circle-close close-modal" @click="handleClose"/>
        <div class="dialog-title">
          <div class="address-search-title">{{ $t('register.postalAddressSearch.addressSearchTitle') }}</div>
        </div>
        <div class="dialog-content">
          <el-tabs type="card">
            <el-tab-pane :label="$t('register.postalAddressSearch.roadBaseTabLabel')">
              <address-search
                :type="addressSearchRoadBaseType"
                :country="accountInfo.country_code"
                @get-postal-code-and-address="getPostalCodeAndAddress"
              />
            </el-tab-pane>
            <el-tab-pane :label="$t('register.postalAddressSearch.houseBaseTabLabel')">
              <address-search
                :country="accountInfo.country_code"
                @get-postal-code-and-address="getPostalCodeAndAddress"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import createClientsManagementController from './CreateClientsManagement'
export default createClientsManagementController
</script>

<style lang="scss" scoped>
.client-form {
  /deep/ .el-form-item__error{
    position: relative;
  }
  /deep/.el-input--medium {
    .el-input__inner{
      height: 29px !important;
      line-height: 29px;
    }
  }
  .el-button.custom{
    height: 29px;
    padding: 0 !important;
    &.is-disabled{
      background-color: #c8c9cc;
      border-color: #c8c9cc;
    }
  }
}

/deep/ .el-form-item__label{
  padding-right: 10px !important;
  line-height: 29px;
}
.title {
  margin: 0;
  color: #606266;
  margin-bottom: 10px;
  font-size: 20px
}
.color-gray {
  color: #ccc;
  line-height: 29px;
}

.btn-custom{
  background-color: #1D93CF;
  border-color: #1D93CF;
  cursor: pointer;
}
.pd-r-10{
  padding-right: 10px
}
.clear {
  clear: both;
}
@media(max-width: 768px) {
  /deep/ .el-form-item__label {
    float: none;
  }
  /deep/ .el-form-item__content{
    margin-left: 0 !important;
  }
  .no-wrap {
    /deep/ .el-form-item__label {
    float: left ;
    }
    /deep/ .el-form-item__content{
      margin-left: 150px !important;
    }

  }
   .client-no{
      /deep/ .el-form-item__content{
        line-height: 24px !important;
      }
   }
}
.input-append-btn-70 {
  width: calc(100% - 70px);
  /deep/ .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
.btn-70 {
  width: 70px;
}
@media(max-width: 768px) {
  .mr-bt-10{
    margin-bottom: 10px
  }
  /deep/ .el-dialog{
    width: 90%;
  }
}
.pd-l-0 {
  padding-left: 0px !important;
}
.pd-r-0 {
  padding-right: 0px !important;
}
.mask-item{
  flex: 1 1 0%;
  height: 24px;
  z-index: 10;
  position: absolute;
  width: 300px;
}
</style>


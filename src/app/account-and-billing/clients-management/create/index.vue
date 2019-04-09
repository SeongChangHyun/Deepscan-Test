<template>
  <div class="create-clients">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" class="content-form pr-2">
        <div>
          <el-form
            ref="clientForm"
            :model="clientForm"
            :rules="clientRules"
            class="client-form"
            auto-complete="on"
            label-position="top"
          >
            <!-- Item 1 -->
            <el-form-item :label="$t('client.clientNo')" prop="clientNo">
              <span>-</span>
            </el-form-item>

            <!-- Item 2 -->
            <el-form-item :label="$t('client.clientName')" prop="clientName">
              <el-input
                v-model="clientForm.clientName"
                placeholder=""
                name="clientName"
                type="text"
              />
            </el-form-item>

            <!-- Item 3 -->
            <el-form-item :label="$t('client.webUrl')" prop="webUrl">
              <el-input
                v-model="clientForm.webUrl"
                placeholder="http://"
                name="webUrl"
                type="text"
              />
            </el-form-item>

            <!-- Item 4 -->
            <el-form-item :label="$t('client.industry')" prop="industry">
              <el-select v-model="clientForm.industry" :placeholder="$t('client.select')" filterable class="w-100" @change="onChangeTest">
                <el-option-group
                  v-for="groupLv1 in listIns"
                  :key="groupLv1.label"
                  :label="groupLv1.label">
                  <el-option-group
                    v-for="groupLv2 in groupLv1.options"
                    :key="groupLv2.label"
                    :label="groupLv2.label"
                    class="ml-2">
                    <el-option
                      v-for="item in groupLv2.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="ml-2"/>
                  </el-option-group>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('client.businessLoc')" prop="adr1">
              <!-- Item 5 -->
              <el-col :xs="24">
                <span>{{ user.login }}</span>
              </el-col>
              <el-form-item>
                <el-col :span="18">
                  <el-form-item prop="postalCode">
                    <!-- Item 6 -->
                    <el-input
                      v-model="clientForm.postalCode"
                      :placeholder="$t('client.postalCode')"
                      name="postalCode"
                      type="text"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <!-- Item 7 -->
                    <el-button
                      type="info"
                      class="btn-register w-100 rounded-0 px-0"
                    >{{ $t('client.find') }}</el-button>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item class="pt-2">
                <!-- Item 8 -->
                <el-input
                  v-model="clientForm.adr1"
                  :placeholder="$t('client.adr1PH')"
                  name="adr1"
                  type="text"
                />
              </el-form-item>
              <el-form-item class="pt-2">
                <!-- Item 9 -->
                <el-input
                  v-model="clientForm.adr2"
                  :placeholder="$t('client.adr2PH')"
                  name="adr2"
                  type="text"
                  class="mb-0"
                />
              </el-form-item>
            </el-form-item>

            <!-- Item 10 -->
            <el-form-item :label="$t('client.timeZone')">
              <span>{{ user.timeZone }}</span>
            </el-form-item>

            <!-- Item 11 -->
            <el-form-item :label="$t('client.currency')" prop="currency">
              <el-form-item>
                <el-select v-model="clientForm.currency" filterable class="w-100">
                  <el-option
                    v-for="item in AccountAndBillings.LIST_CURRENCY"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-form-item>

            <!-- Item 12 -->
            <el-form-item :label="$t('client.email')" prop="email">
              <el-input
                v-model="clientForm.email"
                placeholder=""
                name="email"
                type="text"
              />
            </el-form-item>

            <!-- Item 13 -->
            <el-form-item class="form-type" prop="phoneGroup">
              <div class="el-form-item__label"><b>{{ $t('memberAccount.cellPhone') }}</b>({{ $t('memberAccount.optional') }})</div>
              <el-row>
                <!-- Item 13-a -->
                <el-col :span="4">
                  {{ clientForm.countryCode === AccountAndBillings.KOREA_CODE ? AccountAndBillings.PHONE_CODE_KO : AccountAndBillings.PHONE_CODE_JP }}
                </el-col>
                <!-- Item 13-b -->
                <el-col :span="4" class="px-2">
                  <el-select v-model="clientForm.tel.telcos" :placeholder="$t('memberAccount.selectTelcos')" filterable class="w-100">
                    <el-option
                      v-for="item in AccountAndBillings.LIST_TELCOS"
                      :key="item"
                      :label="item"
                      :value="item" />
                  </el-select>
                </el-col>
                <el-col :span="16">
                  <el-row>
                    <!-- Item 13-c -->
                    <el-col :span="18" class="mb-2">
                      <el-input
                        v-model="clientForm.tel.number"
                        :placeholder="$t('memberAccount.phoneNumber')"
                        name="phoneNumber"
                        type="text"
                        auto-complete="on"
                      />
                    </el-col>
                    <!-- Item 13-d -->
                    <el-col :span="6">
                      <el-button
                        :disabled="isSentCode"
                        type="info"
                        class="btn-change w-100 rounded-0 px-0"
                        @click.native.prevent="onChangePhone"
                      >{{ $t('client.verify') }}</el-button>
                    </el-col>
                  </el-row>
                  <!-- Item 13-e -->
                  <el-row class="h-36px">
                    <el-input
                      v-model="confirmTelCode"
                      :placeholder="$t('memberAccount.confirmTelCode')"
                      name="confirmTelCode"
                      type="text"
                      auto-complete="on"
                    />
                    <div v-if="isSentCode" class="text-muted text-right px-2 position-relative mt--heightRow timer">{{ expiredLeft }}</div>
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- Item 17 -->
            <el-form-item class="form-type">
              <div class="el-form-item__label"><b>{{ $t('memberAccount.legalPhoneNumber') }}</b>({{ $t('memberAccount.optional') }})</div>
              <el-row>
                <el-col :span="4">
                  {{ clientForm.countryCode === AccountAndBillings.KOREA_CODE ? AccountAndBillings.PHONE_CODE_KO : AccountAndBillings.PHONE_CODE_JP }}
                </el-col>
                <el-col :span="20" class="pl-1">
                  <el-row>
                    <el-input
                      v-model="clientForm.businessTel"
                      :placeholder="$t('memberAccount.phoneNumber')"
                      name="phoneNumber"
                      type="text"
                      auto-complete="on"
                    />
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- Item 18 -->
            <el-form-item v-if="checkPermission()" :label="$t('client.payment')">
              <el-select v-model="clientForm.payment" filterable class="w-100">
                <el-option
                  v-for="item in AccountAndBillings.LIST_CURRENCY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <!-- Item 19 -->
            <el-form-item v-if="checkPermission()" :label="$t('client.taxAmount')">
              <el-select v-model="clientForm.taxAmount" filterable class="w-100">
                <el-option
                  v-for="item in AccountAndBillings.LIST_CURRENCY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <!-- Item 27 -->
            <el-form-item v-if="checkPermission()" :label="$t('client.taxIssuer')">
              <el-select v-model="clientForm.taxIssuer" filterable class="w-100">
                <el-option
                  v-for="item in AccountAndBillings.LIST_CURRENCY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <!-- Item 28 -->
            <el-form-item :label="$t('client.privacy')">
              <el-input
                v-model="clientForm.privacy"
                placeholder=""
                name="email"
                type="textarea"
              />
            </el-form-item>

            <!-- Item 29 -->
            <el-form-item class="mt--10 mb-0">
              <el-checkbox v-model="clientForm.term" :class="{'term-danger': isReadTermErr}" @change="isReadTermErr = !clientForm.term">{{ $t('client.term') }}</el-checkbox>
            </el-form-item>

            <!-- Item 29 -->
            <el-form-item class="mt--10 mb-0">
              <el-button
                type="info"
                class="btn-register w-100px rounded-0 px-0"
                @click="onSubmit"
              >
                {{ $t('memberAccount.saveBtn') }}
              </el-button>
              <el-button
                type="info"
                class="btn-register w-100px rounded-0 px-0"
                @click="onCancel"
              >
                {{ $t('memberAccount.cancelBtn') }}
              </el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" class="content-form pl-2">
        <div>
          <billing-and-access-user />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import createClientsManagementController from './CreateClientsManagement'
export default createClientsManagementController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './createClientsManagement.scss'
</style>

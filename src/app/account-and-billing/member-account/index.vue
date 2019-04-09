<template>
  <div class="member-account bg-light">
    <div class="page-contain el-col-md-18 el-col-sm-20 el-col-22 text-left float-none mx-auto py-3">
      <div class="page-content p-3 border bg-white">
        <el-form
          ref="memberAccountForm"
          :model="memberAccountForm"
          :rules="memberAccountRules"
          class="memberAccount-form"
          auto-complete="on"
          label-position="left"
        >
          <!-- Item 1 -->
          <el-form-item class="form-type">
            <div><b>{{ $t('memberAccount.userType') }}</b></div>
            <el-form-item>
              <el-radio-group v-model="memberAccountForm.typeMemberAccount" :disabled="currentUser.typeMemberAccount === Auth.BUSINESS_TYPE" @change="onChangeType">
                <el-radio-button label="personal">{{ $t('memberAccount.personalLabel') }}</el-radio-button>
                <el-radio-button label="business">{{ $t('memberAccount.businessLabel') }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form-item>

          <el-form-item class="form-type">
            <div><b>{{ $t('memberAccount.loginId') }}</b>({{ $t('memberAccount.email') }})</div>
            <el-form-item>
              <!-- Item 2 -->
              <el-col :span="12" class="pr-1">
                <el-form-item>
                  <a>{{ currentUser.email }} ({{ currentUser.id }})</a>
                </el-form-item>
              </el-col>
              <!-- Item 3 -->
              <el-col :span="12" class="pl-1">
                <el-form-item v-if="currentUser.isVerified">
                  {{ $t('memberAccount.verified') }}
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.password') }}</b></div>
            <el-form-item>
              <!-- Item 4 -->
              <el-col :span="12" class="pr-1">
                <el-form-item prop="password">
                  <el-input
                    v-model="memberAccountForm.password"
                    :placeholder="$t('register.password')"
                    name="password"
                    type="password"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField(['password', 'passwordRpt'])"
                  />
                </el-form-item>
              </el-col>
              <!-- Item 5 -->
              <el-col :span="12" class="pl-1">
                <el-form-item prop="passwordRpt">
                  <el-input
                    v-model="memberAccountForm.passwordRpt"
                    :placeholder="$t('register.passwordRpt')"
                    name="passwordRpt"
                    type="password"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField(['password', 'passwordRpt'])"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <el-form-item v-if="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE" class="form-type mb-2">
            <el-form-item>
              <!-- Item 6 -->
              <el-col :span="12" class="pr-1">
                <el-form-item prop="lastName">
                  <div><b>{{ $t('memberAccount.presidentLastName') }}</b></div>
                  <el-input
                    v-model="memberAccountForm.presidentLastName"
                    :placeholder="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE ? $t('register.lastNameB') : $t('register.lastName')"
                    name="presidentLastName"
                    type="text"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField(['lastName'])"
                  />
                </el-form-item>
              </el-col>
              <!-- Item 7 -->
              <el-col :span="12" class="pl-1">
                <el-form-item prop="firstName">
                  <div><b>{{ $t('memberAccount.presidentFirstName') }}</b></div>
                  <el-input
                    v-model="memberAccountForm.presidentFirstName"
                    :placeholder="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE ? $t('register.firstNameB') : $t('register.firstName')"
                    name="presidentFirstName"
                    type="text"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField(['firstName'])"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <el-form-item class="form-type mb-2">
            <el-form-item>
              <!-- Item 8 -->
              <el-col :span="12" class="pr-1">
                <el-form-item>
                  <div><b>{{ $t('memberAccount.lastName') }}</b>({{ $t('memberAccount.optional') }})</div>
                  <el-input
                    v-model="memberAccountForm.lastName"
                    :placeholder="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE ? $t('register.lastNameB') : $t('register.lastName')"
                    name="lastName"
                    type="text"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField"
                  />
                </el-form-item>
              </el-col>
              <!-- Item 9 -->
              <el-col :span="12" class="pl-1">
                <el-form-item>
                  <div><b>{{ $t('memberAccount.firstName') }}</b>({{ $t('memberAccount.optional') }})</div>
                  <el-input
                    v-model="memberAccountForm.firstName"
                    :placeholder="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE ? $t('register.firstNameB') : $t('register.firstName')"
                    name="firstName"
                    type="text"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <!-- Item 10 -->
          <el-form-item class="form-type mb-2" prop="phoneGroup">
            <div><b>{{ $t('memberAccount.cellPhone') }}</b>({{ $t('memberAccount.optional') }})</div>
            <el-form-item>
              <!-- Item 10-a -->
              <el-col :span="4">
                {{ memberAccountForm.countryCode === AccountAndBillings.KOREA_CODE ? AccountAndBillings.PHONE_CODE_KO : AccountAndBillings.PHONE_CODE_JP }}
              </el-col>
              <!-- Item 10-b -->
              <el-col :span="4" class="px-2">
                <el-select v-model="memberAccountForm.tel.telcos" :placeholder="$t('memberAccount.selectTelcos')" filterable class="w-100" @change="onChangeField(['phoneGroup'])">
                  <el-option
                    v-for="item in AccountAndBillings.LIST_TELCOS"
                    :key="item"
                    :label="item"
                    :value="item" />
                </el-select>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <!-- Item 10-c -->
                  <el-col :span="18" class="mb-2">
                    <el-input
                      v-model="memberAccountForm.tel.number"
                      :placeholder="$t('memberAccount.phoneNumber')"
                      name="phoneNumber"
                      type="text"
                      auto-complete="on"
                      @keyup.native.prevent="onChangeField(['phoneGroup'])"
                    />
                  </el-col>
                  <!-- Item 10-d -->
                  <el-col :span="6">
                    <el-button
                      :loading="isLoading"
                      :disabled="isSentCode"
                      type="info"
                      class="btn-change w-100 rounded-0 px-0"
                      @click.native.prevent="onChangePhone"
                    >{{ $t('memberAccount.changeBtn') }}</el-button>
                  </el-col>
                </el-form-item>
                <!-- Item 10-e -->
                <el-form-item class="h-36px">
                  <el-input
                    v-model="confirmTelCode"
                    :placeholder="$t('memberAccount.confirmTelCode')"
                    name="confirmTelCode"
                    type="text"
                    auto-complete="on"
                    @change="onConfirmTelCode"
                  />
                  <div v-if="isSentCode" class="text-muted text-right px-2 position-relative mt--heightRow timer">{{ expiredLeft }}</div>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <!-- Item 11 -->
          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.legalPhoneNumber') }}</b>({{ $t('memberAccount.optional') }})</div>
            <el-form-item>
              <el-col :span="4">
                {{ memberAccountForm.countryCode === AccountAndBillings.KOREA_CODE ? AccountAndBillings.PHONE_CODE_KO : AccountAndBillings.PHONE_CODE_JP }}
              </el-col>
              <el-col :span="20" class="pl-1">
                <el-form-item>
                  <el-input
                    v-model="memberAccountForm.businessTel"
                    :placeholder="$t('memberAccount.phoneNumber')"
                    name="phoneNumber"
                    type="text"
                    auto-complete="on"
                    @keyup.native.prevent="onChangeField"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <!-- Item 12 -->
          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.country') }}</b></div>
            <el-form-item>
              {{ memberAccountForm.country }} <span class="text-muted">({{ $t('memberAccount.cantChange') }})</span>
            </el-form-item>
          </el-form-item>

          <!-- Item 13 -->
          <el-form-item class="form-type mb-2" prop="postalCode">
            <div><b>{{ $t('memberAccount.postalCode') }}</b></div>
            <el-form-item>
              <el-col :span="20">
                <el-form-item>
                  <el-autocomplete
                    v-model="memberAccountForm.postalCode"
                    :fetch-suggestions="onSearchAdr"
                    :placeholder="$t('register.searchAdr')"
                    :trigger-on-focus="false"
                    class="w-100"
                    @select="onSelectAdr"
                  >
                    <template slot-scope="{item}">
                      <div class="adr_name">{{ item.adr_name }}</div>
                    </template>
                  </el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button
                  :loading="isLoading"
                  type="info"
                  class="btn-change w-100 rounded-0 px-0"
                  @click.native.prevent="onSearchAdr"
                >{{ $t('memberAccount.changeBtn') }}</el-button>
              </el-col>
            </el-form-item>
          </el-form-item>

          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.address') }}</b></div>
            <el-form-item>
              <!-- Item 14 -->
              <el-col :span="24">
                <el-form-item>
                  {{ memberAccountForm.adr1 }}
                </el-form-item>
              </el-col>
              <!-- Item 15 -->
              <el-col :span="24">
                <el-form-item>
                  <el-input
                    v-model="memberAccountForm.adr2"
                    :placeholder="$t('memberAccount.blankAddress')"
                    name="address2"
                    type="text"
                    auto-complete="on"
                    @change="onChangeField"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <!-- Item 16 -->
          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.language') }}</b>({{ $t('memberAccount.optional') }})</div>
            <el-form-item>
              <el-select v-model="memberAccountForm.lang" filterable class="w-100" @change="onChangeField">
                <el-option
                  v-for="item in AccountAndBillings.DISPLAY_LANG"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code" />
              </el-select>
            </el-form-item>
          </el-form-item>

          <!-- Item 17 -->
          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.currency') }}</b>({{ $t('memberAccount.optional') }})</div>
            <el-form-item>
              <el-select v-model="memberAccountForm.currency" filterable class="w-100" @change="onChangeField">
                <el-option
                  v-for="item in AccountAndBillings.LIST_CURRENCY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form-item>

          <!-- Item 18 -->
          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.validTime') }}</b> ({{ $t('memberAccount.optional') }})</div>
            <el-form-item>
              <el-select v-model="memberAccountForm.validTime" filterable class="w-100" @change="onChangeField">
                <el-option
                  v-for="item in AccountAndBillings.LIST_VALID_TIME"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form-item>

          <!-- Item 19 -->
          <el-form-item v-if="memberAccountForm.typeMemberAccount === Auth.PERSONAL_TYPE" class="form-type mb-3" prop="commissionFee">
            <div><b>{{ $t('memberAccount.commissionFee') }}</b> ({{ $t('memberAccount.optional') }} - {{ $t('memberAccount.superAdminOnly') }})</div>
            <el-form-item>
              <el-col :span="12">
                <el-form-item>
                  <el-input
                    :min="0"
                    :max="100"
                    :step="0.1"
                    :disabled="!isSuperAdmin"
                    v-model="memberAccountForm.commissionFee"
                    name="commissionFee"
                    type="number"
                    @keyup.native.prevent="formatCommissionFee(memberAccountForm.commissionFee)"
                    @change="onChangeField(['commissionFee'])"
                  />
                  <span class="px-2 float-right mt--heightRow position-relative text-muted">%</span>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <hr>

          <el-form-item class="form-type mb-2">
            <div><b>{{ $t('memberAccount.documentInformation') }}</b> ({{ $t('memberAccount.optional') }})</div>
            <el-form-item>
              <el-col :span="12" class="pr-1">
                <!-- Item 20 -->
                <el-form-item class="mb-2" prop="licenseNumber">
                  <el-col :span="20">
                    <el-form-item>
                      <el-input
                        v-model="memberAccountForm.licenseNumber"
                        :placeholder="$t('register.licenseNumber')"
                        name="licenseNumber"
                        type="text"
                        auto-complete="on"
                        @change="onChangeField"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item class="text-center">
                      pending
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <!-- Item 22 -->
                <el-form-item class="mb-2 text-center">
                  <img :src="memberAccountForm.item22" class="pan-thumb">
                </el-form-item>
                <!-- Item 23 -->
                <el-form-item class="mb-2 upload-file">
                  <el-button
                    v-if="!memberAccountForm.item23"
                    type="info"
                    class="btn-register w-100 rounded-0 px-0"
                    @click.native.prevent="onCertification"
                  >{{ $t('register.selectFile') }}</el-button>
                  <input v-if="!memberAccountForm.item23" ref="item23" type="file" name="myfile" @change="uploadFile($event, 'item23')">
                  <el-button
                    v-if="memberAccountForm.item23"
                    type="info"
                    class="btn-register w-100 rounded-0 px-0"
                  >{{ $t('memberAccount.deleteBtn') }}</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="pl-1">
                <el-form-item class="mb-2">
                  <el-col :span="5">
                    <!-- Item 24 -->
                    <el-form-item prop="bank">
                      <el-select v-model="memberAccountForm.bank" :placeholder="$t('register.selectBank')" filterable class="w-100" @change="onChangeField">
                        <el-option
                          v-for="item in listBank"
                          :key="item.bank_code"
                          :label="item.bank_name"
                          :value="item.bank_code" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <!-- Item 25 -->
                    <el-form-item prop="bankNumber" class="px-2">
                      <el-input
                        v-model="memberAccountForm.bankNumber"
                        :placeholder="$t('register.bankNumber')"
                        name="bankNumber"
                        type="text"
                        auto-complete="on"
                        @change="onChangeBankbook()"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <!-- Item 26 -->
                    <el-form-item prop="owner">
                      <el-input
                        v-model="memberAccountForm.owner"
                        :placeholder="$t('register.owner')"
                        name="owner"
                        type="text"
                        auto-complete="on"
                        @change="onChangeBankbook()"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item class="text-center">
                      pending
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <!-- Item 28 -->
                <el-form-item class="mb-2 text-center">
                  <img :src="memberAccountForm.item28" class="pan-thumb">
                </el-form-item>
                <!-- Item 29 -->
                <el-form-item class="mb-2 upload-file">
                  <el-button
                    v-if="!memberAccountForm.item29"
                    type="info"
                    class="btn-register w-100 rounded-0 px-0"
                    @click.native.prevent="onCertification"
                  >{{ $t('register.selectFile') }}</el-button>
                  <input v-if="!memberAccountForm.item29" ref="item29" type="file" name="myfile" @change="uploadFile($event, 'item29')">
                  <el-button
                    v-if="memberAccountForm.item29"
                    type="info"
                    class="btn-register w-100 rounded-0 px-0"
                  >{{ $t('memberAccount.deleteBtn') }}</el-button>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>

          <!-- Item 30 -->
          <div class="business-type-tips py-2">
            <div class="tips-text" v-html="getInstructions($t('memberAccount.instructions'))" />
          </div>

          <el-form-item class="mb-0">
            <!-- Item 31 -->
            <el-button
              :loading="isLoading"
              :disabled="!isChanged"
              type="info"
              class="btn-memberAccount rounded-0 w-100px"
              @click.native.prevent="onSubmit"
            >{{ $t('memberAccount.saveBtn') }}</el-button>
            <!-- Item 32 -->
            <el-button
              :loading="isLoading"
              :disabled="!isChanged"
              type="info"
              class="btn-memberAccount rounded-0 w-100px"
              @click.native.prevent="onCancel"
            >{{ $t('memberAccount.cancelBtn') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import memberAccountController from './MemberAccount'
export default memberAccountController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './memberAccount.scss'
</style>

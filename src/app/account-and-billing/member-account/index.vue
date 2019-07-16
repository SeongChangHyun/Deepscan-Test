<template>
  <div class="member-account bg-light">
    <div class="page-contain el-col-md-24 el-col-sm-24 el-col-24 text-left float-none mx-auto pt-3">
      <div class="page-content p-3 border bg-white">
        <content-loader
          v-if="isLoading"
          :speed="2"
          :animate="true"
        >
          <rect x="0" y="0" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="20" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="40" rx="3" ry="3" width="300" height="8" />
          <rect x="0" y="60" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="80" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="100" rx="3" ry="3" width="300" height="8" />
          <rect x="0" y="120" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="140" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="160" rx="3" ry="3" width="300" height="8" />
          <rect x="0" y="180" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="200" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="220" rx="3" ry="3" width="300" height="8" />
          <rect x="0" y="240" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="260" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="280" rx="3" ry="3" width="300" height="8" />
          <rect x="0" y="300" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="320" rx="3" ry="3" width="300" height="8" />
          <rect x="20" y="340" rx="3" ry="3" width="300" height="8" />
        </content-loader>
        <el-form
          v-if="!isLoading"
          ref="memberAccountForm"
          :model="memberAccountForm"
          :rules="memberAccountRules"
          class="memberAccount-form"
          auto-complete="off"
          label-position="left"
        >
          <el-form-item class="form-type">
            <!-- Left Col -->
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="px-2 left-col">
              <!-- Item 1 -->
              <el-form-item class="form-type mb-0">
                <template slot="label"><h2 class="my-0 color-black user-type-label">{{ $t('memberAccount.userType') }}</h2></template>
                <el-form-item class="user-type">
                  <el-radio-group v-model="memberAccountForm.isPersonal" @change="onChangeType($event)">
                    <el-radio :label="true" :disabled="!currentUser.isPersonal || checkIsSuperAdminLogon">{{ $t('memberAccount.personalLabel') }}</el-radio>
                    <el-radio :label="false" :disabled="currentUser.isPersonal || checkIsSuperAdminLogon">{{ $t('memberAccount.businessLabel') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type mb-2">
                <template slot="label"><b>{{ $t('memberAccount.loginId') }}</b>({{ $t('memberAccount.email') }}):</template>
                <!-- Item 2, 3 -->
                <el-col :xs="24" :sm="24" :md="16" :lg="16" class="pl-1">
                  <el-form-item >
                    <div class="d-flex flex-wrap">
                      <div class="pr-3">{{ memberAccountForm.email_address }}</div>
                      <div v-if="memberAccountForm.active" class="verify-email">
                        <i class="el-icon-check"/>{{ $t('memberAccount.verified') }}
                      </div>
                      <div v-else class="un-verify">
                        <img src="@/assets/icon/unverified-icon.png">{{ $t('memberAccount.unverified') }}
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item class="form-type">
                <template slot="label"><b>{{ $t('memberAccount.password') }}</b>:</template>
                <el-form-item>
                  <!-- Item 4 -->
                  <el-col :xs="12" :sm="12" :md="8" :lg="8" class="pr-1">
                    <el-form-item prop="password">
                      <el-input
                        v-model="memberAccountForm.password"
                        :disabled="isSuperAdmin"
                        :placeholder="$t('register.password')"
                        name="password"
                        type="password"
                        class="form-control"
                        @keyup.native.prevent="onChangePass(['password'])"
                      />
                    </el-form-item>
                  </el-col>
                  <!-- Item 5 -->
                  <el-col :xs="12" :sm="12" :md="8" :lg="8" class="pl-1">
                    <el-form-item prop="confirmed_password">
                      <el-input
                        v-model="memberAccountForm.confirmed_password"
                        :disabled="isSuperAdmin"
                        :placeholder="$t('register.passwordRpt')"
                        name="passwordRpt"
                        type="password"
                        class="form-control"
                        @keyup.native.prevent="onChangePass(['confirmed_password'])"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type">
                <!-- Item 6 -->
                <template slot="label"><b>{{ $t('memberAccount.presidentLastName') }}</b><span v-if="memberAccountForm.isPersonal">({{ $t('memberAccount.optional') }})</span>:</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item prop="president_last_name">
                    <el-input
                      v-model="memberAccountForm.president_last_name"
                      :disabled="isSuperAdmin"
                      name="presidentLastName"
                      type="text"
                      class="form-control"
                      @keyup.native.prevent="onChangeField(['president_last_name'])"
                      @change="onChangeField(['president_last_name'])"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item class="form-type">
                <!-- Item 7 -->
                <template slot="label"><b>{{ $t('memberAccount.presidentFirstName') }}</b><span v-if="memberAccountForm.isPersonal">({{ $t('memberAccount.optional') }})</span>:</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item prop="president_first_name">
                    <el-input
                      v-model="memberAccountForm.president_first_name"
                      :disabled="isSuperAdmin"
                      name="presidentLastName"
                      type="text"
                      class="form-control"
                      @keyup.native.prevent="onChangeField(['president_first_name'])"
                      @change="onChangeField(['president_first_name'])"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item class="form-type">
                <template slot="label"><b>{{ $t('memberAccount.businessName') }}</b><span v-if="memberAccountForm.isPersonal">({{ $t('memberAccount.optional') }})</span>:</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item prop="business_name">
                    <el-input
                      v-model="memberAccountForm.business_name"
                      :disabled="isSuperAdmin"
                      name="businessName"
                      type="text"
                      class="form-control"
                      @keyup.native.prevent="onChangeLicenseGroup()"
                      @change="onChangeLicenseGroup()"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item class="form-type">
                <el-form-item>
                  <!-- Item 8 -->
                  <template slot="label"><b>{{ $t('memberAccount.lastName') }}</b><span v-if="!memberAccountForm.isPersonal">({{ $t('memberAccount.optional') }})</span></template>
                  <el-col :xs="24" :sm="24" :md="16" :lg="16">
                    <el-form-item prop="last_name">
                      <el-input
                        v-model="memberAccountForm.last_name"
                        :disabled="isSuperAdmin"
                        :placeholder="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE ? $t('register.lastNameB') : $t('register.lastName')"
                        name="lastName"
                        type="text"
                        class="form-control"
                        @keyup.native.prevent="onChangeField(['last_name'])"
                        @change="onChangeField(['last_name'])"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type">
                <el-form-item>
                  <!-- Item 9 -->
                  <template slot="label"><b>{{ $t('memberAccount.firstName') }}</b><span v-if="!memberAccountForm.isPersonal">({{ $t('memberAccount.optional') }})</span></template>
                  <el-col :xs="24" :sm="24" :md="16" :lg="16">
                    <el-form-item prop="first_name">
                      <el-input
                        v-model="memberAccountForm.first_name"
                        :disabled="isSuperAdmin"
                        :placeholder="memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE ? $t('register.firstNameB') : $t('register.firstName')"
                        name="firstName"
                        type="text"
                        class="form-control"
                        @keyup.native.prevent="onChangeField(['first_name'])"
                        @change="onChangeField(['first_name'])"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type phone-group">
                <el-form-item>
                  <!-- Item 10 -->
                  <template slot="label"><b>{{ $t('memberAccount.cellPhone') }} {{ $t('memberAccount.num') }}</b>({{ $t('memberAccount.optional') }})</template>
                  <el-col :xs="24" :sm="24" :md="16" :lg="16">
                    <el-form-item prop="isConfirmTelCode">
                      <!-- Item 10-a -->
                      <el-col :span="4" :xs="24">
                        {{ memberAccountForm.country_code ? memberAccountForm.country_code.toLowerCase() === Common.JP_CODE ?
                        AccountAndBillings.PHONE_CODE_JP : AccountAndBillings.PHONE_CODE_KO : '' }}
                      </el-col>
                      <el-col :span="20" :xs="24">
                        <el-form-item class="phone-input" prop="cell_phone">
                          <!-- Item 10-c -->
                          <el-col :span="18">
                            <el-input
                              ref="cellPhone"
                              v-model="memberAccountForm.cell_phone"
                              :placeholder="$t('memberAccount.phoneNumber')"
                              :disabled="isSentCode || isSuperAdmin"
                              :minlength="Common.MIN_LENGTH_PHONE_NUMBER"
                              :maxlength="Common.MAX_LENGTH_PHONE_NUMBER"
                              name="cell_phone"
                              class="form-control phone-number"
                              type="text"
                              auto-complete="on"
                              @keyup.native.prevent="formatNumberEvent($event, 'cell_phone');onInputPhone($event);"
                            />
                          </el-col>
                          <!-- Item 10-d -->
                          <el-col :span="6">
                            <el-button
                              ref="changeCellPhoneBtn"
                              :loading="isLoading"
                              :disabled="isSentCode || isSuperAdmin || isEnableButtonVerifyOtp"
                              type="primary"
                              class="btn-change w-100 rounded-0 px-0"
                              @click.native.prevent="onChangePhone"
                            >{{ $t('memberAccount.changeBtn') }}</el-button>
                          </el-col>
                        </el-form-item>
                        <!-- Item 10-e -->
                        <el-form-item class="otp-input" prop="otp">
                          <el-input
                            ref="confirmTelCode"
                            v-model="memberAccountForm.otp"
                            :placeholder="$t('memberAccount.confirmTelCode')"
                            :disabled="!isSentCode || isSuperAdmin"
                            maxlength="6"
                            name="confirmTelCode"
                            type="text"
                            class="form-control"
                            auto-complete="on"
                            @keyup.native.prevent="formatNumberEvent($event)"
                          />
                          <div v-if="isSentCode" class="text-muted text-right px-2 position-relative mt--heightRow timer">{{ expiredLeft }}</div>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type">
                <el-form-item>
                  <!-- Item 11 -->
                  <template slot="label"><b>{{ $t('memberAccount.legalPhoneNumber') }} {{ $t('memberAccount.num') }}</b>({{ $t('memberAccount.optional') }})</template>
                  <el-col :xs="24" :sm="24" :md="16" :lg="16">
                    <el-form-item>
                      <el-col :span="4" :xs="8">
                        {{ memberAccountForm.country_code ? memberAccountForm.country_code.toLowerCase() === Common.JP_CODE ?
                        AccountAndBillings.PHONE_CODE_JP : AccountAndBillings.PHONE_CODE_KO : '' }}
                      </el-col>
                      <el-col :span="20" :xs="16">
                        <el-form-item prop="phone">
                          <el-input
                            ref="phoneNumber"
                            v-model="memberAccountForm.phone"
                            :disabled="isSuperAdmin"
                            :placeholder="$t('memberAccount.phoneNumber')"
                            :minlength="Common.MIN_LENGTH_PHONE_NUMBER"
                            :maxlength="Common.MAX_LENGTH_PHONE_NUMBER"
                            name="phoneNumber"
                            class="form-control"
                            type="text"
                            auto-complete="on"
                            @keyup.native.prevent="formatNumberEvent($event);onChangePhoneNumber($event)"
                          />
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type">
                <el-form-item>
                  <!-- Item 12 -->
                  <template slot="label"><b>{{ $t('memberAccount.country') }}</b></template>
                  <el-col :xs="24" :sm="24" :md="16" :lg="16">
                    <el-form-item>
                      {{ memberAccountForm.country_code ? memberAccountForm.country_code.toLowerCase() === Common.JP_CODE ?
                      $t('memberAccount.japan') : $t('memberAccount.korea') : '' }}
                      <span class="text-muted">({{ $t('memberAccount.cantChange') }})</span>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type">
                <el-form-item>
                  <!-- Item 13 -->
                  <template slot="label"><b>{{ $t('memberAccount.postalCode') }}</b></template>
                  <el-col :xs="24" :sm="24" :md="16" :lg="16">
                    <el-form-item prop="zip" class="align-left-right text-validate postal-code">
                      <el-col :span="19">
                        <el-form-item>
                          <el-input
                            v-model="memberAccountForm.zip"
                            :placeholder="`${$t('register.code')} (*)`"
                            :disabled="true"
                            name="code"
                            type="text"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item>
                          <el-button
                            :loading="isLoading"
                            :disabled="isSuperAdmin"
                            type="primary"
                            class="search-adr-btn btn-duplicate w-100 px-0"
                            @click="openAddressSearchDialog"
                          >{{ $t('register.postalAddressSearch.searchBtn') }}</el-button>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-form-item>

              <el-form-item class="form-type address-group">
                <template slot="label"><b>{{ $t('memberAccount.address') }}</b></template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item>
                    <!-- Item 14 -->
                    <el-col :span="12">
                      <el-form-item>
                        <span>{{ memberAccountForm.addr1 }}</span>
                      </el-form-item>
                    </el-col>
                    <!-- Item 15 -->
                    <el-col :span="12">
                      <el-form-item>
                        <el-input
                          v-model="memberAccountForm.addr2"
                          :disabled="isSuperAdmin"
                          :placeholder="$t('memberAccount.blankAddress')"
                          name="address2"
                          type="text"
                          class="form-control"
                          @change="onChangeField"
                        />
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <!-- Item 16 -->
              <el-form-item class="form-type">
                <template slot="label"><b>{{ $t('memberAccount.language') }}</b>({{ $t('memberAccount.optional') }})</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item>
                    <el-select
                      v-model="memberAccountForm.language"
                      :disabled="isSuperAdmin"
                      class="w-100"
                      @change="onChangeField">
                      <el-option
                        v-for="item in AccountAndBillings.DISPLAY_LANG"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>

            <!-- Right Col -->
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="px-2 right-col">
              <!-- Item 17 -->
              <el-form-item class="form-type">
                <template slot="label"><b>{{ $t('memberAccount.currency') }}</b>({{ $t('memberAccount.optional') }})</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item>
                    <el-select v-model="memberAccountForm.view_currency" :disabled="isSuperAdmin" class="w-100" @change="onChangeField">
                      <el-option
                        v-for="item in AccountAndBillings.LIST_CURRENCY"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <!-- Item 18 -->
              <el-form-item class="form-type">
                <template slot="label"><b>{{ $t('memberAccount.validTime') }}</b> ({{ $t('memberAccount.optional') }})</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item>
                    <el-select v-model="memberAccountForm.login_valid_time" :disabled="isSuperAdmin" class="w-100" @change="onChangeField">
                      <el-option
                        v-for="item in AccountAndBillings.LIST_VALID_TIME"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <!-- Item 19 -->
              <el-form-item v-if="!memberAccountForm.isPersonal" class="form-type" prop="commission_fee">
                <template slot="label"><b>{{ $t('memberAccount.commissionFee') }}</b> ({{ $t('memberAccount.optional') }} - {{ $t('memberAccount.superAdminOnly') }})</template>
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
                  <el-form-item>
                    <el-col :span="24">
                      <el-form-item>
                        <el-input
                          :min="0"
                          :max="100"
                          :step="0.1"
                          v-model="memberAccountForm.commission_fee"
                          :disabled="!isSuperAdmin || checkIsSuperAdminLogon"
                          name="commissionFee"
                          type="number"
                          @change="onChangeField(['commissionFee']);"
                        />
                        <span class="px-2 float-right mt--heightRow position-relative text-muted">%</span>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item class="form-type document-information mb-0">
                <template slot="label" class="w-100">
                  <b>{{ $t('memberAccount.documentInformation') }}</b>
                  <span v-if="memberAccountForm.isPersonal">({{ $t('memberAccount.optional') }})</span>
                  <span v-else>({{ $t('memberAccount.require') }})</span>
                </template>
              </el-form-item>

              <el-form-item class="form-type mb-0">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" class="license-group pr-1 block-img">
                  <!-- Item 20 -->
                  <el-form-item class="business-license" prop="business_license">
                    <el-col :span="24" :xs="24">
                      <el-form-item>
                        <el-input
                          v-model="memberAccountForm.business_license"
                          :disabled="isSuperAdmin"
                          :placeholder="$t('register.licenseNumber')"
                          name="licenseNumber"
                          type="text"
                          class="form-control"
                          @change="onChangeLicenseGroup()"
                        />
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <!-- Item 22 -->
                  <el-form-item class="my-3 text-center">
                    <div class="img-name-box">{{ memberAccountForm.license ? memberAccountForm.license : $t('memberAccount.noData') }}</div>
                  </el-form-item>
                  <!-- Item 23 -->
                  <el-form-item class="text-center upload-file" prop="license">
                    <el-button
                      :disabled="isSuperAdmin"
                      type="primary"
                      class="btn-register rounded-0"
                      @click.native.prevent="onChooseFile('bankLicenseFile')"
                    >
                      <svg-icon icon-class="open-folder" class="pr-1"/>
                      <span>{{ $t('register.selectFile') }}</span>
                    </el-button>
                    <input ref="bankLicenseFile" type="file" name="myfile" class="d-none" @change="uploadFile($event, 'bankLicenseFile', 'license');onChangeLicenseGroup()">
                    <el-button
                      v-if="memberAccountForm.license"
                      :disabled="isSuperAdmin"
                      icon="el-icon-delete"
                      type="danger"
                      class="btn-register rounded-0"
                      @click="resetFileInput('bankLicenseFile', 'license');onChangeLicenseGroup()"
                    >{{ $t('memberAccount.deleteBtn') }}</el-button>
                  </el-form-item>
                  <el-form-item class="text-center">
                    <small>{{ $t('register.fileSupport') }}</small>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" class="bankbook-group pl-1 block-img">
                  <el-form-item prop="bankGroup" class="bank-group">
                    <el-col :xs="12" :span="6">
                      <!-- Item 24 -->
                      <el-form-item prop="bank_name">
                        <el-select
                          v-model="memberAccountForm.bank_name"
                          :disabled="isSuperAdmin"
                          :placeholder="$t('register.selectBank')"
                          class="w-100"
                          @change="onChangeGroup(AccountAndBillings.BANK_CODE)">
                          <el-option
                            key=""
                            label=""
                            value="" />
                          <el-option
                            v-for="item in Auth.LIST_BANK"
                            :key="item.bank_code"
                            :label="item.bank_name"
                            :value="item.bank_code" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="12" :span="12">
                      <!-- Item 25 -->
                      <el-form-item prop="bank_account_number" class="h-mg-l-10">
                        <el-input
                          v-model="memberAccountForm.bank_account_number"
                          :disabled="isSuperAdmin"
                          :placeholder="$t('register.bankNumber')"
                          name="bankNumber"
                          type="text"
                          class="form-control"
                          @change="onChangeGroup(AccountAndBillings.BANK_CODE)"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :span="6">
                      <!-- Item 26 -->
                      <el-form-item prop="owner" class="owner-item">
                        <el-input
                          v-model="memberAccountForm.owner"
                          :disabled="isSuperAdmin"
                          :placeholder="$t('register.owner')"
                          name="owner"
                          type="text"
                          class="form-control"
                          @change="onChangeGroup(AccountAndBillings.BANK_CODE)"
                        />
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <!-- Item 28 -->
                  <el-form-item class="my-3 text-center">
                    <div class="img-name-box">{{ memberAccountForm.bankbook ? memberAccountForm.bankbook : $t('memberAccount.noData') }}</div>
                  </el-form-item>
                  <!-- Item 29 -->
                  <el-form-item class="text-center upload-file" prop="bankbook">
                    <el-button
                      :disabled="isSuperAdmin"
                      type="primary"
                      class="btn-register rounded-0"
                      @click.native.prevent="onChooseFile('bankBookFile')"
                    >
                      <svg-icon icon-class="open-folder" class="pr-1"/>
                      <span>{{ $t('register.selectFile') }}</span>
                    </el-button>
                    <input ref="bankBookFile" type="file" name="myfile" class="d-none" @change="uploadFile($event, 'bankBookFile', 'bankbook');onChangeGroup(AccountAndBillings.BANK_CODE)">
                    <el-button
                      v-if="memberAccountForm.bankbook"
                      :disabled="isSuperAdmin"
                      icon="el-icon-delete"
                      type="danger"
                      class="btn-register rounded-0"
                      @click="resetFileInput('bankBookFile', 'bankbook');onChangeGroup(AccountAndBillings.BANK_CODE)"
                    >{{ $t('memberAccount.deleteBtn') }}</el-button>
                  </el-form-item>
                  <el-form-item class="text-center">
                    <small>{{ $t('register.fileSupport') }}</small>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <!-- Item 30 -->
              <el-form-item class="form-type">
                <div class="business-type-tips py-2">
                  <div class="tips-text" v-html="getInstructions($t('memberAccount.instructions'))" />
                </div>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item class="mb-0 text-center">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <!-- Item 31 -->
              <el-button
                :loading="isLoading"
                :disabled="!isChanged"
                type="success"
                class="btn-memberAccount rounded-0 w-100px btn-save"
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
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- Dialog: Address Search -->
    <el-dialog :modal-append-to-body="true" :append-to-body="true" :visible.sync="dialogVisible" :show-close="false" class="dialog">
      <i class="el-icon-circle-close" @click="handleClose"/>
      <div class="dialog-modal">
        <div class="dialog-title">
          <div
            class="address-search-title"
          >{{ $t('register.postalAddressSearch.addressSearchTitle') }}</div>
        </div>
        <el-tabs type="card">
          <el-tab-pane :label="$t('register.postalAddressSearch.roadBaseTabLabel')">
            <address-search
              :type="addressSearchRoadBaseType"
              :country="memberAccountForm.country_code || ''"
              @get-postal-code-and-address="getPostalCodeAndAddress"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('register.postalAddressSearch.houseBaseTabLabel')">
            <address-search
              :country="memberAccountForm.country_code || ''"
              @get-postal-code-and-address="getPostalCodeAndAddress"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberAccountController from './MemberAccount'
export default memberAccountController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './memberAccount.scss'
</style>

<template>
  <div class="register-container">
    <el-form
      v-if="!isChanging"
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="logo-box">
        <img src="../../resources/logo.png" class="logo-image">
      </div>

      <div class="text-title">
        <div class="signin-text">{{ $t('register.subTitle') }}</div>
      </div>

      <!-- Item 1 -->
      <el-radio-group
        v-model="typeRegister"
        :class="(typeRegister === Auth.BUSINESS_TYPE) ? 'w-100' : 'w-100 radio-select-btn'"
        @change="onChangeType($event)"
      >
        <div class="radio-group-account">
          <el-row>
            <el-radio
              :label="Auth.PERSONAL_TYPE"
              class="personal-radio-btn"
            >{{ $t('register.personRadio') }}</el-radio>
            <el-radio
              :label="Auth.BUSINESS_TYPE"
              class="business-radio-btn"
            >{{ $t('register.businessRadio') }}</el-radio>
          </el-row>
        </div>
      </el-radio-group>

      <!-- Business type -->
      <div v-show="typeRegister === Auth.BUSINESS_TYPE" class="business-type-tips">
        <hr class="horizontal-2">
        <div>{{ $t('register.businessTips') }}</div>
      </div>

      <!-- Item 2, 3 -->
      <el-form-item class="text-validate fi-la-name">
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input
              v-model="registerForm.lastName"
              :placeholder="`${typeRegister === Auth.BUSINESS_TYPE ? $t('register.lastNameB') : $t('register.lastName')} (*)`"
              class="last-name"
              name="lastName"
              type="text"
              auto-complete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input
              v-model="registerForm.firstName"
              :placeholder="`${typeRegister === Auth.BUSINESS_TYPE ? $t('register.firstNameB') : $t('register.firstName')} (*)`"
              :class="isCheckFName ? 'first-name-2' : 'first-name-1'"
              name="firstName"
              type="text"
              auto-complete="off"
              @focus="isCheckFirstName()"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 4 -->
      <el-form-item
        v-show="typeRegister === Auth.BUSINESS_TYPE"
        prop="businessName"
        class="legal-business-name text-validate"
      >
        <el-input
          v-model="registerForm.businessName"
          :placeholder="`${$t('register.businessName')} (*)`"
          name="businessName"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <!-- Item 5 -->
      <el-form-item class="align-left-right email text-validate">
        <el-col :span="24">
          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              :disabled="isShowReceiveBtn"
              :placeholder="`${typeRegister === Auth.BUSINESS_TYPE ? $t('register.emailB') : $t('register.email')} (*)`"
              name="email"
              class="email-check-btn"
              type="text"
              auto-complete="off"
              @keyup.native.prevent="onEmailChange($event)"
            >
              <el-button
                slot="append"
                :loading="loading"
                :disabled="isSentReactive || !isMailValid"
                class="btn-duplicate email-check-btn"
                type="info"
                @click.native.prevent="onCheckEmail"
              >{{ isShowReceiveBtn ? $t('register.receiveBtn') : $t('register.checkDuplicateBtn') }}</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 6 -->
      <el-form-item prop="password" class="password text-validate">
        <el-input
          v-model="registerForm.password"
          :placeholder="`${$t('register.password')} (*)`"
          name="password"
          type="password"
          auto-complete="off"
        />
      </el-form-item>

      <!-- Item 7 -->
      <el-form-item prop="passwordRpt" class="repeat-password text-validate">
        <el-input
          v-model="registerForm.passwordRpt"
          :placeholder="`${$t('register.passwordRpt')} (*)`"
          name="passwordRpt"
          type="password"
          auto-complete="off"
        />
      </el-form-item>

      <!-- Item 8 -->
      <el-form-item prop="country" class="align-left-right text-validate country">
        <div class="business-location">{{ $t('register.locationTitle') }}</div>
        <el-select
          ref="country"
          :value="registerForm.country"
          :placeholder="`${$t('register.selectLoc')} (*)`"
          filterable
          class="w-100"
          @change="onSelectCountry"
        >
          <el-option
            v-for="item in listCountry"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- Item 10 -->
      <el-form-item class="align-left-right text-validate post-code">
        <el-col :span="24">
          <el-form-item prop="searchAdr">
            <el-input
              v-model="registerForm.code"
              :placeholder="`${$t('register.code')} (*)`"
              :disabled="true"
              name="code"
              type="text"
              auto-complete="off"
            >
              <el-button
                slot="append"
                :loading="loading"
                :disabled="!registerForm.country"
                type="info"
                class="search-adr-btn btn-duplicate"
                @click="openAddressSearchDialog"
              >{{ $t('register.postalAddressSearch.searchBtn') }}</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 11 -->
      <el-form-item class="address-1">
        <el-input
          v-model="registerForm.adr1"
          :placeholder="`${$t('register.adr1')} (*)`"
          :disabled="true"
          name="adr1"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <!-- Item 12 -->
      <el-form-item prop="adr2" class="address-2">
        <el-input
          v-model="registerForm.adr2"
          :placeholder="$t('register.adr2')"
          name="adr2"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <!-- Item 13 -->
      <el-form-item
        v-show="typeRegister === Auth.BUSINESS_TYPE"
        class="align-left-right business-license text-validate"
      >
        <div class="required-document">
          <span>{{ $t('register.reqDocTitle') }}</span>
          <span>{{ $t('register.businessLicense') }}</span>
        </div>
        <el-col :span="24">
          <el-form-item prop="licenseNumber" class>
            <el-input
              v-model="registerForm.licenseNumber"
              :placeholder="$t('register.licenseNumber')"
              name="licenseNumber"
              type="text"
              auto-complete="off"
            >
              <el-button
                slot="append"
                :loading="loading"
                type="info"
                class="btn-duplicate"
                @click.native.prevent="onCertification"
              >{{ $t('register.certBtn') }}</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 14  -->
      <el-form-item
        v-show="typeRegister === Auth.BUSINESS_TYPE"
        class="upload-file text-validate upload-1 align-left-right"
        prop="license"
      >
        <el-form-item>
          <el-col :xs="10" :sm="8" :md="8" :lg="8" :xl="8">
            <div>
              <el-button
                type="info"
                class="bg-btn upload-btn-size rounded-0 px-0"
              >
                <svg-icon icon-class="folder-open-solid"/>
                {{ $t('register.selectFile') }}
              </el-button>
              <input
                ref="license"
                type="file"
                name="myfile"
                @change="uploadFile($event, 'license')"
              >
            </div>
          </el-col>
          <el-col :xs="14" :sm="16" :md="16" :lg="16" :xl="16" class="upload-file-box">
            <div
              class="px-2 w-100 upload-file-name"
            >{{ registerForm.license ? registerForm.license : '' }}</div>
          </el-col>
        </el-form-item>
        <div class="el-upload__tip">{{ $t('register.fileSupport') }}</div>
      </el-form-item>

      <!-- Item 15, 16, 17, 18 -->
      <el-form-item
        v-show="typeRegister === Auth.BUSINESS_TYPE"
        class="align-left-right text-validate require-doc"
        prop="bankGroup"
      >
        <div class="required-document">
          <span>{{ $t('register.reqDocTitle') }}</span>
          <span>{{ $t('register.bankbook') }}</span>
        </div>
        <el-form-item class="custom-bankbook_mobile">
          <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item prop="bank">
              <el-select
                v-model="registerForm.bank"
                :placeholder="$t('register.selectBank')"
                filterable
                class="w-100 mb-pr"
                @change="onChangeBankbook()"
              >
                <el-option
                  v-for="item in Auth.LIST_BANK"
                  :key="item.bank_code"
                  :label="item.bank_name"
                  :value="item.bank_code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="9" :md="8" :lg="8" :xl="8">
            <el-form-item prop="bankNumber" class="px-2">
              <el-input
                v-model="registerForm.bankNumber"
                :placeholder="$t('register.bankNumber')"
                name="bankNumber"
                type="text"
                auto-complete="off"
                class="mb-pl"
                @change="onChangeBankbook()"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item prop="owner" class="pr-2 mb-pr">
              <el-input
                v-model="registerForm.owner"
                :placeholder="$t('register.owner')"
                name="owner"
                type="text"
                auto-complete="off"
                class="mb-pr"
                @change="onChangeBankbook()"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="5" :md="6" :lg="6" :xl="6" class="mb-pl">
            <el-form-item class="certification-btn ">
              <el-button
                :loading="loading"
                type="info"
                class="bg-btn certification w-100 rounded-0 px-0 btn-duplicate "
                @click.native.prevent="onCheckBankbook"
              >{{ $t('register.certBtn') }}</el-button>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div
          v-if="isValidBankbook"
          class="msg-valid text-success"
        >{{ $t('register.errMsgBankGroupValid') }}</div>
      </el-form-item>

      <!-- Item 19 -->
      <el-form-item
        v-show="typeRegister === Auth.BUSINESS_TYPE"
        class="upload-file text-validate upload-2 align-left-right"
        prop="bankBook"
      >
        <el-form-item>
          <el-col :xs="10" :sm="8" :md="8" :lg="8" :xl="8">
            <div>
              <el-button
                type="info"
                class="bg-btn upload-btn-size rounded-0 px-0"
              >
                <svg-icon icon-class="folder-open-solid"/>
                {{ $t('register.selectFile') }}
              </el-button>
              <input
                ref="bankBook"
                type="file"
                name="myfile"
                @change="uploadFile($event, 'bankBook')"
              >
            </div>
          </el-col>
          <el-col :xs="14" :sm="16" :md="16" :lg="16" :xl="16" class="upload-file-box">
            <div
              class="px-2 w-100 upload-file-name"
            >{{ registerForm.bankBook ? registerForm.bankBook : '' }}</div>
          </el-col>
        </el-form-item>
        <div class="el-upload__tip">{{ $t('register.fileSupport') }}</div>
      </el-form-item>

      <!-- Item 20 -->
      <el-form-item class="accept-term-check-box">
        <el-checkbox
          v-model="registerForm.term"
          :class="{'term-danger': isReadTermErr}"
          @change="chooseAll"
        >{{ $t('register.term') }}</el-checkbox>
      </el-form-item>

      <el-form-item class="check-box-group">
        <hr class="horizontal-3">
      </el-form-item>

      <el-form-item class="mb-0 align-left-right check-box-term">
        <div class="term-item">
          <el-col :xs="15" :sm="16" :md="16" :lg="16" :xl="16">
            <el-checkbox
              v-model="registerForm.term1"
              :class="{'term-danger': isReadTermErr}"
              @change="checkAllTerm"
            >
              <div>
                <div>{{ $t('register.term1') }}</div>
              </div>
            </el-checkbox>
          </el-col>
          <el-col :xs="9" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="read-term" @click="openTerm(1)">
              {{ $t('register.checkTerm') }}
              <i class="el-icon-arrow-right"/>
            </div>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item class="mb-0 align-left-right check-box-term">
        <div class="term-item">
          <el-col :xs="15" :sm="16" :md="16" :lg="16" :xl="16">
            <el-checkbox
              v-model="registerForm.term2"
              :class="{'term-danger': isReadTermErr}"
              @change="checkAllTerm"
            >
              <div>
                <div>{{ $t('register.term2') }}</div>
              </div>
            </el-checkbox>
          </el-col>
          <el-col :xs="9" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="read-term" @click="openTerm(2)">
              {{ $t('register.checkTerm') }}
              <i class="el-icon-arrow-right"/>
            </div>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item class="mb-0 align-left-right">
        <el-checkbox v-model="registerForm.term3" @change="checkAllTerm">{{ $t('register.term3') }}</el-checkbox>
      </el-form-item>

      <!-- Item 21 -->
      <el-form-item class="register align-left-right">
        <el-button
          :loading="loading"
          type="info"
          class="rounded-0 register-btn"
          @click.native.prevent="onRegister"
        >{{ $t('register.registerBtn') }}</el-button>
      </el-form-item>

      <!-- Item 22 -->
      <div class="text-center pd-b-25">
        <a class="login-tips">{{ $t('register.hasAccountTips') }}</a>
        <a class="redirect-login" @click="goToLogin">{{ $t('register.loginText') }}</a>
      </div>
    </el-form>
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
              :country="registerForm.country"
              @get-postal-code-and-address="getPostalCodeAndAddress"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('register.postalAddressSearch.houseBaseTabLabel')">
            <address-search
              :country="registerForm.country"
              @get-postal-code-and-address="getPostalCodeAndAddress"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>

    <!-- Dialog: Term -->
    <el-dialog
      :visible.sync="openTermPopup"
      :before-close="handleCloseTerm"
      width="50%"
      class="term-box">
      <span slot="title" class="dialog-title">
        <img src="../../resources/logo.png" class="logo-image">
      </span>
      <div>{{ termContent === Auth.TERM_CHECK ? $t('register.term1Title') : $t('register.term2Title') }}</div>
      <div class="mt-3" v-html="getFormatText(termContent === Auth.TERM_CHECK ? $t('register.term1') : $t('register.term2'))" />
      <span slot="footer" class="dialog-footer text-center">
        {{ $t('footerText') }}
      </span>
    </el-dialog>
  </div>
</template>

<script>
import registerController from './Register'
export default registerController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./register.scss"
</style>

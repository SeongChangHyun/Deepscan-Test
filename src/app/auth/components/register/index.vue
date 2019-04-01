<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('register.title') }}</h3>
      </div>

      <div class="title-sub-title">
        <div class="sub-title">{{ $t('register.subTitle') }}</div>
        <hr>
      </div>

      <!-- Item 1 -->
      <el-radio-group v-model="typeRegister" class="mt-4 w-100 text-center" @change="onChangeType($event)">
        <el-radio label="personal">{{ $t('register.personRadio') }}</el-radio>
        <el-radio label="business">{{ $t('register.businessRadio') }}</el-radio>
      </el-radio-group>

      <!-- Business type -->
      <div v-show="typeRegister === 'business'" class="business-type-tips">
        <hr>
        <div class="tips-text">{{ $t('register.businessTips') }}</div>
      </div>

      <!-- Item 2, 3 -->
      <el-form-item class="mt-3">
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input
              v-model="registerForm.firstName"
              :placeholder="typeRegister === 'business' ? $t('register.firstNameB') : $t('register.firstName')"
              name="firstName"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input
              v-model="registerForm.lastName"
              :placeholder="typeRegister === 'business' ? $t('register.lastNameB') : $t('register.lastName')"
              name="lastName"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 4 -->
      <el-form-item v-show="typeRegister === 'business'" prop="businessName" class="mt-3">
        <el-input
          v-model="registerForm.businessName"
          :placeholder="$t('register.businessName')"
          name="businessName"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <!-- Item 5 -->
      <el-form-item class="mt-3">
        <el-col :span="18">
          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              :placeholder="typeRegister === 'business' ? $t('register.emailB') : $t('register.email')"
              name="email"
              type="text"
              auto-complete="on"
              @keyup.native.prevent="onEmailChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button
              :loading="loading"
              :disabled="isSentReactive"
              type="info"
              class="btn-register w-100 rounded-0 px-0"
              @click.native.prevent="onCheckEmail"
            >{{ isShowReceiveBtn ? $t('register.receiveBtn') : $t('register.checkDuplicateBtn') }}</el-button>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 6 -->
      <el-form-item prop="password" class="mt-3">
        <el-input
          v-model="registerForm.password"
          :placeholder="$t('register.password')"
          name="password"
          type="password"
          auto-complete="on"
        />
      </el-form-item>

      <!-- Item 7 -->
      <el-form-item prop="passwordRpt" class="mt-3">
        <el-input
          v-model="registerForm.passwordRpt"
          :placeholder="$t('register.passwordRpt')"
          name="passwordRpt"
          type="password"
          auto-complete="on"
        />
      </el-form-item>

      <!-- Item 8 -->
      <el-form-item prop="country" class="mt--10">
        <div>{{ $t('register.locationTitle') }}</div>
        <el-select v-model="registerForm.country" :placeholder="$t('register.selectLoc')" filterable class="w-100" @change="onSelectCountry">
          <el-option
            v-for="item in LIST_COUNTRY"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- Item 9 -->
      <el-form-item class="mt-3">
        <el-col :span="18">
          <el-form-item prop="searchAdr">
            <el-autocomplete
              v-model="registerForm.searchAdr"
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
        <el-col :span="6">
          <el-form-item>
            <el-button
              :loading="loading"
              type="info"
              class="btn-register w-100 rounded-0 px-0"
            >{{ $t('register.searchBtn') }}</el-button>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- Item 10 -->
      <el-form-item prop="code" class="mt-3">
        <el-input
          v-model="registerForm.code"
          :placeholder="$t('register.code')"
          :disabled="true"
          name="code"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <!-- Item 11 -->
      <el-form-item prop="adr1" class="mt-3">
        <el-input
          v-model="registerForm.adr1"
          :placeholder="$t('register.adr1')"
          :disabled="true"
          name="adr1"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <!-- Item 12 -->
      <el-form-item prop="adr2" class="mt-3">
        <el-input
          v-model="registerForm.adr2"
          :placeholder="$t('register.adr2')"
          name="adr2"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <!-- Item 13 -->
      <el-form-item v-show="typeRegister === 'business'" class="mt--10">
        <div>{{ $t('register.reqDocTitle') }}</div>
        <el-form-item>
          <el-col :span="18">
            <el-form-item prop="licenseNumber">
              <el-input
                v-model="registerForm.licenseNumber"
                :placeholder="$t('register.licenseNumber')"
                name="licenseNumber"
                type="text"
                auto-complete="on"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                :loading="loading"
                type="info"
                class="btn-register w-100 rounded-0 px-0"
                @click.native.prevent="onCertification"
              >{{ $t('register.certBtn') }}</el-button>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form-item>

      <!-- Item 14 -->
      <el-form-item v-show="typeRegister === 'business'" class="upload-file" prop="license">
        <el-form-item>
          <el-col :span="6">
            <el-form-item>
              <el-button
                :loading="loading"
                type="info"
                class="btn-register w-100 rounded-0 px-0"
                @click.native.prevent="onCertification"
              >{{ $t('register.selectFile') }}</el-button>
              <input ref="license" type="file" name="myfile" @change="uploadFile($event, 'license')">
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item>
              <div class="px-3 w-100">{{ registerForm.license ? registerForm.license.name : '' }}</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div class="el-upload__tip mt-1">{{ $t('register.fileSupport') }}</div>
      </el-form-item>

      <!-- Item 15, 16, 17, 18 -->
      <el-form-item v-show="typeRegister === 'business'" class="mt--10" prop="bankGroup">
        <div>{{ $t('register.reqDocTitleBankbook') }}</div>
        <el-form-item>
          <el-col :span="4">
            <el-form-item prop="bank">
              <el-select v-model="registerForm.bank" :placeholder="$t('register.selectBank')" filterable class="w-100" @change="onChangeBankbook()">
                <el-option
                  v-for="item in listBank"
                  :key="item.bank_code"
                  :label="item.bank_name"
                  :value="item.bank_code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="bankNumber" class="px-2">
              <el-input
                v-model="registerForm.bankNumber"
                :placeholder="$t('register.bankNumber')"
                name="bankNumber"
                type="text"
                auto-complete="on"
                @change="onChangeBankbook()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="owner" class="pr-2">
              <el-input
                v-model="registerForm.owner"
                :placeholder="$t('register.owner')"
                name="owner"
                type="text"
                auto-complete="on"
                @change="onChangeBankbook()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                :loading="loading"
                type="info"
                class="btn-register w-100 rounded-0 px-0"
                @click.native.prevent="onSearchBankBook"
              >{{ $t('register.certBtn') }}</el-button>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div v-if="isValidBankbook" class="msg-valid text-success">{{ $t('register.errMsgBankGroupValid') }}</div>
      </el-form-item>

      <!-- Item 19 -->
      <el-form-item v-show="typeRegister === 'business'" class="upload-file" prop="bankBook">
        <el-form-item>
          <el-col :span="6">
            <el-form-item>
              <el-button
                :loading="loading"
                type="info"
                class="btn-register w-100 rounded-0 px-0"
                @click.native.prevent="onCertification"
              >{{ $t('register.selectFile') }}</el-button>
              <input ref="bankBook" type="file" name="myfile" @change="uploadFile($event, 'bankBook')">
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item>
              <div class="px-3 w-100">{{ registerForm.bankBook ? registerForm.bankBook.name : '' }}</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div class="el-upload__tip mt-1">{{ $t('register.fileSupport') }}</div>
      </el-form-item>

      <!-- Item 20 -->
      <el-form-item class="mt--10 mb-0">
        <el-checkbox v-model="registerForm.term" :class="{'term-danger': isReadTermErr}" @change="isReadTermErr = !registerForm.term">{{ $t('register.term') }}</el-checkbox>
      </el-form-item>

      <!-- Item 21 -->
      <el-button
        :loading="loading"
        :disabled="!allowRegister"
        type="info"
        class="btn-register w-100 rounded-0 mb-1"
        @click.native.prevent="onRegister"
      >{{ $t('register.registerBtn') }}</el-button>

      <!-- Item 22 -->
      <div class="mb-4">
        <div class="text-center">
          <a class="login-tips">{{ $t('register.hasAccountTips') }}</a>
        </div>
        <div class="text-right mt--18">
          <a class="redirect-login" @click="goToLogin">{{ $t('register.loginText') }}</a>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import registerController from './Register'
export default registerController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './register.scss'
</style>

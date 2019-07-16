<template>
  <div class="payment">
    <el-form ref="paymentForm" v-model="formData" :rules="rules" class="payment-form">
      <el-form-item :label="genI18n('selectAccount')">
        <el-select v-model="formData.selectAccount" :placeholder="genI18n('select')">
          <el-option
            v-for="item in AccountAndBillings.PAYMENT.LIST_ACCOUNT"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="genI18n('balance')" class="balance">
        <span>{{ genI18n('KRW') }}</span> {{ formData.balance }}
      </el-form-item>
      <el-form-item :label="genI18n('paymentInformation')">
        <el-button-group>
          <el-button
            v-for="item in AccountAndBillings.PAYMENT.PAYMENT_TYPE_LIST"
            :key="item.id"
            :type="item.value !== formData.paymentType ? 'primary' : ''"
            @click="formData.paymentType = item.value"
          >{{ item.label }}</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item v-if="formData.paymentType !== AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('orderTotal')">
        <el-select v-model="formData.orderTotal" :placeholder="genI18n('select')">
          <el-option
            v-for="(item, key) in AccountAndBillings.PAYMENT.ORDER_AMOUNT"
            :key="key"
            :label="item"
            :value="key"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.paymentType !== AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('checkoutTotal')" class="balance">
        <span>{{ genI18n('KRW') }}</span> {{ formData.checkoutTotal }}
        <div>{{ genI18n('price') }}</div>
      </el-form-item>
      <el-form-item v-if="formData.paymentType !== AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('businessLocation')">
        <div>{{ genI18n('KoreaRepublic') }}</div>
      </el-form-item>
      <el-form-item v-if="formData.paymentType !== AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('recipient')" class="recipient">
        <el-input v-model="formData.firstName" :placeholder="genI18n('firstName')" />
        <el-input v-model="formData.lastName" :placeholder="genI18n('lastName')" />
      </el-form-item>
      <el-form-item v-if="formData.paymentType === AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('nameOfDepositor')" prop="firstName" class="recipient">
        <el-input v-model="formData.firstName" :placeholder="genI18n('firstName')" />
        <el-input v-model="formData.lastName" :placeholder="genI18n('lastName')" />
      </el-form-item>
      <el-form-item :label="genI18n('cellPhoneNo')" prop="phoneCodes" class="cell-phone-no">
        <el-row>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="text-center">+{{ formData.countryCode }}</el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
            <el-select v-model="formData.phoneCodes" :placeholder="genI18n('select')">
              <el-option
                v-for="item in AccountAndBillings.PAYMENT.PHONE_CODE_COUNTRY"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
            <el-input :placeholder="genI18n('phoneNumber')"/>
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
            <el-input :placeholder="genI18n('phoneNumber')"/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="genI18n('email')" prop="email">
        <el-input v-model="formData.email"/>
      </el-form-item>
      <el-form-item v-if="formData.paymentType === AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('dedicatedAccountBank')" prop="dedicatedAccountBank">
        <el-select v-model="formData.dedicatedAccountBank" :placeholder="genI18n('select')">
          <el-option
            v-for="item in AccountAndBillings.PAYMENT.DEDICATED_ACCOUNT_BANK"
            :key="item.id"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.paymentType !== AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" :label="genI18n('agreementRegarding')">
        <el-input
          :rows="3"
          v-model="formData.agreementRegardingRules"
          type="textarea"/>
        <el-checkbox v-model="formData.isAgree" :label="genI18n('iAgree')"/>
      </el-form-item>
      <el-form-item>
        <el-button-group v-if="formData.paymentType !== AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT">
          <el-button type="primary">{{ genI18n('processToPayment') }}</el-button>
          <el-button type="info" plain>{{ genI18n('cancel') }}</el-button>
        </el-button-group>
        <el-button v-if="formData.paymentType === AccountAndBillings.PAYMENT.FIXED_VIRTUAL_ACCOUNT" type="primary">{{ genI18n('dedicatedAccountIssuance') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PaymentController from './Payment'
export default PaymentController
</script>
<style lang="scss" scoped>
  .payment {
    margin: 10px 36px;
    border: 1px solid #dee2e6;
    padding: 10px;
    background-color: #ffffff;
    .payment-form {
      /deep/ .el-form-item__label {
        float: none;
      }
      .balance {
        span {
          width: 50px;
          border: 1px solid #dee2e6;
          padding: 6px 8px;
        }
      }
      .recipient {
        .el-input {
          &:first-child {
            margin-bottom: 6px;
          }
        }
      }
      .cell-phone-no {
        .el-col {
          padding-left: 6px;
          &:first-child {
            padding-left: 0;
          }
          .el-select {
            width: 100%;
          }
        }
      }
      .text-center {
        text-align: center;
      }
    }
    .el-form-item.is-required {
      /deep/ .el-form-item__label {
        &::before {
          content: '';
        }
        &::after {
          content: '*';
          color: #f56c6c;
        }
      }
    }
  }
</style>

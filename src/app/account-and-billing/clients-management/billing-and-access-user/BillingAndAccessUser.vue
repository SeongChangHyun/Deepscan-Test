<template>
  <div class="billings-and-access-users">
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="userRules"
      class="user-form"
      auto-complete="on"
      label-position="top"
    >
      <el-form-item :label="$t('client.balance')">
        <span>{{ getIconCurrency(user.currency) }} {{ user.balance }}</span>
      </el-form-item>
      <el-form-item :label="$t('client.accOwner')">
        <div>
          <span>[{{ user.firstName }} {{ user.lastName }}] {{ getRoles(user.roles) }}</span>
        </div>
        <table class="w-100">
          <tr>
            <td
              class="el-col-md-6 el-col-sm-6 el-col-xs-6 align-middle float-none p-0 h-title"
            >{{ $t('client.email') }}</td>
            <td
              class="el-col-md-12 el-col-sm-12 el-col-xs-6 align-middle float-none p-0"
            >{{ user.email }}</td>
            <td class="el-col-md-6 el-col-sm-6 el-col-xs-6 align-middle float-none p-0 text-right">
              <el-button
                type="default"
                class="border-0 p-1 expad-btn"
                @click="showContent=!showContent"
              >
                {{ $t(showContent ? 'client.hide' : 'client.show') }}
              </el-button>
              |
              <el-button
                :disabled="true"
                type="default"
                class="border-0 p-1 expad-btn"
                @click="showContent=!showContent"
              >
                {{ $t('client.delete') }}
              </el-button>
            </td>
          </tr>
        </table>
        <el-row
          :class="{ 'show': showContent }"
          class="content-hide transition-height"
        >
          <div class="BNA-content">
            <el-row v-for="(item, index) in listBNA" :key="index" class="d-flex w-100">
              <el-col :xs="6" :sm="6" :md="6" :lg="6">{{ $t(item.label) }}</el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18">{{ user[item.value] }}</el-col>
            </el-row>
          </div>
        </el-row>
        <el-row class="d-flex w-100">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" class="float-none">{{ $t('client.accessTo') }}</el-col>
          <el-col :xs="18" :sm="18" :md="18" :lg="18" class="float-none">{{ $t('client.noInf') }}</el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import billingAndAccessUserController from './BillingAndAccessUser'
export default billingAndAccessUserController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './billingAndAccessUser.scss'
</style>

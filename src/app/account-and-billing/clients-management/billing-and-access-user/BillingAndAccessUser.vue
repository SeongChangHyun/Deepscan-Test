<template>
  <div class="billings-and-access-users content-wrapper">
    <div :class="isLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
    </div>
    <div class="content-under-loading">
      <h3 class="title">{{ $t('client.billingsAndAccessUsers') }}</h3>
      <p class="item-info">
        <span class="label">{{ $t('client.balance') }}:</span>
        <span>{{ getIconCurrency() }}{{ getBalance() }}</span>
      </p>
      <p class="item-info">
        <span class="label">{{ $t('client.accOwner') }}:</span>
        <span>{{ showFullName }}</span>
      </p>
      <p class="item-info">
        <span class="label">{{ $t('client.access') }}:</span>
      </p>

      <table v-if="typeForm === common.CREATE" class="access-container">
        <tr>
          <td colspan="3">
            <p class="heading">{{ showFullName }} - Client Admin</p>
          </td>
        </tr>
        <tr>
          <td>{{ $t('client.email') }}</td>
          <td>{{ accountInfo.email_address }}</td>
          <td class="email-action">
            <el-button type="default" @click="isSHowUserInfo = !isSHowUserInfo">
              <svg-icon :icon-class="isSHowUserInfo ? 'eye-open' : 'eye-off'" class="icon-show-hide"/>
            </el-button>
          </td>
        </tr>
        <template v-if="isSHowUserInfo">
          <tr v-for="(item, index) in AccountAndBillings.LIST_BNA" :key="index">
            <td>{{ $t(item.label) }}</td>
            <td colspan="2">{{ showName(item.value) || $t('client.noInf') }}</td>
          </tr>
          <tr>
            <td>{{ $t('client.accessTo') }}</td>
            <td colspan="2">{{ $t('client.noInf') }}</td>
          </tr>
        </template>
      </table>

      <table v-for="(accessor, index) in listUseAccessor" :key="index" class="access-container">
        <tr>
          <td colspan="3">
            <p class="heading">{{ showAccessorName(accessor) }} - {{ accessor.permission_name }}</p>
          </td>
        </tr>
        <tr>
          <td>{{ $t('client.email') }}</td>
          <td>{{ accessor.email_address }}</td>
          <td class="email-action">
            <el-button type="default" @click="accessor.isSHow = !accessor.isSHow">
              <svg-icon :icon-class="accessor.isSHow ? 'eye-open' : 'eye-off'" class="icon-show-hide"/>
            </el-button>
            {{ '|' }}
            <el-button :disabled="accessor.permission === common.CLIENT_ADMIN_ROLE || !getRoleClient(`is_admin_and_client_admin_role.${typeForm}`)" type="default">
              <svg-icon icon-class="close-button" class="icon-delete" @click="removeUserPermission(accessor, accessor.permission)"/>
            </el-button>
          </td>
        </tr>
        <template v-if="accessor.isSHow">
          <tr v-for="(item, index) in AccountAndBillings.LIST_BNA" :key="index">
            <td>{{ $t(item.label) }}</td>
            <td colspan="2">{{ accessor[item.value] || $t('client.noInf') }}</td>
          </tr>
          <tr>
            <td>{{ $t('client.accessTo') }}</td>
            <td colspan="2">{{ `${clientDetail.client_name}(${clientDetail.client_id})` }}</td>
          </tr>
        </template>
      </table>

      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRules"
        class="user-form"
        auto-complete="on"
        label-position="left"
      >
        <!-- Item 3 -->
        <el-form-item v-if="typeForm === common.EDIT && getRoleClient('block_assignment_role.view')">
          <div class="assign-user-role">
            <el-row class="assign-user-role-head">
              <el-col :span="5" class="group">{{ $t('client.group') }}</el-col>
              <el-col :span="5" class="existing-contact">{{ $t('client.existingContact') }}</el-col>
              <el-col :span="5" class="charge-start-date">{{ $t('client.chargeStartDate') }}</el-col>
              <el-col :span="5" class="change-agent">{{ $t('client.changeAgent') }}</el-col>
              <el-col :span="4" class="process">{{ $t('client.process') }}</el-col>
            </el-row>
            <el-row class="assign-te">
              <el-col :span="5" class="group">{{ $t('client.saleOfficer') }}</el-col>
              <el-col :span="5" class="existing-contact">{{ clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TE_ADMIN_FIELD] ? `${clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TE_ADMIN_FIELD].contact_name} ` : 'Null' }}</el-col>
              <el-col :span="5" class="charge-start-date">-</el-col>
              <el-col :span="5" class="change-agent">
                <div class="col-agent m-width-200px d-flex flex-wrap">
                  <el-form-item prop="teAdminUser">
                    <el-select v-model="assignUserRole.teAdminUser" :disabled="!getRoleClient(`block_assignment_role.${typeForm}`)" :placeholder="$t('client.choose')" filterable>
                      <el-option :key="-1" :label="$t('client.noInformation')" value="-1"/>
                      <el-option
                        v-for="(item, index) in listUseAdmins"
                        :key="index"
                        :value="item.user_id"
                        :label="item.contact_name"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4" class="process">
                <div class="col-agent m-width-200px d-flex flex-wrap">
                  <el-button
                    v-if="getRoleClient(`block_assignment_role.${typeForm}`)"
                    type="primary"
                    class="btn-register rounded-0 px-0 w-100 custom"
                    @click="actionAssignUser(AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TE_ADMIN_FIELD)"
                  >{{ $t('memberAccount.saveBtn') }}</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class="assign-tm">
              <el-col :span="5" class="group">{{ $t('client.operationsManager') }}</el-col>
              <el-col :span="5" class="existing-contact">{{ clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TM_ADMIN_FIELD] ? `${clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TM_ADMIN_FIELD].contact_name} ` : 'Null' }}</el-col>
              <el-col :span="5" class="charge-start-date">-</el-col>
              <el-col :span="5" class="change-agent">
                <div class="col-agent m-width-200px d-flex flex-wrap">
                  <el-form-item prop="tmAdminUser">
                    <el-select v-model="assignUserRole.tmAdminUser" :disabled="!getRoleClient(`block_assignment_role.${typeForm}`)" :placeholder="$t('client.choose')" filterable>
                      <el-option :key="-1" :label="$t('client.noInformation')" value="-1"/>
                      <el-option
                        v-for="(item, index) in listUseAdmins"
                        :key="index"
                        :value="item.user_id"
                        :label="item.contact_name"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4" class="process">
                <div class="col-agent m-width-200px d-flex flex-wrap">
                  <el-button
                    v-if="getRoleClient(`block_assignment_role.${typeForm}`)"
                    type="primary"
                    class="btn-register rounded-0 px-0 w-100 custom"
                    @click="actionAssignUser(AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TM_ADMIN_FIELD)"
                  >{{ $t('memberAccount.saveBtn') }}</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class="assign-agency">
              <el-col :span="5" class="group">{{ $t('client.consignor') }}</el-col>
              <el-col :span="5" class="existing-contact">{{ clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD] ? `${clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD].contact_name} ` : 'Null' }}</el-col>
              <el-col :span="5" class="charge-start-date">{{ clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD] ? `${clientDetail[AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD].start_date || '-'}` : '-' }}</el-col>
              <el-col :span="5" class="change-agent">
                <div class="col-agent m-width-200px d-flex flex-wrap">
                  <el-form-item prop="agencyUser">
                    <el-select
                      v-model="assignUserRole.agencyUser"
                      :disabled="!getRoleClient(`block_assignment_role.${typeForm}`)"
                      :placeholder="$t('client.choose')"
                      :value="assignUserRole.agencyUser"
                      filterable>
                      <el-option :key="-1" :label="$t('client.noInformation')" value="-1"/>
                      <el-option
                        v-for="(item, index) in listAgency"
                        :key="index"
                        :value="item.user_id"
                        :label="item.contact_name"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="dateTransfer">
                    <el-date-picker
                      v-model="assignUserRole.dateTransfer"
                      :placeholder="$t('client.dateTransfer')"
                      :value="assignUserRole.dateTransfer"
                      :disabled="!getRoleClient(`block_assignment_role.${typeForm}`)"
                      type="date"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4" class="process">
                <div class="col-agent m-width-200px d-flex flex-wrap">
                  <el-button
                    v-if="getRoleClient(`block_assignment_role.${typeForm}`)"
                    type="primary"
                    class="btn-register rounded-0 px-0 w-100 custom"
                    @click="actionAssignUser(AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD)"
                  >{{ $t('memberAccount.saveBtn') }}</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>

        <!-- Item 4 -->
        <el-form-item v-if="getRoleClient(`is_admin_and_client_admin_role.${typeForm}`)" :label="$t('client.consignmentContract')+':'" class="item-form-invite">
          <el-row>
            <el-col :span="6">
              <el-checkbox
                v-model="userForm.allowInvite"
                @change="changeInvite"
              >{{ $t('client.invite') }}</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="email_for_invite" class="email-for-invite">
                <el-input v-model="userForm.email_for_invite" :disabled="!userForm.allowInvite" type="email"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          v-if="userForm.allowInvite && showContract"
          :class="[{ 'show': userForm.allowInvite && showContract }, 'content-hide transition-height contract item-form-invite']"
          :label="$t('client.accRole')+':'">
          <el-row class="access-role-content">
            <el-col :span="24">
              <el-select
                v-model="userForm.invite_for_role"
                :placeholder="$t('client.advCampaignManagerPH')"
                collapse-tags
                class="w-100"
              >
                <el-option
                  :value="AccountAndBillings.INVITE_FOR_ROLE.CM"
                  :label=" `${$t('client.selectCM')}`.replace('$1',accountConsignment.total_cm)"
                />
                <el-option
                  :value="AccountAndBillings.INVITE_FOR_ROLE.CV"
                  :label=" `${$t('client.selectCV')}`.replace('$1',accountConsignment.total_cv)"
                />
              </el-select>
              <el-form-item>
                <el-radio
                  v-model="userForm.is_allow_access_all"
                  :label="true"
                  class="w-100"
                >{{ $t('client.allAcc') }}</el-radio>
                <el-radio
                  v-model="userForm.is_allow_access_all"
                  :label="false"
                  class="w-100 m-0"
                >{{ $t('client.allCurrentAcc') }}</el-radio>
              </el-form-item>
              <el-form-item v-if="!userForm.is_allow_access_all" class="">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange">
                  {{ $t('client.checkAll') }}
                </el-checkbox>
                <hr class="m-0">
                <el-checkbox-group
                  v-model="userForm.accessClients"
                  @change="handleCheckedClientChange">
                  <el-checkbox
                    v-for="client in accountConsignment.sub_items"
                    :label="client"
                    :key="client.client_id"
                    class="w-100 m-0"
                  >{{ client.client_name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- Item 5 -->
        <el-form-item v-if="getRoleClient(`is_admin_and_client_admin_role.${typeForm}`)" class="item-form-invite text-center">
          <el-button
            :disabled="!userForm.allowInvite"
            type="info"
            class="custom rounded-0 send-invite"
            @click="sentInvite"
          >{{ $t('client.sentInvite') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import billingAndAccessUserController from './BillingAndAccessUser'
export default billingAndAccessUserController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./billingAndAccessUser.scss";
</style>

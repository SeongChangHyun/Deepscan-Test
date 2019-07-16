<template>
  <el-form
    ref="inviteUserForm"
    :model="payload"
    :rules="inviteUserRules"
    class="invite-user-form"
  >
    <el-row :gutter="25" class="container">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="invite-content">
        <div class="invite">
          <el-row class="item">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <span class="label-title">{{ $t('user.selectAccount') }} :</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <el-select :disabled="clientId !== tabs.ALL" v-model="payload.edit_client_id" filterable class="w-100" @change="changeSelectClient">
                <el-option
                  v-for="item in clients"
                  :key="'account-' + item.client_id"
                  :label="item.client_name"
                  :value="item.client_id"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-row class="item">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <span class="label-title">{{ $t('user.email') }} :</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <el-form-item prop="invite_email">
                <el-input v-model="payload.invite_email" placeholder name="email" type="text" @focus="formDirty = true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="item">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <span class="label-title">{{ $t('user.accountRole') }} :</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <el-select v-model="payload.invite_for_role" class="w-100" @change="onChangeAccountRole">
                <el-option
                  v-for="item in accountRole"
                  :key="'account-role-' + item.value"
                  :label="getRoleLabel(item.value)"
                  :value="item.value"
                >
                  <div class="select-role-item">
                    <span class="role-item-suffix">{{ item.label }}</span>
                    <span class="role-item-suffix">but {{ getRoleSuffix(item.value) }}</span>)
                  </div>
                </el-option>
              </el-select>
              <div>
                <div class="allow">
                  <div>
                    <el-radio-group v-model="payload.is_access_all" @change="changeAccessRole">
                      <div class="mr-top-10">
                        <el-radio :label="true" class="h-pd-t-5">{{ $t('user.allowAccessAll') }}</el-radio>
                      </div>
                      <div class="mr-top-10">
                        <el-radio :label="false" class="h-pd-t-5">{{ $t('user.allowAccessOnly') }}</el-radio>
                      </div>
                    </el-radio-group>
                  </div>
                  <div v-if="!payload.is_access_all" class="only-selected">
                    <el-table ref="inviteUserAccessTable" :data="clients" @selection-change="onSelectAccessClients">
                      <el-table-column :selectable="selectable" type="selection" width="30"/>
                      <el-table-column prop="client_name" label="Select All">
                        <template slot-scope="scope">
                          <span :class="{'error-selected-client': scope.row.client_id === errorClientId}">{{ scope.row.client_name }}</span>
                          <span>({{ getUserInvitedLabel(scope.row) }})</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24" class="button-footer">
            <el-button class="btn-send" @click="onSend">{{ $t('user.send') }}<i v-if="isLoading" class="el-icon-loading"/></el-button>
            <el-button class="btn-cancel" @click="onCancel">{{ $t('user.cancel') }}</el-button>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="list-user-to-invite">
        <div>
          <ListUserToInvite :client-id="clientId" :on-edit-user="onEdit" :hide-all="true"/>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import inviteUser from './InviteUse.js'
export default inviteUser
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./InviteUser.scss";
</style>

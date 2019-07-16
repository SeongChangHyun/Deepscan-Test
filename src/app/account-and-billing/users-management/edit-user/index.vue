<template>
  <el-row class="users-edit-role">
    <el-row :gutter="25" class="container">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="left-item">
        <div class="invite">
          <el-row class="item email">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <span class="label-title">{{ $t('user.email') }} :</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              {{ payload.user_email }}
            </el-col>
          </el-row>
          <el-row class="item account">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="account-label">
              <span class="label-title">{{ $t('user.accountRole') }} :</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="right-select">
              <el-select ref="roleDropDown" v-model="payload.edit_role" class="w-100" @change="onChangeEditRole">
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
                    <el-radio-group v-model="payload.is_access_all" @change="changeRoleAccess">
                      <div class="mr-top-10">
                        <el-radio :label="true" class="h-pd-t-5">{{ $t('user.allowAccessAll') }}</el-radio>
                      </div>
                      <div class="mr-top-10">
                        <el-radio :label="false" class="h-pd-t-5">{{ $t('user.allowAccessOnly') }}</el-radio>
                      </div>
                    </el-radio-group>
                  </div>
                  <div v-if="!payload.is_access_all" class="only-selected">
                    <el-table ref="editUserAccessTable" :data="clients" @selection-change="onSelectAccessClients">
                      <el-table-column :selectable="selectable" type="selection" width="30"/>
                      <el-table-column prop="client_name" label="Select All">
                        <template slot-scope="scope">
                          <span>{{ scope.row.client_name }}</span>
                          <span>({{ getUserInvitedLabel(scope.row) }})</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <el-row :span="24" class="button-footer">
                <el-button class="btn-send" @click="onSend">{{ $t('user.save') }}<i v-if="isLoading" class="el-icon-loading"/></el-button>
                <el-button class="btn-cancel" @click="onCancel">{{ $t('user.cancel') }}</el-button>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="right-item">
        <div class="list-user">
          <ListUserToInvite :client-id="clientId" :user-id="editUserData.account_id" :user-email="editUserData.email_address" :on-edit-user="onEdit" :hide-all="true"/>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import EditUser from './EditUser.js'
export default EditUser
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

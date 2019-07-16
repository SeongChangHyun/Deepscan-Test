<template>
  <div class="users-management">
    <el-row class="users-management-content">
      <div :class="{ 'tab-controls': true, 'hidden': editUser }">
        <button :class="{ 'tab-controls-item all-tab': true, 'active': selectedClient === tabs.ALL }" @click="changeActiveTab(tabs.ALL)">{{ $t('user.all') }}</button>
        <div class="tab-controls-group">
          <button v-if="showArrowControl" :class="{ 'tab-controls-item arrow-control': true, 'disabled': slideClientStart === 0 }" @click="previousClient()">
            <i class="el-icon-arrow-left"/><span>...</span>
          </button>
          <button
            v-for="item in slideClients"
            :title="item.client_name.length > maxShowLengthOfClientName ? item.client_name : ''"
            :key="item.client_id"
            :class="{ 'tab-controls-item slide-item': true, 'active': selectedClient === item.client_id }"
            @click="changeActiveTab(item.client_id)">
            {{ getClientTabName(item.client_name) + '(' + item.total_user + ')' }}
          </button>
          <button v-if="showArrowControl" :class="{ 'tab-controls-item arrow-control': true, 'disabled': slideClientEnd === clients.length - 1 }" @click="nextClient()">
            <span>...</span><i class="el-icon-arrow-right"/>
          </button>
        </div>
        <button :class="{ 'tab-controls-item invite-tab': true, 'active': activeTab === tabs.INVITE }" @click="inviteUser()"> {{ $t('user.inviteUserBtn') }} </button>
      </div>
      <div v-if="!editUser" :class="{ 'tab-content': true, 'hidden': editUser }">
        <ListUser v-if="activeTab === tabs.ALL" :on-edit-user="onEdit"/>
        <div v-for="item in clients" :key="item.client_id">
          <ListUser v-if="activeTab === item.client_id" :client-id="item.client_id" :on-edit-user="onEdit"/>
        </div>
        <InviteUser v-if="activeTab === tabs.INVITE" ref="inviteUserComponent" :client-id="selectedClient" :on-edit-user="onEdit" :on-cancel-invite="onCancelInvite"/>
      </div>
    </el-row>
    <el-row v-if="editUser" class="edit-user-area">
      <div class="edit-user-content">
        <EditUser
          ref="editUserComponent"
          :client-id="selectedClient"
          :user-role="accountRoleSelected"
          :edit-user-data="editUserData"
          :access-to="accessTo"
          :on-cancel-edit="onCancelEdit"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import listUsers from './ListUsers.js'
export default listUsers
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './ListUsers.scss'
</style>

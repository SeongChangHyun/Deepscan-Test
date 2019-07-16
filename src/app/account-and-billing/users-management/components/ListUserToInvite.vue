<template>
  <div class="list-user-container">
    <div :class="isLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
      <content-loader :speed="2" :animate="true">
        <rect x="0" y="0" rx="3" ry="3" width="400" height="8" />
        <rect x="20" y="20" rx="3" ry="3" width="330" height="8" />
        <rect x="10" y="40" rx="3" ry="3" width="360" height="8" />
        <rect x="0" y="60" rx="3" ry="3" width="400" height="8" />
        <rect x="20" y="80" rx="3" ry="3" width="350" height="8" />
        <rect x="10" y="100" rx="3" ry="3" width="380" height="8" />
      </content-loader>
    </div>
    <el-row v-for="(item, index) in listUserData" :key="index" class="user-item">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :class="{ 'user-left': true, 'active': true }">
        <div :class="{ 'el-row user-name': true, 'active': item.email_address === editUserEmail }">
          <el-col :span="20" class="user-left">
            <span v-if="item.is_Inside === 'N'"> {{ item.email_address }} </span>
            <span v-else>{{ upperFirst(item.user_name) }}</span>
            <span v-if="item.is_Inside === 'N'" class="user-name-pending"> ({{ $t('user.pending') }}) </span>
            <div v-if="!item.showDetail" class="account-role">
              <span v-for="(accountRole, index) in item.account_roles" :key="index">{{ '\\ ' + getRoleLabel(accountRole.permission) }}</span>
            </div>
            <span v-if="item.email_address === deletingEmail" class="data-loading"><i class="el-icon-loading"/></span>
          </el-col>
          <el-col :span="4" class="user-action user-action-top">
            <div class="fl-r">
              <a class="mg-r-5" @click="onHide(index)">
                <img v-if="!item.showDetail" :title="$t('user.show')" src="@/assets/icon/hide-active.png" class="hide-active">
                <img v-if="!item.showDetail" :title="$t('user.show')" src="@/assets/icon/hide.png" class="hide">
                <img v-if="item.showDetail" :title="$t('user.hide')" src="@/assets/icon/unhinde-icon.png" class="unhinde-icon">
                <img v-if="item.showDetail" :title="$t('user.hide')" src="@/assets/icon/unhinde-gray.png" class="unhinde-gray">
              </a>
            </div>
          </el-col>
        </div>
        <div class="user-info">
          <el-col :span="24" class="user-left">
            <el-row class="mg-b-10">
              <el-col :span="8" :xs="10" :md="7" :xl="6">
                <span class="information">{{ $t('user.emailAddress') }} :</span>
              </el-col>
              <el-col :span="16" :xs="14" :md="17" :xl="18">
                <span>{{ item.email_address }}</span>
              </el-col>
            </el-row>
          </el-col>
          <div v-if="item.showDetail">
            <el-col :span="24" class="user-left">
              <el-row class="mg-b-10">
                <el-col :span="8" :xs="10" :md="7" :xl="6">
                  <span class="information">{{ $t('user.businessPhone') }} :</span>
                </el-col>
                <el-col :span="16" :xs="14" :md="17" :xl="18">
                  <span class="information">{{ item.phone }}</span>
                </el-col>
              </el-row>
              <el-row class="mg-b-10">
                <el-col :span="8" :xs="10" :md="7" :xl="6">
                  <span class="information">{{ $t('user.cellPhone') }} :</span>
                </el-col>
                <el-col :span="16" :xs="14" :md="17" :xl="18">
                  <span class="information">{{ item.cell_phone }}</span>
                </el-col>
              </el-row>
            </el-col>
            <div v-for="(accountRole, index) in item.account_roles" :key="index" class="group-role">
              <el-row class="mg-b-10">
                <el-col :span="8" :xs="10" :md="7" :xl="6">
                  <span class="information">{{ $t('user.accountRole') }} :</span>
                </el-col>
                <el-col :span="16" :xs="14" :md="17" :xl="18">
                  <span class="information">{{ getRoleLabel(accountRole.permission) }}</span>
                </el-col>
              </el-row>
              <el-row class="mg-b-10">
                <el-col :span="9" :xs="11" :md="8" :xl="7">
                  <span class="information">{{ $t('user.accessTo') }} :</span>
                </el-col>
                <el-col :span="15" :xs="13" :md="16" :xl="17">
                  <el-row v-for="(access, index) in accountRole.access_to_clients" :key="access.client_id + '-' + index" class="access-client-item">
                    <span class="information">{{ access.client_name }} ({{ access.client_id }})</span>
                    <div v-if="isRoleCmCv(accountRole.permission)" class="user-action">
                      <div class="fl-r">
                        <a
                          :title="$t('user.edit')"
                          class="mg-r-5 edit-user"
                          @click="onEdit(item, clientId === -1 ? [access] : [selectedClient], accountRole.permission)">
                          <img class="create-material" src="@/assets/icon/create-material-disable.png">
                          <img class="create-material-hover" src="@/assets/icon/create-material.png">
                        </a>
                        <span class="span-icon">|</span>
                        <a
                          :title="$t('user.remove')"
                          class="mg-r-5 remove-user"
                          @click="onRemove(true, item.account_id, item.user_name, accountRole.permission, access.client_id, access.client_name, item.is_Inside, item.email_address)">
                          <img class="delete-solid" src="@/assets/icon/ionicons-disable.png">
                          <img class="delete-solid-hover" src="@/assets/icon/icon-delete.png">
                        </a>
                      </div>
                    </div>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="noData" class="nodata-message user-item w-100">
      <div class="nodata-text"> {{ $t('user.noData') }} </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { USER_MANAGEMENT } from '@/common/constants'
import { upperFirst } from 'lodash'
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'UsersListToInvite',
  components: { ContentLoader },
  props: {
    clientId: {
      type: Number,
      default: 0
    },
    userId: {
      type: Number,
      default: null
    },
    userEmail: {
      type: String,
      default: null
    },
    hideAll: {
      type: Boolean,
      required: false,
      default: false
    },
    onEditUser: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      listUserData: [],
      selectedClient: {},
      isLoading: false,
      editUserId: this.userId,
      editUserEmail: this.userEmail,
      noData: false,
      upperFirst,
      deletingEmail: null
    }
  },
  computed: {
    ...mapGetters('user', ['clients', 'users', 'clientUsers'])
  },
  watch: {
    users: {
      handler(newData) {
        if (newData && newData.length > 0) {
          for (var i in newData) {
            if (this.hideAll) {
              newData[i].showDetail = false
            } else {
              newData[i].showDetail = true
            }
          }
          this.listUserData = newData
        }
      }
    },
    clientUsers: {
      handler(newData) {
        if (newData && newData.length > 0) {
          for (var i in newData) {
            if (this.hideAll) {
              newData[i].showDetail = false
            } else {
              newData[i].showDetail = true
            }
          }
          this.listUserData = newData
        }
      }
    }
  },
  created() {
    this.selectedClient = this.clients.find(x => x.client_id === this.clientId)
    this.initData(true)
  },
  methods: {
    initData(showLoading) {
      this.isLoading = showLoading
      if (this.clientId === -1) {
        this.$store.dispatch('user/getAllUsersAccessByCreateAccount')
          .then((response) => {
            this.isLoading = false
            if (this.listUserData.length === 0) {
              this.noData = true
            }
          })
          .catch((error) => {
            this.$message.error({
              message: error.message
            })
            this.isLoading = false
          })
      } else {
        this.$store.dispatch('user/getListAccountsByClient', this.clientId)
          .then((response) => {
            this.isLoading = false
            if (this.listUserData.length === 0) {
              this.noData = true
            }
          })
          .catch((error) => {
            this.$message.error({
              message: error.message
            })
            this.isLoading = false
          })
      }
    },
    getRoleLabel(role) {
      return USER_MANAGEMENT.ROLE_LABEL[role]
    },
    isRoleCmCv(role) {
      return role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER || role === USER_MANAGEMENT.ROLES.CAMPAIGN_VIEWER
    },
    allowEdit(accountRole) {
      // Todo: Checking role & permission from config file
      if (accountRole === USER_MANAGEMENT.ROLES.CLIENT_ADMIN || accountRole === USER_MANAGEMENT.ROLES.AGENCY) {
        return false
      }
      return true
    },
    onHide(index) {
      this.listUserData[index].showDetail = !this.listUserData[index]
        .showDetail
      this.listUserData = [...this.listUserData]
    },
    removeUser(accountId, clientId, role, isInside, email) {
      const data = {
        accountId: accountId,
        clientId: clientId,
        role: role,
        isInside: isInside,
        ivtEmail: email
      }
      this.deletingEmail = email
      this.$store.dispatch('user/removeUserPermissionWithClient', data)
        .then((response) => {
          this.deletingEmail = null
          this.$message.success({
            message: this.$t(`user.removeUserSuccess`)
          })
          this.$store.dispatch('user/getClientsByCreateAccount')
          this.initData(false)
        })
        .catch((error) => {
          this.deletingEmail = null
          this.$message.error({
            message: this.$t(`user.errorMessage.${error.data.errorKey}`)
          })
        })
    },
    getListClientName(access_to_clients) {
      let listClientName = ' '
      access_to_clients.forEach((item) => {
        listClientName += ' ' + item.client_name
      })
      return listClientName
    },
    onRemove(isRemove, accountId, userName, role, clientId, clientName, isInside, email) {
      this.$confirm(this.$t('user.confirmRemoveMessage'), '', {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no')
      })
        .then(_ => {
          this.removeUser(accountId, clientId, role, isInside, email)
        })
    },
    toInvite() {
      this.$router.push('/account-and-billing/invite-user')
    },
    onEdit(userData, accessTo, role) {
      this.editUserId = userData.account_id
      this.editUserEmail = userData.user_email
      this.onEditUser(userData, accessTo, role)
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "@/styles/variables.scss";
.list-user-container {
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
  min-height: 50vh;
  &::-webkit-scrollbar {
    max-width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.19);
  }
  -webkit-overflow-scrolling: touch;
}
.data-loading {
  padding: 0 10px;
    i {
      color: #1d93cf;
    }
}

.data-loading.el-row {
  text-align: center;
}

.information {
  font-size: 14px;
  color: #323a46;
}
a {
  text-decoration: underline;
  color: $light-blue;
}
.access-client-item {
  display: flex;
  justify-content: space-between;
  span.information {
    flex: 1;
  }
}
.user-action {
  min-width: 45px;
  .span-icon {
    color: #bac0c7;
  }
  .edit-user {
    text-decoration: unset;
    .create-material-hover {
      display: none;
    }
    &:hover {
      .create-material {
        display: none;
      }
      .create-material-hover {
        display: inline;
      }
    }
  }
  .remove-user {
    color: #BAC0C7;
    float: right;
    padding: 1px 0 0 5px;
    .delete-solid-hover {
      display: none
    }
    &:hover {
      .delete-solid {
        display: none;
      }
      .delete-solid-hover {
        display: inline;
      }
      color: #F20808;
    }
  }
}
.user-item {
  padding: 20px 0 0 10px;
  background-color: white;
  border: 1px solid #E5E9EC;
  margin-bottom: 10px;
  word-break: break-word;
  .user-info {
    line-height: 21px;
  }
  .user-left {
    .user-name {
      font-weight: 600;
      overflow: auto;
      color: #000;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 20px;
      &.active {
        color: #FF0000;
      }
      span {
        float: left;
        word-break: break-all;
      }
    }
    .mg-b-10 {
      margin-bottom: 10px;
    }
    .user-info {
    }
  }
  .user-action {
    padding-right: 10px;
  }
  .user-action-top {
    .hide-active, .unhinde-icon {
      display: none;
    }
    &:hover {
      .hide-active, .unhinde-icon {
        display: inline;
      }
      .hide, .unhinde-gray {
        display: none;
      }
    }
  }
}
.mg-r-5 {
  margin-right: 5px;
  margin-left: 5px;
}
.fl-r {
  float: right;
}
.select-per-page {
  width: 80px;
}
.flex-1 {
  flex: 1;
}
.account-role {
  float: left;
  margin-left: 5px;
  font-weight: normal;
}
.group-role {
  overflow: auto;
  width: 100%;
}
.user-name-pending {
  padding-left: 5px;
  font-weight: normal;
}
</style>

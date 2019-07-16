<template>
  <div>
    <el-row :gutter="25" type="flex" class="flex-wrap">
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
      <el-col v-for="(item, index) in listUserData" :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :key="index" class="list-user">
        <el-col :class="item.showDetail ? 'show' : ''" class="user-item">
          <div class="el-row user-name">
            <el-col :xs="20" :sm="20" :md="20" :lg="21" :xl="21" class="user-left">
              <span v-if="item.is_Inside === 'N'"> {{ item.email_address }} </span>
              <span v-else>{{ upperFirst(item.user_name) }}</span>
              <span v-if="item.is_Inside === 'N'" class="user-name-pending"> ({{ $t('user.pending') }}) </span>
              <div v-if="!item.showDetail" class="account-role">
                <span v-for="(accountRole, index) in item.account_roles" :key="accountRole.permission + '-' + index"> {{ '\\ ' + getRoleLabel(accountRole.permission) }} </span>
              </div>
              <span v-if="item.email_address === deletingEmail" class="data-loading"><i class="el-icon-loading"/></span>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="3" class="user-action user-action-top">
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
                <el-col :span="8" :xs="11" :md="7" :xl="6">
                  <span class="information">{{ $t('user.emailAddress') }} :</span>
                </el-col>
                <el-col :span="16" :xs="13" :md="17" :xl="18">
                  <span class="information">{{ item.email_address }}</span>
                </el-col>
              </el-row>
            </el-col>
            <div v-if="item.showDetail">
              <el-col :span="24" class="user-left">
                <el-row class="mg-b-10">
                  <el-col :span="8" :xs="11" :md="7" :xl="6">
                    <span class="information">{{ $t('user.businessPhone') }} :</span>
                  </el-col>
                  <el-col :span="16" :xs="13" :md="17" :xl="18">
                    <span class="information">{{ item.phone }}</span>
                  </el-col>
                </el-row>
                <el-row class="mg-b-10">
                  <el-col :span="8" :xs="11" :md="7" :xl="6">
                    <span class="information">{{ $t('user.cellPhone') }} :</span>
                  </el-col>
                  <el-col :span="16" :xs="13" :md="17" :xl="18">
                    <span class="information">{{ item.cell_phone }}</span>
                  </el-col>
                </el-row>
              </el-col>
              <div v-for="(accountRole, index) in item.account_roles" :key="item.account_id + '-' + index" class="group-role">
                <el-col :xs="24" class="user-left">
                  <el-row class="mg-b-10">
                    <el-col :span="8" :xs="11" :md="7" :xl="6">
                      <span class="information">{{ $t('user.accountRole') }} :</span>
                    </el-col>
                    <el-col :span="16" :xs="13" :md="17" :xl="18">
                      <span class="information">{{ getRoleLabel(accountRole.permission) }}</span>
                    </el-col>
                  </el-row>
                </el-col>
                <el-row>
                  <el-col :span="9" :xs="12" :md="8" :xl="7">
                    <span class="information">{{ $t('user.accessTo') }} :</span>
                  </el-col>
                  <el-col :span="15" :xs="12" :md="16" :xl="17">
                    <el-row v-for="(access, index) in accountRole.access_to_clients" :key="access.client_id + '-' + index" class="access-client-item mg-b-10">
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
      </el-col>
    </el-row>
    <div v-if="noData" class="nodata-message w-100">
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
  name: 'UsersList',
  components: { ContentLoader },
  props: {
    clientId: {
      type: Number,
      required: false,
      default: -1
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
    this.initData()
  },
  methods: {
    initData() {
      this.isLoading = true
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
          this.listUserData = []
          this.$message.success({
            message: this.$t(`user.removeUserSuccess`)
          })
          this.$store.dispatch('user/getClientsByCreateAccount')
          this.initData()
        })
        .catch((error) => {
          this.deletingEmail = null
          this.$message.error({
            message: this.$t(`user.errorMessage.${error.data.errorKey}`)
          })
        })
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
    allowEdit(accountRole) {
      // Todo: Checking role & permission from config file
      if (accountRole === USER_MANAGEMENT.ROLES.CLIENT_ADMIN || accountRole === USER_MANAGEMENT.ROLES.AGENCY) {
        return false
      }
      return true
    },
    onEdit(userData, accessTo, role) {
      this.onEditUser(userData, accessTo, role)
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "@/styles/variables.scss";
$padding-left: 10px !important;
$padding-right: 10px !important;

.flex-wrap {
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.list-user {
  margin-bottom: 10px;
}

.list-user:nth-child(even) {
  padding-left: 0px !important;
  padding-right: 5px !important;
}

.list-user:nth-child(odd) {
  padding-left: 5px !important;
  padding-right: 0px !important;
}
.user-item {
  border: 1px solid #e5e9ec;
  align-self: stretch;
  background-color: white;
  float: left;
  margin: 0px;
  padding-left: $padding-left;
  padding-right: $padding-right;
  word-break: break-word;
  &.show {
    height: 100%;
  }
  .user-name {
    font-weight: 500;
    overflow: hidden;
    color: #000;
    font-size: 20px;
    line-height: 24px;
    .user-left {
      margin-top: 20px;
      padding-left: 0px !important;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      span {
        float: left;
        word-break: break-all;
      }
    }
  }
  .mg-b-10 {
    margin-bottom: 0px;
    line-height: 21px;
  }
  .user-info {
    margin-top: 20px;
    font-size: 14px;
    line-height: 21px;
    .user-left {
      padding-left: 0px !important;
    }
    .information {
      font-size: 14px;
      color: #323A46;
    }
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
      img {
        height: 13px;
      }
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
  .user-action-top {
    padding-right: 0!important;
    margin-top: 10px;;
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
  .fl-r {
    float: right;
  }
  .group-role {
    &:last-child {
      border: none;
    }

    .el-row {
      .el-col {
        line-height: 21px;
      }
    }
  }
  .account-role {
    float: left;
    font-weight: normal;
    span {
      margin-left: 5px;
    }
  }
  .user-name-pending {
    padding-left: 5px;
    font-weight: normal;
  }
}
.nodata-message {
  width: 100%;
  text-align: center;
  padding-top: 15px;
  font-size: 14px;
}
@media(max-width: 1024px) {
  .list-user:nth-child(odd) {
    padding: 0 !important;
  }

  .list-user:nth-child(even) {
    padding: 0 !important;
  }
}
</style>

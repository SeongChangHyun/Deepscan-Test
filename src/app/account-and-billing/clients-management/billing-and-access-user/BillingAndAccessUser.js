import { mapGetters, mapState } from 'vuex'
import * as moment from 'moment'
import { AccountAndBillings, Common } from '@/common/constants'
import { getRoleClient } from '../permission'
import { ClientsManagementMixin } from '../ClientsManagementMixin'
import { ListLoader } from 'vue-content-loader'
import { validEmailFormat } from '@/utils/validate'

export default {
  name: 'BillingAndAccessForm',
  components: {
    ListLoader
  },
  mixins: [ClientsManagementMixin],
  props: {
    clientDetail: {
      type: Object,
      default: {}
    },
    accountInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const validateAgency = (rule, value, callback, dataField) => {
      if (Object.keys(dataField).indexOf(AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD) > -1) {
        if (!this.assignUserRole.agencyUser && !this.assignUserRole.dateTransfer) {
          callback()
          return
        }
        if (this.assignUserRole.agencyUser) {
          if (this.assignUserRole.dateTransfer) {
            callback()
            return
          }
          this.$refs.userForm.validateField('dateTransfer')
        } else {
          callback(new Error(this.$t('client.validateAssignRoleForUser')))
          return
        }
      }
      if (Object.keys(dataField).indexOf('dateTransfer') > -1) {
        if (this.assignUserRole.dateTransfer) {
          callback()
          return
        } else {
          callback(new Error(this.$t('memberAccount.errMsg1', { fieldName: this.$t('client.dateTransfer') })))
          return
        }
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmailFormat(value)) {
        const array = value.split('@')
        if (array[0].length <= 20) {
          callback(new Error(this.$t('user.errorMessage.msgInvalidEmail')))
        } else {
          callback(new Error(this.$t('user.errorMessage.msgInvalidEmailLimit')))
        }
      }
      callback()
    }
    return {
      common: Common,
      listAgency: [],
      listUseAdmins: [],
      listUseAccessor: [],
      showContract: false,
      isLoading: true,
      showContent: false,
      AccountAndBillings,
      userRules: {
        email_for_invite: [
          { required: true, trigger: 'blur', message: this.$t('client.errEmail1') },
          { trigger: 'blur', validator: validateEmail }
        ],
        agencyUser: [
          { validator: validateAgency, trigger: 'submit' }
        ],
        dateTransfer: [
          { validator: validateAgency, trigger: 'submit' }
        ]
      },
      userForm: {
        allowInvite: false,
        email_for_invite: '',
        is_allow_access_all: true,
        accessClients: [],
        invite_for_role: AccountAndBillings.INVITE_FOR_ROLE.CM
      },
      isIndeterminate: false,
      accountConsignment: {
        total_cm: 0, total_cv: 0, sub_items: []
      },
      typeForm: Common.CREATE,
      getRoleClient,
      isSHowUserInfo: true,
      assignUserRole: {
        teAdminUser: null,
        tmAdminUser: null,
        agencyUser: null,
        dateTransfer: null
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState('user', ['listAccountForCurrentUser']),
    checkAll: {
      get() {
        return this.userForm.accessClients.length === this.accountConsignment.sub_items.length
      },
      set(val) {
        this.userForm.accessClients = val ? this.accountConsignment.sub_items : []
      }
    },
    showFullName: function() {
      if (Object.keys(this.accountInfo).length === 0) {
        return ''
      }
      if (this.accountInfo.isPersonal) {
        return `[${this.accountInfo.last_name} ${this.accountInfo.first_name}]`
      } else {
        return `[${this.accountInfo.president_last_name} ${this.accountInfo.president_first_name}]`
      }
    }
  },
  created() {
    this.typeForm = this.$route.params.hasOwnProperty('client_id') ? Common.EDIT : Common.CREATE
    if (getRoleClient(`is_admin_role.${this.typeForm}`)) {
      this.getListAgency()
      this.getListAdmin()
    }
    if (getRoleClient(`is_admin_and_client_admin_role.${this.typeForm}`)) {
      this.getListAccountConsignment()
    }
    if (this.typeForm === Common.EDIT) {
      this.getListUserAccessor()
    }
    if (this.typeForm === Common.CREATE) {
      this.isLoading = false
    }
  },
  watch: {
    clientDetail: function(val) {
      if (val.agencyUser) {
        this.assignUserRole.agencyUser = val.agencyUser.user_id
        this.assignUserRole.dateTransfer = val.agencyUser.start_date
      }
    }
  },
  methods: {
    changeInvite() {
      this.showContract = this.userForm.allowInvite
      if (!this.userForm.allowInvite) {
        this.userForm.email_for_invite = null
        this.$refs.userForm.clearValidate('email_for_invite')
      }
    },
    getIconCurrency() {
      if (this.typeForm === Common.CREATE) {
        return '₩'
      }
      return this.clientDetail.currency ? AccountAndBillings.LIST_CURRENCY.find((item) => item.value === this.clientDetail.currency).symbol : '₩'
    },
    getBalance() {
      if (this.typeForm === Common.CREATE) {
        return 0
      }
      return this.clientDetail.balance ? this.clientDetail.balance : 0
    },
    getRoles(roles) {
      let result = ''
      const len = roles.length
      roles.forEach((element, index) => {
        result += element
        if (index !== len - 1) {
          result += ', '
        }
      })
      return result
    },
    handleCheckAllChange(val) {
      this.userForm.accessClients = val ? [...this.accountConsignment.sub_items] : []
      this.isIndeterminate = false
    },
    handleCheckedClientChange(val) {
      this.isIndeterminate = val.length > 0 && val.length < this.accountConsignment.sub_items.length
    },
    sentInvite() {
      this.$refs.userForm.validateField('email_for_invite', (error) => {
        if (!error) {
          this.showLoading()
          const data = {
            edit_client_id: this.$route.params.client_id,
            sender_account_id: this.user.account_id,
            invite_email: this.userForm.email_for_invite,
            invite_for_role: this.userForm.invite_for_role,
            is_access_all: this.userForm.is_allow_access_all,
            manage_client_ids: [...this.userForm.accessClients].map(v => v.client_id)
          }
          this.$store.dispatch('user/sendInvite', data)
            .then((response) => {
              this.getListUserAccessor()
              this.$message.success({
                message: this.$t(`client.inviteMess.success`)
              })
            })
            .catch((error) => {
              this.showErrorApi(error)
              this.hideLoading()
            })
        }
      })
    },
    actionAssignUser(type) {
      this.$refs.userForm.validateField(type, (error) => {
        if (!error) {
          let userInfo = {}
          const data = {
            client_id: this.$route.params.client_id,
            user_id: null,
            target_account_id: null,
            assign_or_remove: 'assign',
            istetm_or_agency: '',
            start_date: ''
          }
          switch (type) {
            case AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TE_ADMIN_FIELD:
              data.istetm_or_agency = Common.TE
              userInfo = this.getUserAdminIsAssign(this.assignUserRole[type])
              break
            case AccountAndBillings.ASSIGN_USER_ROLE_GROUP.TM_ADMIN_FIELD:
              data.istetm_or_agency = Common.TM
              userInfo = this.getUserAdminIsAssign(this.assignUserRole[type])
              break
            case AccountAndBillings.ASSIGN_USER_ROLE_GROUP.AGENCY_USER_FIELD:
              data.istetm_or_agency = Common.AGENCY
              if (this.assignUserRole.dateTransfer !== '') {
                data.start_date = moment(this.assignUserRole.dateTransfer).format(Common.FORMAT_DATE_YYYY_MM_DD)
              }
              userInfo = this.getUserAgencyIsAssign(this.assignUserRole[type])
              break
          }
          if (Object.values(userInfo).length === 0) {
            data.assign_or_remove = 'remove'
            if (!this.clientDetail[type]) {
              return
            }
            this.removeRoleForUser(data, type)
            return
          }
          data.user_id = userInfo.user_id
          data.target_account_id = userInfo.account_id
          this.assignRoleForUser(data, type, userInfo)
        }
      })
    },
    getUserAdminIsAssign(userId) {
      const userAgencyObject = this.listUseAdmins.filter((item) => {
        return item.user_id === userId
      })
      return userAgencyObject.length > 0 ? userAgencyObject[0] : {}
    },
    getUserAgencyIsAssign(userId) {
      const userAdminObject = this.listAgency.filter((item) => {
        return item.user_id === userId
      })
      return userAdminObject.length > 0 ? userAdminObject[0] : {}
    },
    getListAgency() {
      this.$store.dispatch('user/getListAgencyOfClientInClientManage')
        .then((response) => {
          this.listAgency = response
          this.isLoading = false
        })
        .catch((error) => {
          this.showErrorApi(error)
          this.isLoading = false
        })
    },
    getListUserAccessor() {
      this.$store.dispatch('user/getUserAccessOfClientInClientManage', this.$route.params.client_id)
        .then((response) => {
          this.listUseAccessor = response.filter((item) => {
            item.isSHow = item.permission === Common.CLIENT_ADMIN_ROLE
            return item
          })
          this.hideLoading()
          this.isLoading = false
        })
        .catch((error) => {
          this.hideLoading()
          this.isLoading = false
          this.showErrorApi(error)
        })
    },
    getListAccountConsignment() {
      this.$store.dispatch('user/getListAccountConsignment', this.$route.params.client_id)
        .then(res => {
          this.accountConsignment = res
          this.isLoading = false
        })
        .catch((error) => {
          this.showErrorApi(error)
          this.isLoading = false
        })
    },
    assignRoleForUser(data, type, userInfo) {
      this.showLoading()
      this.$store.dispatch('user/assignRoleForUserInClientManage', data)
        .then((response) => {
          this.hideLoading()
          this.clientDetail[type] = { ...userInfo, start_date: data.start_date || null }
          switch (data.istetm_or_agency) {
            case Common.TE:
              this.$message({
                message: this.$t('client.assignRoleForUserSuccess', { agentName: userInfo.contact_name, roleType: Common.TE.toUpperCase(), clientName: this.clientDetail.client_name }),
                type: 'success'
              })
              break
            case Common.TM:
              this.$message({
                message: this.$t('client.assignRoleForUserSuccess', { agentName: userInfo.contact_name, roleType: Common.TM.toUpperCase(), clientName: this.clientDetail.client_name }),
                type: 'success'
              })
              break
            default:
              this.$message({
                message: this.$t('client.assignRoleForUserSuccess', { agentName: userInfo.contact_name, roleType: Common.AGENCY.toUpperCase(), clientName: this.clientDetail.client_name }),
                type: 'success'
              })
              this.$refs.userForm.clearValidate()
              break
          }
        })
        .catch((error) => {
          this.showErrorApi(error)
          this.hideLoading()
        })
    },
    removeRoleForUser(data, type) {
      this.showLoading()
      this.$store.dispatch('user/assignRoleForUserInClientManage', data)
        .then((response) => {
          this.hideLoading()
          switch (data.istetm_or_agency) {
            case Common.TE:
              this.$message({
                message: this.$t('client.removeRoleForUserSuccess', { agentName: this.clientDetail[type].contact_name, roleType: Common.TE.toUpperCase(), clientName: this.clientDetail.client_name }),
                type: 'success'
              })
              break
            case Common.TM:
              this.$message({
                message: this.$t('client.removeRoleForUserSuccess', { agentName: this.clientDetail[type].contact_name, roleType: Common.TM.toUpperCase(), clientName: this.clientDetail.client_name }),
                type: 'success'
              })
              break
            default:
              this.$message({
                message: this.$t('client.removeRoleForUserSuccess', { agentName: this.clientDetail[type].contact_name, roleType: Common.AGENCY.toUpperCase(), clientName: this.clientDetail.client_name }),
                type: 'success'
              })
              this.$refs.userForm.clearValidate()
              break
          }
          this.clientDetail[type] = ''
        })
        .catch((error) => {
          this.showErrorApi(error)
          this.hideLoading()
        })
    },
    getListAdmin() {
      this.$store.dispatch('user/getListAdminOfClientInClientManage')
        .then((response) => {
          this.listUseAdmins = response
          this.isLoading = false
        })
        .catch((error) => {
          this.showErrorApi(error)
          this.isLoading = false
        })
    },
    getWidthCol(col) {
      switch (col) {
        case 'group': return 120
        case 'exitingContact': return 200
        case 'date': return 150
        case 'agent': return 300
        default: return 100
      }
    },
    removeUserPermission(accessor, role) {
      if (role === Common.CLIENT_ADMIN_ROLE || !getRoleClient(`is_admin_and_client_admin_role.${this.typeForm}`)) {
        return
      }
      this.$dialog.destroy()
      this.$dialog.confirm(this.$t('client.removeUserRolePopupConfirm'), {
        customClass: 'confirmation-dialog',
        type: 'basic',
        okText: this.$t('yes'),
        cancelText: this.$t('no')
      })
        .then((dialog) => {
          this.showLoading()
          const data = {
            permission: accessor.permission,
            removeAccountId: accessor.account_id,
            clientId: this.$route.params.client_id,
            email: accessor.email_address
          }
          this.$store.dispatch('user/removeUserPermissionInClientManage', data)
            .then((response) => {
              this.getListUserAccessor()
            })
            .catch((error) => {
              this.showErrorApi(error)
              this.hideLoading()
            })
        })
        .catch(() => {})
    },
    showName(name) {
      if (Object.keys(this.accountInfo).length === 0) {
        return ''
      }
      if (name !== 'first_name' || name !== 'last_name') {
        return this.accountInfo[name]
      }
      if (this.accountInfo.isPersonal) {
        if (name === 'first_name') {
          return this.accountInfo.first_name
        } else {
          return this.accountInfo.last_name
        }
      } else {
        if (name === 'first_name') {
          return this.accountInfo.president_first_name
        } else {
          return this.accountInfo.president_last_name
        }
      }
    },
    showAccessorName(accessor) {
      if (Object.keys(accessor).length === 0) {
        return ''
      }
      if (accessor.is_Inside === 'N') {
        return `${accessor.email_address}(Pending)`
      }
      return `${accessor.last_name} ${accessor.first_name}`
    }
  }
}

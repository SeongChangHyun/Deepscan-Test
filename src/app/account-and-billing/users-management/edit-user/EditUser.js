import { mapGetters } from 'vuex'
import ListUserToInvite from '../components/ListUserToInvite.vue'
import { USER_MANAGEMENT } from '@/common/constants'
import { isEqual } from 'lodash'

export default {
  name: 'EditUser',
  components: {
    ListUserToInvite
  },
  props: {
    clientId: {
      type: Number,
      default: -1
    },
    userRole: {
      type: String,
      default: USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER
    },
    editUserData: {},
    accessTo: {
      type: Array,
      default: null
    },
    onEditUser: Function,
    onCancelEdit: Function
  },
  data() {
    return {
      payload: {
        user_email: this.editUserData.email_address,
        edit_role: this.userRole,
        is_access_all: false,
        manage_client_ids: []
      },
      userData: this.editUserData,
      accountSelected: {},
      unSelectAbleAccount: this.accessTo,
      accessAccounts: this.accessTo,
      accountRole: [
        {
          value: USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER,
          label: ''
        },
        {
          value: USER_MANAGEMENT.ROLES.CAMPAIGN_VIEWER,
          label: ''
        }
      ],
      accessAccountSelect: {},
      selectAll: false,
      isEditing: false,
      oldData: {},
      isLoading: false,
      formDirty: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'clients'
    ])
  },
  mounted() {
    this.accountRole[0].label = this.$t('user.accountRoleLabel_CM')
    this.accountRole[1].label = this.$t('user.accountRoleLabel_CV')
    setTimeout(() => {
      if (this.$refs.editUserAccessTable && this.accessAccounts) {
        this.selectAccessClients()
      }
    }, 200)
    this.oldData = Object.assign({}, this.payload)
  },
  created() {
    window.onbeforeunload = (event) => {
      if (window.formIsChanged) {
        event.returnValue = this.$t('confirmRouteLeaveMessage')
        return true
      }
    }
  },
  watch: {
    formDirty: function(val) {
      window.formIsChanged = !!val
    }
  },
  methods: {
    getRoleLabel(role) {
      if (role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER) {
        return this.$t('user.accountRoleLabel_CM') + this.getRoleSuffix(role)
      } else {
        return this.$t('user.accountRoleLabel_CV') + this.getRoleSuffix(role)
      }
    },
    getRoleSuffix(role) {
      const clientData = this.clients.find(x => x.client_id === this.accessTo[0].client_id)
      const suffix = this.$t('user.accountRoleLabelSuffix')
      if (role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER) {
        return clientData.total_cm + suffix
      } else {
        return clientData.total_cv + suffix
      }
    },
    selectAccessClients() {
      this.accessAccounts.forEach((item) => {
        this.$refs.editUserAccessTable.toggleRowSelection(this.clients.find(x => x.client_id === item.client_id))
      })
    },
    selectable(row) {
      return !this.unSelectAbleAccount || !this.unSelectAbleAccount.find(x => x.client_id === row.client_id)
    },
    getUserInvitedLabel(clientData) {
      if (this.payload.edit_role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER) {
        return clientData.total_cm + '/' + USER_MANAGEMENT.ROLES.MAX_CM
      } else {
        return clientData.total_cv + '/' + USER_MANAGEMENT.ROLES.MAX_CV
      }
    },
    onChangeEditRole() {
      this.formDirty = true
    },
    changeRoleAccess() {
      this.formDirty = true
      if (!this.payload.is_access_all && this.$refs.editUserAccessTable && this.accessAccounts) {
        this.selectAccessClients()
      }
    },
    onSelectAccessClients(value) {
      this.formDirty = true
      if (value.length === 0) {
        return
      }
      this.accessAccounts = value
    },
    onEdit(userData, accessTo, role) {
      this.payload.user_email = userData.email_address
      this.userData = userData
      this.payload.edit_role = role
      this.$refs.editUserAccessTable.clearSelection(this.accessAccounts)
      this.accessAccounts = this.unSelectAbleAccount = accessTo
      this.selectAccessClients()
      this.$refs.roleDropDown.focus()
    },
    onCancel() {
      if (this.formDirty || !isEqual(this.oldData, this.payload) || this.accessAccounts.length > 1) {
        this.$dialog.destroy()
        this.$dialog.confirm(this.$t('user.confirmCancelMessage'), {
          okText: this.$t('yes'),
          cancelText: this.$t('no'),
          customClass: 'confirmation-dialog',
          type: 'basic'
        })
          .then((dialog) => {
            window.formIsChanged = false
            window.onbeforeunload = null
            document.body.className = document.body.className.replace('dg-open', '')
            this.onCancelEdit()
          })
          .catch(() => {

          })
      } else {
        this.onCancelEdit()
      }
    },
    checkFullUserCase() {
      let totalCM = 0
      let totalCV = 0
      let accessClientId = ''
      this.accessAccounts.forEach(item => {
        if (this.userRole !== this.payload.edit_role || item.client_id !== this.accessTo[0].client_id) {
          totalCM = Math.max(totalCM, item.total_cm)
          totalCV = Math.max(totalCV, item.total_cv)
        }
        if (this.userRole !== this.payload.edit_role && (this.payload.edit_role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER && item.total_cm === USER_MANAGEMENT.ROLES.MAX_CM) ||
            (this.payload.edit_role === USER_MANAGEMENT.ROLES.CAMPAIGN_VIEWER && item.total_cv === USER_MANAGEMENT.ROLES.MAX_CV)) {
          accessClientId += accessClientId + item.client_id + ' '
        }
      })
      if (this.payload.edit_role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER && totalCM === USER_MANAGEMENT.ROLES.MAX_CM) {
        this.$alert(this.$t('user.fullUserMessageSuf') + accessClientId + this.$t('user.fullCMMessage'))
        return true
      }
      if (this.payload.edit_role === USER_MANAGEMENT.ROLES.CAMPAIGN_VIEWER && totalCV === USER_MANAGEMENT.ROLES.MAX_CV) {
        this.$alert(this.$t('user.fullUserMessageSuf') + accessClientId + this.$t('user.fullCVMessage'))
        return true
      }
      return false
    },
    saveUserRole() {
      this.payload.manage_client_ids = []
      this.accessAccounts.forEach(item => {
        this.payload.manage_client_ids.push(item.client_id)
      })
      this.isLoading = true
      this.$store.dispatch('user/editUserRole', this.payload)
        .then(() => {
          this.isLoading = false
          this.$message.success({
            message: this.$t(`user.editUserSuccess`)
          })
          this.onCancelEdit()
        })
        .catch((error) => {
          this.isLoading = false
          if (error.data) {
            this.$message.error({
              message: this.$t(`user.errorMessage.${error.data.errorKey}`)
            })
          }
        })
    },
    onSend() {
      if (isEqual(this.oldData, this.payload) && this.accessAccounts.length === 1) {
        this.onCancelEdit()
        return
      }
      if (this.checkFullUserCase()) {
        return
      }
      this.$confirm(this.$t('user.confirmEditMessage1') + this.userRole + this.$t('user.confirmEditMessage2'), '', {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no')
      })
        .then(_ => {
          this.saveUserRole()
        })
    }
  }
}

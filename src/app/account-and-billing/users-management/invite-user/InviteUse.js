import { mapGetters } from 'vuex'
import ListUserToInvite from '../components/ListUserToInvite.vue'
import { USER_MANAGEMENT } from '@/common/constants'
import { validEmailFormat } from '@/utils/validate'
import { isEqual } from 'lodash'
import { Common } from '../../../../common/constants'

export default {
  name: 'InviteUser',
  components: {
    ListUserToInvite
  },
  props: {
    clientId: {
      type: Number,
      default: -1
    },
    onEditUser: Function,
    onCancelInvite: Function,
    onChangeClient: Function
  },
  data() {
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
      tabs: USER_MANAGEMENT.TABS,
      payload: {
        edit_client_id: undefined,
        invite_email: '',
        invite_for_role: USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER,
        is_access_all: false,
        manage_client_ids: []
      },
      accessAccounts: [],
      editUser: false,
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
      emailInvalid: false,
      inviteUserRules: {
        invite_email: [
          { required: true, trigger: 'blur', message: this.$t('user.requireEmailMess') },
          { trigger: 'submit', validator: validateEmail }
        ]
      },
      oldData: {},
      isLoading: false,
      formDirty: false,
      errorClientId: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'clients'
    ])
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
    clients: {
      handler(data) {
        if (data.length > 0) {
          this.initData()
        }
      }
    },
    formDirty: function(val) {
      window.formIsChanged = !!val
    }
  },
  mounted() {
    if (this.clients.length > 0) {
      this.initData()
    }
  },
  methods: {
    initData() {
      this.payload.edit_client_id = this.clientId === USER_MANAGEMENT.TABS.ALL ? this.clients[0].client_id : this.clientId
      this.oldData = Object.assign({}, this.payload)
      this.accountRole[0].label = this.$t('user.accountRoleLabel_CM')
      this.accountRole[1].label = this.$t('user.accountRoleLabel_CV')
      this.accessAccounts = [this.clients.find(x => x.client_id === this.payload.edit_client_id)]
      setTimeout(() => {
        if (this.$refs.inviteUserAccessTable) {
          this.selectAccessClients()
        }
      }, 200)
    },
    getRoleLabel(role) {
      if (role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER) {
        return this.$t('user.accountRoleLabel_CM') + this.getRoleSuffix(role)
      } else {
        return this.$t('user.accountRoleLabel_CV') + this.getRoleSuffix(role)
      }
    },
    getRoleSuffix(role) {
      const clientData = this.clients.find(x => x.client_id === this.payload.edit_client_id)
      if (!clientData) {
        return
      }
      const suffix = this.$t('user.accountRoleLabelSuffix')
      if (role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER) {
        return clientData.total_cm + suffix
      } else {
        return clientData.total_cv + suffix
      }
    },
    selectAccessClients() {
      if (this.accessAccounts) {
        this.accessAccounts.forEach((item) => {
          this.$refs.inviteUserAccessTable.toggleRowSelection(this.clients.find(x => x.client_id === item.client_id))
        })
      }
    },
    onChangeAccountRole() {
      this.formDirty = true
    },
    getUserInvitedLabel(clientData) {
      if (this.payload.invite_for_role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER) {
        return clientData.total_cm + '/' + USER_MANAGEMENT.ROLES.MAX_CM
      } else {
        return clientData.total_cv + '/' + USER_MANAGEMENT.ROLES.MAX_CV
      }
    },
    changeSelectClient() {
      this.formDirty = true
      if (this.$refs.inviteUserAccessTable) {
        this.$refs.inviteUserAccessTable.clearSelection(this.accessAccounts)
      }
      this.accessAccounts = [this.clients.find(x => x.client_id === this.payload.edit_client_id)]
      this.changeAccessRole()
    },
    changeAccessRole() {
      this.formDirty = true
      if (!this.payload.is_access_all) {
        this.selectAccessClients()
      }
    },
    onSelectAccessClients(value) {
      if (value.length === 0) {
        this.accessAccounts = [this.clients.find(x => x.client_id === this.payload.edit_client_id)]
      } else {
        this.accessAccounts = value
        if (!value.find(x => x.client_id === this.errorClientId)) {
          this.errorClientId = null
        }
      }
    },
    selectable(row) {
      return row.client_id !== this.payload.edit_client_id
    },
    onEdit(userData, accessTo, role) {
      this.onEditUser(userData, accessTo, role)
    },
    checkFormDirty() {
      const formFields = this.$refs.inviteUserForm.fields
      formFields.forEach()
    },
    onCancel() {
      if (this.formDirty || this.accessAccounts.length > 1) {
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
            this.onCancelInvite()
          })
          .catch(() => {

          })
      } else {
        this.onCancelInvite()
      }
    },
    checkFullUserCase() {
      let totalCM = 0
      let totalCV = 0
      let accessClientId = ''
      this.accessAccounts.forEach(item => {
        if (this.userRole !== this.payload.invite_for_role || item.client_id !== this.payload.edit_client_id) {
          totalCM = Math.max(totalCM, item.total_cm)
          totalCV = Math.max(totalCV, item.total_cv)
        }
        if (this.userRole !== this.payload.invite_for_role && (this.payload.invite_for_role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER && item.total_cm === USER_MANAGEMENT.ROLES.MAX_CM) ||
            (this.payload.invite_for_role === USER_MANAGEMENT.ROLES.CAMPAIGN_VIEWER && item.total_cv === USER_MANAGEMENT.ROLES.MAX_CV)) {
          accessClientId += accessClientId + item.client_id + ' '
        }
      })
      if (this.payload.invite_for_role === USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER && totalCM === USER_MANAGEMENT.ROLES.MAX_CM) {
        if (this.$store.getters.language === Common.KO_CODE) {
          this.$alert(this.$t('user.fullCMMessage'))
        } else {
          this.$alert(this.$t('user.fullUserMessageSuf') + accessClientId + this.$t('user.fullCMMessage'))
        }
        return true
      }
      if (this.payload.invite_for_role === USER_MANAGEMENT.ROLES.CAMPAIGN_VIEWER && totalCV === USER_MANAGEMENT.ROLES.MAX_CV) {
        if (this.$store.getters.language === Common.KO_CODE) {
          this.$alert(this.$t('user.fullCMMessage'))
        } else {
          this.$alert(this.$t('user.fullUserMessageSuf') + accessClientId + this.$t('user.fullCMMessage'))
        }
        return true
      }
      return false
    },
    onSend() {
      this.$refs.inviteUserForm.validate((valid) => {
        if (isEqual(this.oldData, this.payload) & this.accessAccounts.length === 1) {
          return
        }
        if (this.checkFullUserCase()) {
          return
        }
        if (valid) {
          this.payload.manage_client_ids = []
          this.accessAccounts.forEach(item => {
            this.payload.manage_client_ids.push(item.client_id)
          })
          this.isLoading = true
          this.$store.dispatch('user/inviteUserToManageClients', this.payload)
            .then((response) => {
              this.isLoading = false
              this.$message.success({
                message: this.$t(`user.inviteUserSuccess`)
              })
              this.onCancelInvite()
            })
            .catch((error) => {
              if (!error.data) {
                return
              }
              this.errorClientId = error.data.messageParam ? Number(error.data.messageParam) : null
              this.$message.error({
                message: this.$t(`user.errorMessage.${error.data.errorKey ? error.data.errorKey : ''}`)
              })
              this.isLoading = false
            })
        }
      })
    }
  }
}

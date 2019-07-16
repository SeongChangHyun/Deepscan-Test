import { mapGetters } from 'vuex'
import ListUser from './components/ListUser'
import ListUserToInvite from './components/ListUserToInvite.vue'
import InviteUser from './invite-user'
import EditUser from './edit-user'
import { Common, USER_MANAGEMENT } from '@/common/constants'
import store from '@/store'
export default {
  name: 'UsersList',
  components: {
    ListUser,
    ListUserToInvite,
    InviteUser,
    EditUser
  },
  data() {
    return {
      activeTab: USER_MANAGEMENT.TABS.ALL,
      editUser: false,
      editUserData: {},
      slideClientStart: 0,
      slideClientEnd: 0,
      showArrowControl: false,
      slideClients: [],
      tabs: USER_MANAGEMENT.TABS,
      selectedClient: USER_MANAGEMENT.TABS.ALL,
      accessTo: [],
      accountRoleSelected: USER_MANAGEMENT.ROLES.CAMPAIGN_MANAGER,
      maxShowLengthOfClientName: 20,
      loginRole: store.getters.getRoutersInfo.key,
      isChanged: false
    }
  },
  created() {
    this.$store.dispatch('user/getClientsByCreateAccount')
    window.onbeforeunload = (event) => {
      if (window.formIsChanged) {
        event.returnValue = this.$t('confirmRouteLeaveMessage')
        return true
      }
    }
  },
  mounted() {
    this.getSlideClients()
    window.addEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapGetters('user', [
      'clients'
    ])
  },
  watch: {
    clients: {
      handler() {
        this.getSlideClients()
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  beforeRouteLeave(to, from, next) {
    if (!window.formIsChanged) {
      next()
    } else {
      this.$dialog.destroy()
      this.$dialog.confirm(this.$t('confirmRouteLeaveMessage'), {
        customClass: 'confirmation-dialog',
        type: 'basic'
      })
        .then((dialog) => {
          window.formIsChanged = false
          window.onbeforeunload = null
          document.body.className = document.body.className.replace('dg-open', '')
          next()
        })
        .catch(() => {
          next(false)
        })
    }
  },
  methods: {
    getSlideClients() {
      const listClients = []
      let slideClientsMax = 6
      if (window.innerWidth <= Common.DEVICE_WIDTH.MOBILE) {
        slideClientsMax = 0
      } else if (window.innerWidth > Common.DEVICE_WIDTH.MOBILE && window.innerWidth <= Common.DEVICE_WIDTH.SMALL_TABLET) {
        slideClientsMax = 1
      } else if (window.innerWidth > Common.DEVICE_WIDTH.SMALL_TABLET && window.innerWidth <= Common.DEVICE_WIDTH.TABLET_1024) {
        slideClientsMax = 2
      } else if (window.innerWidth > Common.DEVICE_WIDTH.TABLET_1024 && window.innerWidth <= Common.DEVICE_WIDTH.PC_MEDIUM) {
        slideClientsMax = 3
      }
      if (this.clients.length > slideClientsMax) {
        this.showArrowControl = true
        this.clients.forEach((item, index) => {
          if (index >= this.slideClientStart && index <= this.slideClientStart + slideClientsMax) {
            this.slideClientEnd = index
            listClients.push(item)
          }
        })
        this.slideClients = listClients
      } else {
        this.showArrowControl = false
        this.slideClients = this.clients
      }
    },
    getClientTabName(clientName) {
      if (clientName.length > this.maxShowLengthOfClientName) {
        return clientName.slice(0, this.maxShowLengthOfClientName - 3) + '...'
      } else {
        return clientName
      }
    },
    inviteUser() {
      if (this.activeTab !== USER_MANAGEMENT.TABS.INVITE) {
        this.selectedClient = this.activeTab
      }
      this.activeTab = USER_MANAGEMENT.TABS.INVITE
      this.changeNavigationLabel()
    },
    changeActiveTab(clientId) {
      if (this.editUser) {
        return
      }
      this.activeTab = this.selectedClient = clientId
      this.changeNavigationLabel()
    },
    previousClient() {
      if (this.slideClientStart === 0) {
        return
      }
      this.slideClientStart -= 1
      this.getSlideClients()
    },
    nextClient() {
      if (this.slideClientEnd === this.clients.length - 1) {
        return
      }
      this.slideClientStart += 1
      this.getSlideClients()
    },
    onEdit(userData, accessTo, role) {
      this.accessTo = accessTo
      this.editUserData = userData
      this.accountRoleSelected = role
      this.editUser = true
      this.activeTab = userData.client_id
      this.changeNavigationLabel()
    },
    onCancelEdit() {
      this.editUser = false
      this.activeTab = this.selectedClient = USER_MANAGEMENT.TABS.ALL
      this.changeNavigationLabel()
    },
    changeNavigationLabel() {
      const groupEL = document.getElementsByClassName('breadcrumb-text')
      if (this.editUser) {
        groupEL[groupEL.length - 1].textContent = this.$t('user.editUser')
      } else {
        if (this.activeTab === -2) {
          groupEL[groupEL.length - 1].textContent = this.$t('user.inviteUser')
        } else {
          groupEL[groupEL.length - 1].textContent = this.$t('user.listUser')
        }
      }
      window.formIsChanged = false
    },
    onCancelInvite() {
      this.activeTab = this.selectedClient = USER_MANAGEMENT.TABS.ALL
      this.$store.dispatch('user/getClientsByCreateAccount')
      this.changeNavigationLabel()
    },
    handleResize() {
      this.getSlideClients()
    }
  }
}

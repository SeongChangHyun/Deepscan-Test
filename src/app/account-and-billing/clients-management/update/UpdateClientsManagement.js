import CreateClient from '@/app/account-and-billing/clients-management/create/index'
import UpdateClientsForm from './UpdateClientsForm.vue'
import { ClientsManagementMixin } from '../ClientsManagementMixin'
import { ListLoader } from 'vue-content-loader'
import { Common } from '@/common/constants'

export default {
  name: 'UpdateClient',
  components: {
    ListLoader,
    UpdateClientsForm,
    CreateClient
  },
  mixins: [ClientsManagementMixin],
  created() {
    this.getClientDetail()
    this.typeForm = Common.EDIT
    window.onbeforeunload = (event) => {
      if (window.formIsChanged) {
        return this.$t('confirmRouteLeaveMessage')
      }
    }
  },
  data() {
    return {
      isLoading: true,
      clientDetail: {}
    }
  },
  beforeDestroy() {
    window.formIsChanged = false
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
          window.onbeforeunload = null
          window.formIsChanged = false
          this.$dialog.destroy()
          next()
        })
        .catch(() => {
          this.$dialog.destroy()
          next(false)
        })
    }
  },
  methods: {
    getClientDetail() {
      this.$store.dispatch('user/getDetailClientInClientManage', this.$route.params.client_id)
        .then((response) => {
          this.clientDetail = response
        })
        .catch((error) => {
          this.showErrorApi(error)
        })
    }
  }
}

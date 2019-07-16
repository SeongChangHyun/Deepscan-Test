import { SUCCESS } from '@/common/constants'

export const CreativesManagementMixin = {
  data() {
    return {
      loading: null
    }
  },
  methods: {
    showLoading() {
      if (this.loading !== null) {
        return
      }
      this.loading = this.$loading({
        lock: true,
        text: this.$t('memberAccount.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    hideLoading() {
      if (this.loading === null) {
        return
      }
      this.loading.close()
      this.loading = null
    },
    showMessage(message, messageType = SUCCESS) {
      this.$message({
        message: this.$t(message),
        type: messageType
      })
    },
    showErrorApi(error) {
      if (error.status && error.status === 400) {
        if (error.data) {
          let errorData = error.data
          if (typeof error.data === 'string') {
            errorData = JSON.parse(error.data)
          }
          const message = errorData.hasOwnProperty('message') ? errorData.message : errorData.error_description
          if (message.includes('timeout')) {
            this.$message.error(this.$t(`client.messageFromApi.timeout`))
          } else {
            this.$message.error(this.$t(`client.messageFromApi.${message}`))
          }
        }
      }
    }
  }
}

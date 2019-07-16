import AccountApiService from '@/app/services/accountApiService'

/*
  Version: v0.5
  Documentation: WP_TG3.0_Functional Requirement Specification_Authentication_v0.5
*/

// Init api services
const AccountService = AccountApiService.build()

export default {
  name: 'UserActivation',
  data() {
    return {
      oldEmail: '',
      isDisabled: false,
      renderComponent: true,
      isActivated: false,
      isFirstCheck: false,
      loadingGlobal: ''
    }
  },
  watch: {
    '$route'(to, from) {
      this.openLoading()
      this.checkActiveCode(to.query.validateCode)
      this.forceReRender()
    }
  },
  mounted() {
    this.openLoading()
    this.checkActiveCode(this.$route.query.validateCode)
  },
  methods: {
    checkActiveCode(token) {
      AccountService.activeAccount({ token })
        .then((response) => {
          this.closeLoading()
          this.isActivated = response
        })
        .catch((error) => {
          this.closeLoading()
          let errorData = error.response.data
          if (typeof errorData === 'string') {
            errorData = JSON.parse(errorData)
          }
          const resultForm = {
            title: errorData.errorKey ? 'activation.subTitleActivatedEmail' : 'activation.subTitleOutdateEmail',
            content: errorData.errorKey ? 'activation.msgActivatedEmail' : 'resetPwd.msgInvalid',
            buttonText: 'activation.btnBackToSignUp',
            actionBtn: () => {
              this.goTo('/login')
            }
          }
          this.$store.dispatch('UpdateResultForm', resultForm)
          this.goTo('/result')
          this.oldEmail = errorData.errorKey ? errorData.errorKey.split(':')[1] : ''
        })
    },
    handleActivation() {
      if (this.isActivated) {
        this.goTo('/login')
      } else {
        this.reSendVerifyEmail()
      }
    },
    reSendVerifyEmail() {
      AccountService.verifyAccount({
        email: this.oldEmail
      })
        .then(() => {
          this.$message({
            message: this.$t('activation.msgSentVerifyEmail'),
            type: 'success'
          })
          this.$store.dispatch('UpdateResultForm', {
            title: 'activation.msgSuccessTitle',
            content: 'activation.msgSuccessContent',
            buttonText: 'activation.btnBackToSignUp',
            actionBtn: () => {
              this.$store.dispatch('ResetResultForm')
              this.goTo('/login')
            }
          })
          this.goTo('/result')
          this.isDisabled = true
        })
        .catch((error) => {
          let errorData = error.response.data
          if (typeof errorData === 'string') {
            errorData = JSON.parse(errorData)
          }
          this.$message.error(this.$t(`register.${errorData.message}`))
          this.isLoading = false
        })
    },
    goTo(link) {
      this.$router.push({
        path: link
      })
    },
    forceReRender() {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      })
    },
    getText(text) {
      return text.replace('\n', '<br>')
    },
    openLoading() {
      this.isFirstCheck = false
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    closeLoading() {
      this.isFirstCheck = true
      this.loading.close()
    }
  }
}

import { ResetForm } from './reset-form'
import { PasswordHelp } from './password-help'

/*
  Version: v1.5
  Documentation: WP_TG3.0_Functional Requirement Specification_ResetPassword_v1.5
  Updated at: 06/05/2019
*/

export default {
  name: 'ResetPassword',
  components: {
    PasswordHelp,
    ResetForm
  },
  data() {
    return {
      isLoading: false,
      renderComponent: true,
      currentTabComponent: PasswordHelp
    }
  },
  watch: {
    '$route'(to, from) {
      this.currentTabComponent = to.query.passwordResetCode !== undefined ? ResetForm : PasswordHelp
      this.forceReRender()
    }
  },
  mounted() {
    this.currentTabComponent = this.$route.query.passwordResetCode !== undefined ? ResetForm : PasswordHelp
  },
  methods: {
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
    }
  }
}

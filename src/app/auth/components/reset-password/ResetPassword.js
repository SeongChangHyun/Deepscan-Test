import { ResetForm } from './reset-form'
import { PasswordHelp } from './password-help'

/*
  Version: v1.0
  Documentation: WP_TG3.0_Functional Requirement Specification_ResetPassword_v1.0
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
      currentTabComponent: PasswordHelp
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
    }
  }
}

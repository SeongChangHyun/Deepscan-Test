import {
  // TODO: server side has not provided an email login feature yet
  // validEmail,
  validPassword
} from '@/utils/validate'
import { Auth } from '@/common/constants'

/*
  Version: v0.5
  Documentation: WP_TG3.0_Functional Requirement Specification_Authentication_v0.5
*/

export default {
  name: 'LoginForm',
  data() {
    // TODO: server side has not provided an email login feature yet
    // const validateUsername = (rule, value, callback) => {
    //   if (!validEmail(value)) {
    //     callback(new Error(this.$t('login.errMsgEmail')))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8 || value.length > 12) {
        callback(new Error(this.$t('login.errMsgPwdLength')))
      } else {
        if (!validPassword(value)) {
          callback(new Error(this.$t('login.errMsgPwdCondition')))
        } else {
          callback()
        }
      }
    }
    return {
      loginForm: {
        // TODO: mockdata - remove after integrate API
        // TODO: multiple languages of error message required fields
        email: 'vn_ssp_cpc',
        password: '!@V!etn4m',
        edirect: undefined
      },
      loginRules: {
        // TODO: server side has not provided an email login feature yet
        // email: [
        //   { required: true, trigger: 'blur', validator: validateUsername }
        // ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: Auth.TYPE_PASSWORD_FIELD,
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    showPwd() {
      if (this.passwordType === Auth.TYPE_PASSWORD_FIELD) {
        this.passwordType = ''
      } else {
        this.passwordType = Auth.TYPE_PASSWORD_FIELD
      }
    },
    goToRegister() {
      this.$router.push({ path: '/register' })
    },
    goToResetPwd() {
      this.$router.push({ path: '/reset-password' })
    }
  }
}

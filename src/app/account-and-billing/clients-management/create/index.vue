<template>
  <div class="create-clients bg-light">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" class="content-form">
        <div>
          <create-client-form ref="createForm" :client-detail="clientDetail" :advertiser-terms="advertiserTerms" :account-info="accountInfo" />
          <slot ref="updateForm" />
          <!-- Item 22 -->
          <el-form>
            <el-form-item class="checkbox">
              <el-checkbox v-model="isReadTerm" :class="{'term-danger': isReadTermErr}" :disabled="typeForm === common.EDIT || !getRoleClient(`is_campaign_viewer.${typeForm}`)" @change="isReadTermErr=!isReadTerm">{{ $t('client.term') }} {{ !!clientDetail.agreeTermsDate ? `(${clientDetail.agreeTermsDate})` : '' }} </el-checkbox>
            </el-form-item>
          </el-form>
          <el-row class="align-ct-center">
            <el-button
              :disabled="!isReadTerm || !getRoleClient(`is_campaign_viewer.${typeForm}`)"
              type="info"
              class="btn-register w-100px rounded-0 px-0"
              @click="onSubmit"
            >
              {{ $t('memberAccount.saveBtn') }}
            </el-button>
            <el-button
              :disabled="!getRoleClient(`is_campaign_viewer.${typeForm}`)"
              type="info"
              class="btn-cancel w-100px rounded-0 px-0"
              @click="onCancel"
            >
              {{ $t('memberAccount.cancelBtn') }}
            </el-button>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" class="content-form">
        <div class="billing-and-access-user-container">
          <billing-and-access-user :client-detail="clientDetail" :account-info="accountInfo" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BillingAndAccessUser } from '@/app/account-and-billing/clients-management/billing-and-access-user'
import CreateClientForm from './CreateClientsForm'
import { ClientsManagementMixin } from '../ClientsManagementMixin'
import { Common } from '@/common/constants'
import moment from 'moment'
import { getRoleClient } from '../permission'

export default {
  name: 'CreateClient',
  components: {
    BillingAndAccessUser,
    CreateClientForm
  },
  mixins: [ClientsManagementMixin],
  props: {
    clientDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      common: Common,
      isReadTermErr: false,
      isLoading: true,
      isReadTerm: false,
      advertiserTerms: '',
      typeForm: Common.CREATE,
      getRoleClient,
      accountInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    isReadTerm(value) {
      if (value && this.typeForm === Common.EDIT) {
        this.clientDetail.agreeTermsDate = moment().format('YYYY-MM-DD')
      }
    }
  },
  created() {
    this.getAdvertiserTerm()
    this.getAccountInformation()
    if (this.$route.params.hasOwnProperty('client_id')) {
      this.typeForm = Common.EDIT
      this.isReadTerm = true
    }
    window.onbeforeunload = (event) => {
      if (window.formIsChanged) {
        return this.$t('confirmRouteLeaveMessage')
      }
    }
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
    onSubmit() {
      Promise.all([
        new Promise((resolve, reject) => {
          this.$refs.createForm.onSubmit()
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        }),
        new Promise((resolve, reject) => {
          if (this.$slots.default && this.$slots.default.length > 0) {
            this.$slots.default[0].componentInstance.onSubmit()
              .then((response) => resolve(response))
              .catch((error) => reject(error))
          } else {
            resolve({ status: true })
          }
        }),
        new Promise((resolve, reject) => {
          this.isReadTermErr = !this.isReadTerm
          if (this.isReadTerm) {
            resolve({
              status: true
            })
          } else {
            reject({
              status: false
            })
          }
        })
      ])
        .then((value) => {
          const createClientData = value[0].data
          createClientData.email = createClientData.email.toLowerCase()
          this.showLoading()
          let dataPost = Object.assign({}, createClientData)
          if (this.$slots.default && this.$slots.default.length > 0) {
            dataPost = Object.assign(dataPost, this.$slots.default[0].componentInstance.updateClientForm)
            dataPost.agreeTermsDate = this.clientDetail.agreeTermsDate
            this.$store.dispatch('user/updateClientInClientManage', dataPost)
              .then(() => {
                this.$message({
                  message: this.$t('generalBNA.msg8'),
                  type: 'success',
                  duration: 5000
                })
                this.redirect()
              })
              .catch((error) => {
                this.hideLoading()
                this.showErrorApi(error)
              })
            return
          }
          this.$store.dispatch('user/createClientInClientManage', dataPost)
            .then(() => {
              this.$message({
                message: this.$t('generalBNA.msg13'),
                type: 'success',
                duration: 5000
              })
              this.redirect()
            })
            .catch((error) => {
              this.showErrorApi(error)
              this.hideLoading()
            })
        })
        .catch((error) => {
          this.$message.error(this.$t('client.validateFormClientErrorContent'))
          return error
        })
    },
    onCancel() {
      this.$router.push({ path: '/account-and-billing/clients-management' })
    },
    getAdvertiserTerm() {
      this.$store.dispatch('user/getAdvertiserTerm')
        .then((response) => {
          this.advertiserTerms = response.advertiser_terms
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.showErrorApi(error)
        })
    },
    getAccountInformation() {
      this.$store.dispatch('user/getAccountInformationInClientManage')
        .then((response) => {
          this.accountInfo = response
        })
        .catch((error) => {
          this.showErrorApi(error)
        })
    },
    redirect() {
      this.removeEvent()
      this.$router.push({ path: '/account-and-billing/clients-management' })
    },
    removeEvent() {
      document.body.className = document.body.className.replace('dg-open', '')
      this.isChanged = false
      window.formIsChanged = false
      window.onbeforeunload = null
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './createClientsManagement.scss'
</style>

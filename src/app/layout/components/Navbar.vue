<template>
  <div class="navbar d-flex justify-content-between">
    <hamburger v-if="$store.state.layout.device === Common.MOBILE" :toggle-click="toggleSideBar" class="hamburger-container"/>
    <logo />
    <div class="d-flex">
      <div :title="$t('navbar.changeLang')" class="change-lang">
        <el-dropdown :class="{'mt-18px': $store.state.layout.device === Common.MOBILE }" trigger="click" class="lang-select" @command="handleSetLanguage">
          <div class="label-lang">
            <div v-if="language===Common.KO_CODE">
              <svg-icon icon-class="south-korea" />
              <span v-if="$store.state.layout.device !== Common.MOBILE">{{ $t('navbar.koLang') }}</span>
              <i class="pl-2 el-icon-arrow-down" />
            </div>
            <div v-if="language===Common.EN_CODE">
              <svg-icon icon-class="united-states" />
              <span v-if="$store.state.layout.device !== Common.MOBILE">{{ $t('navbar.enLang') }}</span>
              <i class="pl-2 el-icon-arrow-down" />
            </div>
            <div v-if="language===Common.JA_CODE">
              <svg-icon icon-class="japan" />
              <span v-if="$store.state.layout.device !== Common.MOBILE">{{ $t('navbar.jaLang') }}</span>
              <i class="pl-2 el-icon-arrow-down" />
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language===Common.KO_CODE" command="ko">
              <svg-icon icon-class="south-korea" />
              <span>{{ $t('navbar.koLang') }}</span>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language===Common.EN_CODE" command="en">
              <svg-icon icon-class="united-states" />
              <span>{{ $t('navbar.enLang') }}</span>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language===Common.JA_CODE" command="ja">
              <svg-icon icon-class="japan" />
              <span>{{ $t('navbar.jaLang') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <action-icon v-if="$store.state.layout.device !== Common.MOBILE" class="pl-4" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Common } from '@/common/constants'
import Hamburger from '@/components/Hamburger'
import Logo from '@/app/layout/components/Sidebar/Logo'
import ActionIcon from '@/app/layout/components/Sidebar/ActionBtn'

export default {
  components: {
    Logo,
    ActionIcon,
    Hamburger
  },
  data: function() {
    return {
      Common,
      searchSource: [
        {
          data: {
            key: 'pepsi',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: 'Pepsi'
            }
          }
        },
        {
          data: {
            key: 'coca',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: 'Coca cola'
            }
          }
        },
        {
          data: {
            key: '7up',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: '7up'
            }
          }
        },
        {
          data: {
            key: 'fanta',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: 'Fanta'
            }
          }
        }
      ],
      keyExpr: 'data.key',
      displayExpr: 'data.detail.name'
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    onSearchResult(value) {
      // TO DO : handel search result
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

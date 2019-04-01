<template>
  <div class="navbar d-flex flex-row-reverse">
    <div :title="$t('navbar.logout')" class="icon-action">
      <svg-icon icon-class="logout" @click="logout" />
    </div>

    <div class="icon-action">
      <svg-icon icon-class="question" />
    </div>

    <div class="icon-action">
      <svg-icon icon-class="info-sign" />
    </div>

    <div class="icon-action">
      <svg-icon icon-class="notification" />
    </div>

    <div :title="$t('navbar.changeLang')" class="change-lang">
      <el-dropdown trigger="click" class="lang-select" @command="handleSetLanguage">
        <div class="label-lang">
          <div v-if="language===Common.KO_CODE">
            <svg-icon icon-class="south-korea" />
            <span>Korean</span>
            <i class="el-icon-arrow-down" />
          </div>
          <div v-if="language===Common.EN_CODE">
            <svg-icon icon-class="united-states" />
            <span>English</span>
            <i class="el-icon-arrow-down" />
          </div>
          <div v-if="language===Common.JA_CODE">
            <svg-icon icon-class="japan" />
            <span>Japan</span>
            <i class="el-icon-arrow-down" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language===Common.KO_CODE" command="ko">
            <svg-icon icon-class="south-korea" />
            <span>Korean</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="language===Common.EN_CODE" command="en">
            <svg-icon icon-class="united-states" />
            <span>English</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="language===Common.JA_CODE" command="ja">
            <svg-icon icon-class="japan" />
            <span>Japan</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Search from '@/components/HeaderSearch'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { Common } from '@/common/constants'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    Search,
    AutocompleteSearch
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

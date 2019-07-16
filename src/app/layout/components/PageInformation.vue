<template>
  <div class="page-information">
    <div class="statistical w-100 table">
      <div :class="{'d-table-cell': $store.state.layout.device !== Common.MOBILE}" class="mb-3 card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-korean-won">
            <svg-icon icon-class="korean-won" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <div class="card-panel-text">남은 예산</div>
            <h3 class="card-panel-text-bold mt-2">
              <span class="card-panel-main-desc">100,000</span>
              <span class="card-panel-sub-desc">(약 5일 광고 가능)</span>
            </h3>
          </div>
        </div>
      </div>
      <div :class="{'d-table-cell': $store.state.layout.device !== Common.MOBILE}" class="mb-3 card-panel-col">
        <div class="card-panel border-x-0">
          <div class="card-panel-icon-wrapper icon-contacts">
            <svg-icon icon-class="contacts" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <div class="card-panel-text">광고주명&#x26;광고주 ID</div>
            <h3 class="card-panel-text-bold mt-2">
              <span class="card-panel-main-desc">와이더플래닛_홍건기</span>
              <span class="card-panel-sub-desc"> (30.375)</span>
            </h3>
          </div>
        </div>
      </div>
      <div :class="{'d-table-cell': $store.state.layout.device !== Common.MOBILE}" class="mb-3 card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-bank">
            <svg-icon icon-class="bank" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <div class="card-panel-text">입금계좌</div>
            <h3 class="card-panel-text-bold mt-2">
              <span class="card-panel-main-desc">우체국 01244381280084</span>
              <span class="card-panel-sub-desc"> (예금주: (주)와이더플래닛)</span>
            </h3>
          </div>
        </div>
      </div>
      <div v-if="isRouterlevel" :class="{'d-table-cell': $store.state.layout.device !== Common.MOBILE}" class="mb-3 card-panel-col" @click="goHome()">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-bank">
            <svg-icon icon-class="bank" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <h3 class="card-panel-text-bold mt-2">
              GO HOME
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="page-title">
      <div class="breadcrumb">
        <div class="breadcrumb-item">
          <svg-icon icon-class="house" class="breadcrumb-icon active" @click="goto('/')" />
          <i class="el-icon-arrow-right"/>
        </div>
        <div v-for="(item, index) in listBreadcrumb" :key="index" class="breadcrumb-item">
          <span v-if="item.path!==''" :class="{'active': (listBreadcrumb.length - 1)!=index}" class="breadcrumb-text" @click="goto(item.path)">{{ generateTitle(item.meta.title) }}</span>
          <i v-if="item.path!=='' && (listBreadcrumb.length - 1)!=index" class="el-icon-arrow-right"/>
        </div>
      </div>
      <date-filter-selection v-if="Common.Reporting.includes(currentPage)"/>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { generateTitle } from '@/utils/i18n'
import { Common } from '@/common/constants'
import DateFilterSelection from '@/components/DateFilterSelection'
import { LevelRouter } from '@/common/selectAccount'

export default {
  name: 'PageInformation',
  components: {
    CountTo, DateFilterSelection
  },
  data() {
    return {
      Common,
      listBreadcrumb: [],
      currentPage: ''
    }
  },
  computed: {
    isRouterlevel() {
      return this.$store.getters.getRoutersLevel === LevelRouter.client
    }
  },
  watch: {
    $route() {
      this.updateList()
    }
  },
  created() {
    this.updateList()
  },
  methods: {
    generateTitle,
    goto(link) {
      if (this.$route.path === '/creatives/create-ci' && link === '/creatives') {
        link = '/creatives/list-ci'
      }
      this.$router.push({ path: link })
    },
    updateList() {
      this.currentPage = this.$route.name
      this.listBreadcrumb = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    goHome() {
      const currentRouterInfo = this.$store.getters.getRoutersInfo
      const dataGoBack = {
        type: LevelRouter.parent,
        role: currentRouterInfo.role,
        key: currentRouterInfo.key,
        accountId: currentRouterInfo.accountId,
        clientId: currentRouterInfo.clientId
      }
      this.$store.dispatch('UpdateRoles', dataGoBack)
    }
  }
}
</script>

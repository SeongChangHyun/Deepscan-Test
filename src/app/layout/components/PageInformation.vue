<template>
  <div class="page-information">
    <div class="statistical w-100">
      <div class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-korean-won">
            <svg-icon icon-class="korean-won" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <div class="card-panel-text">남은 예산</div>
            <h3 class="card-panel-text-bold mt-2">
              <count-to :start-val="0" :end-val="100000" :duration="2000" class="card-panel-num"/>
              (약 <count-to :start-val="0" :end-val="5" :duration="2000" class="card-panel-num"/>일 광고 가능)
            </h3>
          </div>
        </div>
      </div>
      <div class="card-panel-col">
        <div class="card-panel border-x-0">
          <div class="card-panel-icon-wrapper icon-contacts">
            <svg-icon icon-class="contacts" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <div class="card-panel-text">광고주명&#x26;광고주 ID</div>
            <h3 class="card-panel-text-bold mt-2">
              와이더플래닛_홍건기 (<count-to :start-val="0" :end-val="30375" :duration="3000" class="card-panel-num"/>)
            </h3>
          </div>
        </div>
      </div>
      <div class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-bank">
            <svg-icon icon-class="bank" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description flex-grow-1">
            <div class="card-panel-text">입금계좌</div>
            <h3 class="card-panel-text-bold mt-2">
              우체국 01244381280084 (예금주: (주)와이더플래닛)
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
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import TagsView from '@/app/tags-view/TagsView'
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'PageInformation',
  components: {
    TagsView,
    CountTo
  },
  data() {
    return {
      listBreadcrumb: []
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
      this.$router.push({ path: link })
    },
    updateList() {
      this.listBreadcrumb = this.$route.matched
    }
  }
}
</script>

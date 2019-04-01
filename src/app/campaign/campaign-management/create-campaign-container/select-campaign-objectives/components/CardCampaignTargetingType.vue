<template>
  <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
    <!-- <b-col :cols="12" :sm="6" :md="6" :lg="3" :xl="3"> -->
    <div :class="{'btn-card':true, 'btn-card-active':active}" @click="clickItem">
      <el-card class="card-item" shadow="never">
        <div class="content">
          <h3
            class="title"
          >{{ $t(`createCampaign.stepSelectCampaignObjectives.targetingTypeList.${title}.title`) }}</h3>
          <p>{{ $t(`createCampaign.stepSelectCampaignObjectives.targetingTypeList.${title}.desc`) }}</p>
        </div>
        <div>
          <div :class="{icon:true, active:active}">
            <svg-icon :icon-class="true ? 'check-symbol' : 'close-button'" class="svg-icon"/>
          </div>
        </div>
      </el-card>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickItem() {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        targetingType: this.$props.title,
        isTrackingTag: false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.btn-card {
  cursor: pointer;
  margin-top: 20px;
  .card-item {
    border-radius: 0;
    border: none;
    .title {
      height: 20px;
      width: 139px;
      margin-top: 0;
      font-size: 20px;
      line-height: 30px;
      font-weight: 500;
      color: #000000;
    }
    .descripton {
      margin-top: 0;
      font-size: 14px;
      line-height: 21px;
      color: #4B5054;
    }
    .content {
      float: left;
      width: calc(100% - 40px);
      flex: 1;
    }
    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid $bluePrimary;
      float: right;
      padding: 6px;
      .svg-icon {
        color: #fff;
        width: 16px;
        height: 16px;
      }
    }
    .icon.active {
      background: $bluePrimary;
    }
  }
}
.btn-card:hover {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.25);
}
.btn-card-active {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.25);
}
</style>

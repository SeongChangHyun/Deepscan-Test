<template>
  <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="container">
    <!-- <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3"> -->
    <div
      :class="{'btn-card':true, 'btn-card-active':active , 'btn-card-un-active':!isShow}"
      @click="clickItem"
    >
      <!-- class="row-eq-height " -->
      <div :class="{ active: active , status: true}"/>
      <el-card class="card-item" shadow="never">
        <h3
          class="title"
        >{{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${title}.title`) }}</h3>
        <img :src="getImgUrl" class="image">
        <p
          class="description"
        >{{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${title}.desc`) }}</p>
        <!-- <p
          :class="{ active: active , text: true}"
        >{{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${title}.text`) }}</p>-->
      </el-card>
      <div class="mask-create">
        <div>
          <span>+</span>
        </div>
      </div>
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
    },
    isShow: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getImgUrl() {
      const images = require(`@/assets/images/campaign/${this.title}.png`)
      return images
    }
  },
  methods: {
    clickItem() {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        campaignGoal: this.$props.title,
        targetingType: ''
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.container{
  align-self: stretch;
  margin-top: 20px;
}
.btn-card {
  cursor: pointer;
  position: relative;
  width:100%;
  height:  calc(100% - 3px);
  .card-item {
    border-radius: 0;
    border: none;
    height: 100%;
    .title {
      margin: 0px 0px 20px 0px;
    }
    .description {
      color: #4b5054;
      font-size: 14px;
      line-height: 21px;
    }
    .image {
      width: 100%;
      height: 100%;
    }
    .text {
      text-align: center;
      border: 1px solid #27ae60;
      border-radius: 4px;
      padding: 20px 0;
      margin: auto;
    }
    .text.active {
      color: #fff;
      background: #27ae60;
    }
  }
  .status {
    width: 100%;
    height: 3px;
    background: #ffffff;
  }
  .status.active {
    background: $bluePrimary !important;
  }
  .mask-create {
    background: rgba(29, 147, 207, 0);
    height: 100%;
    width: 100%;
    transition: 0.5s;
    position: absolute;
    top: 3px;
    opacity: 0;
    div {
      height: 100px;
      width: 100px;
      background-color: #ffffff;
      color: $bluePrimary;
      font-size: 50px;
      text-align: center;
      border-radius: 50%;
      margin: auto;
      padding: 19px 0;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  .mask-create:hover {
    background: rgba(29, 147, 207, 0.5);
    opacity: 1;
  }
}
.btn-card:hover {
  opacity: 1;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.25);
  .status {
    background: #93ddff;
  }
}
.btn-card-active {
  opacity: 1;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.25);
}
.btn-card-un-active {
  opacity: 0.6;
}
</style>


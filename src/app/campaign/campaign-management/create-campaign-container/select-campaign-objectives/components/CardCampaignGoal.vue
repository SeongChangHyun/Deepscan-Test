<template>
  <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="group-container">
    <el-col class="container">
      <div
        :class="{'btn-card':true, 'btn-card-active':active , 'btn-card-un-active':!isShow}"
        @click="clickItem"
      >
        <div :class="{ active: active , status: true}"/>
        <el-card class="card-item" shadow="never">
          <h3
            class="title"
          >{{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${title}.title`) }}</h3>
          <img :src="getImgUrl" class="image">
          <p
            class="description"
          >{{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${title}.desc`) }}</p>
        </el-card>
        <div class="mask-create">
          <div>
            <span>+</span>
          </div>
        </div>
      </div>
    </el-col>
    <template v-if="active">
      <CardCampaignTargetingType
        v-for="item in targetingTypeList"
        :title="item.key"
        :key="item.key"
        :active="item.key === activeTargetingType"
        class="item-target-ting-type"
      />
    </template>
  </el-col>
</template>
<script>
import CardCampaignTargetingType from './CardCampaignTargetingType'
import { mapState } from 'vuex'
import { targetingTypeList, campaignGoalList } from '../../campaignConfig.json'

export default {
  components: {
    CardCampaignTargetingType
  },
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
  data() {
    return {
      campaignGoalList: Object.values(campaignGoalList)
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    getImgUrl() {
      const images = require(`@/assets/images/campaign/${this.title}.png`)
      return images
    },
    activeTargetingType() {
      return this.dataCreateCampaign.c_type
    },
    targetingTypeList() {
      const key = this.title
      if (!key) return []
      return [...campaignGoalList[key].targetingTypeRules].map(
        v => targetingTypeList[v]
      )
    }
  },
  methods: {
    clickItem() {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        g_type: this.$props.title,
        c_type: ''
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.group-container {
  padding: 0 !important;
  align-self: stretch;
  margin-top: 15px;
}
.container {
  align-self: stretch;
  // height: 100%;
}
.btn-card {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: calc(100% - 3px);
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

@media screen and (min-width: 768px) {
  .item-target-ting-type {
    display: none;
  }
  .container {
    height: 100%;
  }
}
</style>


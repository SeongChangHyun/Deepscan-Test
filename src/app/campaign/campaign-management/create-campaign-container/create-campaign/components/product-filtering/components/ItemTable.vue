<template>
  <el-row class="targeted-data item">
    <el-col :xs="4" :sm="2">
      <span :class="{targeted:status === 1 , excluded:status!==1 }">{{ status === 1 ? "T" : "E" }}</span>
    </el-col>
    <el-col :span="4">
      <span>{{ id }}</span>
    </el-col>
    <el-col :xs="9" :sm="11">
      <span>{{ name }}</span>
    </el-col>
    <el-col :span="6"><span>{{ price }}</span></el-col>
    <el-col :span="1">
      <span>
        <svg-icon
          icon-class="close-button"
          class="close-btn"
          @click="clickDelete"
        />
      </span>
    </el-col>
  </el-row>
</template>

<script>
import { CampaignManagementConstants } from '@/common/constants'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    name: {
      type: [String, Number],
      required: true
    },
    status: {
      type: [String, Number],
      required: true
    },
    price: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  methods: {
    clickDelete() {
      this.onDelete(this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  padding-left: 15px;
  padding-right: 15px;
}
.close-btn{
  margin-top: 5px;
}
</style>

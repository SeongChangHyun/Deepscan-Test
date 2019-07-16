<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <table class="w-100" @click="showContent=!showContent">
        <tr>
          <td class="el-col-md-6 el-col-sm-6 el-col-xs-6 align-middle float-none p-0 h-title">
            <p class="h-title h-mg-0">
              {{ title }}
              <sup v-if="requiredData">*</sup>:
            </p>
          </td>
          <td v-if="!showContent" class="el-col-md-17 el-col-sm-17 el-col-xs-17 align-middle float-none p-0 group-description">
            <span>{{ desc }}</span>
          </td>
          <td class="el-col-md-1 el-col-sm-1 el-col-xs-1 align-middle float-none p-0 text-right">
            <el-button
              :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
              type="default"
              class="border-0 p-1 expand-btn"
            />
          </td>
        </tr>
      </table>
    </el-col>

    <el-col v-if="showContent" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div>
        <span>{{ desc }}</span>
      </div>
      <slot/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    requiredData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showContent: false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 10px 0;
  .h-title {
    margin-top: 0px;
  }
}

@media screen and (max-width: 767px) {
  .group-description {
    display: none;
  }
}

</style>

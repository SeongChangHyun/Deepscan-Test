<template>
  <el-row>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" class="d-flex">
      <el-input
        v-model="timeObject.day"
        :disabled="disabledInit"
        :maxlength="maxDay.toString().length"
        class="pr-1"
        @keyup.native.prevent="formatNumberEvent($event)"
      />
      <div class="text">{{ $t('client.day') }}</div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" class="d-flex">
      <el-select
        v-model="timeObject.hour"
        :disabled="disabledInit"
        class="pr-1"
      >
        <el-option
          v-for="(index) in 24"
          :key="index"
          :value="index - 1"
          :label="index - 1"
        />
      </el-select>
      <div class="text">{{ $t('client.hour') }}</div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" class="d-flex">
      <el-select
        v-model="timeObject.min"
        :disabled="disabledInit"
        class="pr-1"
      >
        <el-option
          v-for="(index) in 60"
          :key="index"
          :value="index - 1"
          :label="index - 1"
        />
      </el-select>
      <div class="text">{{ $t('client.min') }}</div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" class="d-flex">
      <el-select
        v-model="timeObject.sec"
        :disabled="disabledInit"
        class="pr-1"
      >
        <el-option
          v-for="(index) in 60"
          :key="index"
          :value="index - 1"
          :label="index - 1"
        />
      </el-select>
      <div class="text">{{ $t('client.sec') }}</div>
    </el-col>
    <el-col v-show="!hideSession" :xs="24" :sm="24" :md="24" :lg="24">
      <div v-show="false">{{ sumTime }}</div>
      <el-checkbox v-model="timeObject.session" :disabled="disabledInit">{{ $t('client.inSession') }}</el-checkbox>
    </el-col>
  </el-row>
</template>

<script>
import { AccountAndBillings } from '@/common/constants'

export default {
  name: 'ValidTime',
  props: {
    timeValue: {
      type: Number,
      default: 0
    },
    hideSession: {
      type: Boolean,
      default: false
    },
    disabledInit: {
      type: Boolean,
      default: false
    },
    inSession: {
      type: Boolean,
      default: false
    },
    maxDay: {
      type: Number,
      default: 90
    }
  },
  data() {
    return {
      listDays: AccountAndBillings.LIST_DAYS,
      timeObject: {
        day: 0,
        hour: 0,
        min: 0,
        sec: 0,
        session: false
      }
    }
  },
  computed: {
    sumTime: function() {
      if (isNaN(this.timeObject.day)) {
        return
      }
      const totalSecond = this.timeObject.day * 24 * 60 * 60 + this.timeObject.hour * 60 * 60 + this.timeObject.min * 60 + this.timeObject.sec
      this.$emit('change-time-seconds', this.hideSession ? totalSecond : { totalSecond, session: this.timeObject.session })
      return totalSecond
    }
  },
  watch: {
    timeValue: function(newVal, oldVal) {
      this.timeObject.day = Math.floor(newVal / (24 * 60 * 60))
      this.timeObject.hour = Math.floor((newVal - this.timeObject.day * 24 * 60 * 60) / (60 * 60))
      this.timeObject.min = Math.floor((newVal - this.timeObject.day * 24 * 60 * 60 - this.timeObject.hour * 60 * 60) / 60)
      this.timeObject.sec = newVal - this.timeObject.day * 24 * 60 * 60 - this.timeObject.hour * 60 * 60 - this.timeObject.min * 60
    },
    inSession: function(newVal, oldVal) {
      this.timeObject.session = newVal
    }
  },
  methods: {
    formatNumberEvent(e) {
      this.timeObject.day = e.target.value.replace(/[^0-9]/g, '')
      if (this.timeObject.day > this.maxDay) {
        this.timeObject.day = this.maxDay
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  min-width: 50px;
  .el-input__inner {
    padding: 0 10px;
  }
}
.text{  min-width: 35px;}
@media(max-width: 992px) {
  .d-flex{
    margin-bottom: 8px
  }
}

</style>


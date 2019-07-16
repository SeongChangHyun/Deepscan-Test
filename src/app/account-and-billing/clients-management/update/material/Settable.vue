<template>
  <el-row>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" class="content">
      <el-form-item :prop="`${settableType}_${accountAndBillings.LIST_DEVICE.PC}`">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" class="d-flex">
            {{ $t('client.pc') }}
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" class="d-flex">
            <el-input
              v-model="pc.min"
              :disabled="disabledInit"
              :maxlength="accountAndBillings.SETTABLE_MAX_LENGTH"
              @keyup.native.prevent="formatNumberEvent($event, accountAndBillings.PC_MIN)" />
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" class="d-flex justify-content-center">~</el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" class="d-flex">
            <el-input
              v-model="pc.max"
              :disabled="disabledInit"
              :maxlength="accountAndBillings.SETTABLE_MAX_LENGTH"
              @keyup.native.prevent="formatNumberEvent($event, accountAndBillings.PC_MAX)" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12">
      <el-form-item :prop="`${settableType}_${accountAndBillings.LIST_DEVICE.MOBILE}`">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" class="d-flex">
            {{ $t('client.mobile') }}
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" class="d-flex">
            <el-input
              v-model="mobile.min"
              :disabled="disabledInit"
              :maxlength="accountAndBillings.SETTABLE_MAX_LENGTH"
              @keyup.native.prevent="formatNumberEvent($event, accountAndBillings.MOBILE_MIN)" />
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" class="d-flex justify-content-center">~</el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" class="d-flex">
            <el-input
              v-model="mobile.max"
              :disabled="disabledInit"
              :maxlength="accountAndBillings.SETTABLE_MAX_LENGTH"
              @keyup.native.prevent="formatNumberEvent($event, accountAndBillings.MOBILE_MAX)" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
import { AccountAndBillings } from '@/common/constants'

export default {
  name: 'SettableItem',
  props: {
    settable: {
      type: Array,
      default: () => []
    },
    settableType: {
      type: String,
      default: ''
    },
    disabledInit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      accountAndBillings: AccountAndBillings,
      pc: {
        device_type: AccountAndBillings.LIST_DEVICE.PC,
        min: 0,
        max: 0
      },
      mobile: {
        device_type: AccountAndBillings.LIST_DEVICE.MOBILE,
        min: 0,
        max: 0
      }
    }
  },
  watch: {
    settable: function(val) {
      if (val.length === 0) {
        return
      }
      const settableObject = this.getSettableType(this.settable, this.settableType)
      if (Object.entries(settableObject).length === 0 && settableObject.constructor === Object) {
        return
      }
      for (const value of Object.values(settableObject.revenue_range)) {
        if (value.device_type === AccountAndBillings.LIST_DEVICE.PC) {
          this.pc = { ...this.pc, ...value }
        }
        if (value.device_type === AccountAndBillings.LIST_DEVICE.MOBILE) {
          this.mobile = { ...this.mobile, ...value }
        }
      }
    },
    'pc.min': function() {
      this.updateSettable()
    },
    'pc.max': function() {
      this.updateSettable()
    },
    'mobile.min': function() {
      this.updateSettable()
    },
    'mobile.max': function() {
      this.updateSettable()
    }
  },
  methods: {
    getSettableType(settableObject, bidType) {
      if (settableObject.length === 0) {
        return {}
      }
      const settable = settableObject.filter((item) => {
        return item.bid_type === bidType
      })
      if (settable.length > 0) {
        return settable[0]
      }
      return {}
    },
    getIndexOfSettable(settableList) {
      let position = 0
      for (const [key, value] of Object.entries(settableList)) {
        if (value.bid_type === this.settableType) {
          position = key
        }
      }
      return position
    },
    updateSettable() {
      const revenueRangeUpdate = [this.pc, this.mobile]
      const targetObject = Object.assign({}, this.settable)
      const position = this.getIndexOfSettable(targetObject)
      targetObject[position].revenue_range = revenueRangeUpdate
      const convertToArray = Object.keys(targetObject).map(function(key) {
        return targetObject[key]
      })
      this.$emit('update-settable', convertToArray)
    },
    formatNumberEvent(e, type) {
      switch (type) {
        case AccountAndBillings.PC_MIN:
          this.pc.min = Number(e.target.value.replace(/[^0-9]/g, ''))
          break
        case AccountAndBillings.PC_MAX:
          this.pc.max = Number(e.target.value.replace(/[^0-9]/g, ''))
          break
        case AccountAndBillings.MOBILE_MIN:
          this.mobile.min = Number(e.target.value.replace(/[^0-9]/g, ''))
          break
        case AccountAndBillings.MOBILE_MAX:
          this.mobile.max = Number(e.target.value.replace(/[^0-9]/g, ''))
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  .el-input__inner {
    padding: 0 10px;
  }
}
.content{
  padding-bottom: 8px;
  @media(min-width: 760px) {
    padding-bottom: 0;
    padding-right: 20px;
  }
}
</style>


<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field collapse-card">
    <table class="w-100" @click="showContent=!showContent" >
      <tr >
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
          {{ genI18n('title') }}
        </td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ genI18n('description') }}
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'" type="default" class="border-0 p-1 expad-btn"/>
        </td>
      </tr>
    </table>
    <div :class="{ 'show': showContent }" class="el-col-md-18 el-col-sm-18 el-col-xs-24 float-right px-0 content-hide transition-height">
      <div v-show="showContent" class="content-fields">
        <el-select v-model="schedule" class="w-100">
          <el-option
            v-for="(item, index) in ScheduleConst.listSchedule"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <div class="pt-2" >
          <el-row v-for="(item, index) in listDay" :key="index">
            <el-col :xs="8" :md="4">
              {{ item.label }}
            </el-col>
            <el-col :xs="16" :md="20">
              <div class="d-flex flex-wrap hour-block-group w-100">
                <div v-for="(index2) in 23" :key="index2" :class="{ 'active': listDay[index].listTime[index2], 'odd': index2%2!=0 }" class="hour-block" @click="listDay[index].listTime[index2]=!listDay[index].listTime[index2];$forceUpdate()" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="pt-2" >
          <el-row>
            <el-col :xs="8" :md="4">
              {{ allowHour.label }}
            </el-col>
            <el-col :xs="16" :md="20">
              <div class="d-flex flex-wrap hour-block-group w-100">
                <div v-for="(hour) in 23" :key="hour" :class="{ 'active': allowHour.listTime[hour], 'odd': hour%2!=0 }" class="hour-block" @click="pickHours(hour)" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import { Schedule } from '@/common/constants'

export default {
  data() {
    return {
      ScheduleConst: Schedule,
      showContent: false,
      schedule: Schedule.ALWAYS_LIVE,
      allowHour: {
        value: 0,
        label: 'All day',
        listTime: []
      },
      listDay: [
        {
          value: 0,
          label: 'Mon',
          listTime: []
        },
        {
          value: 1,
          label: 'Tue',
          listTime: []
        },
        {
          value: 2,
          label: 'Wed',
          listTime: []
        },
        {
          value: 3,
          label: 'Thu',
          listTime: []
        },
        {
          value: 4,
          label: 'Fri',
          listTime: []
        },
        {
          value: 5,
          label: 'Sat',
          listTime: []
        },
        {
          value: 6,
          label: 'Sun',
          listTime: []
        }
      ]
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.deliverCycle.schedule.${params}`)
    },
    pickHours(hour) {
      this.allowHour.listTime[hour] = !this.allowHour.listTime[hour]
      this.listDay.forEach((day) => {
        day.listTime[hour] = this.allowHour.listTime[hour]
      })
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
  .h-form-input {
    border-bottom: 1px dotted #ddd;
  }
</style>

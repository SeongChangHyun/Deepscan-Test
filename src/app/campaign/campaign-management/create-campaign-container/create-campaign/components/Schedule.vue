<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-select v-model="schedule" class="w-100">
      <el-option
        v-for="(item, index) in ScheduleConst.listSchedule"
        :key="index"
        :value="item.value"
        :label="item.label"
      />
    </el-select>
    <table v-if="schedule === ScheduleConst.LIVE_ACCORDING_TO_SCHEDULE" class="table-time-schedule" @mouseup="mouseUp" @mousedown="mouseDown">
      <tr>
        <th @click="pickAllDay()">{{ genI18n('allDay') }}</th>
        <th
          v-for="(item, index) in listDay"
          :key="index"
          @click="pickDay(index)"
        >{{ genI18n(item.label) }}</th>
      </tr>
      <tr v-for="(hour) in 24" :key="hour">
        <td
          :class="{
            active: listDay.reduce((c,v)=>c && !!v.listTime[hour-1] , true)
          }"
          @click="pickHoursAll(hour-1)"
        >
          <p class="active start end white">{{ allowHour.listTime[hour-1] }} {{ genI18n('hour') }}</p>
        </td>
        <td
          v-for="(item, index) in listDay"
          :key="index"
          :class="{
            'e-resize':isMouseDown ,
            active:item.listTime[hour-1],
            start: !listDay[index - 1] || !listDay[index - 1].listTime[hour-1] ,
            end: !listDay[index + 1] || !listDay[index + 1].listTime[hour-1]
          }"
          @mousedown="mouseDownItem(hour-1, index, !item.listTime[hour-1], `${hour}-${index}` )"
          @mouseover="mouseOver(hour-1, index, !item.listTime[hour-1], `${hour}-${index}`)"
        >
          <div
            v-if="item.listTime[hour-1]"
            :class="{
              dot: true,
              active: true,
              start: !listDay[index - 1] || !listDay[index - 1].listTime[hour-1] ,
              end: !listDay[index + 1] || !listDay[index + 1].listTime[hour-1]
            }"
          />
        </td>
      </tr>
    </table>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { Schedule } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'

export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      isMouseDown: false,
      idMouseDown: '',
      valueOver: true,
      ScheduleConst: Schedule,
      showContent: false,
      schedule: Schedule.ALWAYS_LIVE,
      allowHour: {
        value: 0,
        listTime: [...Array(24)].map((v, i) => moment(i, 'H').format('HH'))
      },
      listDay: [
        {
          value: 1,
          label: 'mon',
          listTime: [...Array(24)].map(v => false)
        },
        {
          value: 2,
          label: 'tue',
          listTime: [...Array(24)].map(v => false)
        },
        {
          value: 3,
          label: 'wed',
          listTime: [...Array(24)].map(v => false)
        },
        {
          value: 4,
          label: 'thu',
          listTime: [...Array(24)].map(v => false)
        },
        {
          value: 5,
          label: 'fri',
          listTime: [...Array(24)].map(v => false)
        },
        {
          value: 6,
          label: 'sat',
          listTime: [...Array(24)].map(v => false)
        },
        {
          value: 0,
          label: 'sun',
          listTime: [...Array(24)].map(v => false)
        }
      ]
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.deliverCycle.schedule.${params}`
      )
    },
    buildFormData() {
      const schedule = []
      this.listDay.forEach(item => {
        item.listTime.forEach((time, index) => {
          if (time) {
            schedule.push(`${item.value}${index < 10 ? `0${index}` : index}`)
          }
        })
      })
      const timeZone = this.$store.getters.user.timezone
      this.dataCreateCampaign.schedule = `${schedule.join(', ')}@${timeZone}`
    },
    pickHours(hour, day, value) {
      this.listDay[day].listTime[hour] = value
      this.buildFormData()
      this.$forceUpdate()
    },
    pickHoursAll(hour) {
      const val = !this.listDay.reduce((c, v) => c && !!v.listTime[hour])
      this.listDay = this.listDay.map((v, k) => {
        v.listTime[hour] = val
        return v
      })
      this.buildFormData()
      this.$forceUpdate()
    },
    pickAllDay() {
      const val = !this.listDay.reduce((c, v) => {
        return v.listTime.reduce((c, v) => {
          return c && !!v
        }, true)
      }, true)
      this.listDay = this.listDay.map((v, k) => {
        v.listTime = v.listTime.map(v => val)
        return v
      })

      this.buildFormData()
      this.$forceUpdate()
    },
    pickDay(day) {
      const val = !this.listDay[day].listTime.reduce((c, v) => {
        return c && !!v
      }, true)
      this.listDay[day].listTime = this.listDay[day].listTime.map(v => val)
      this.buildFormData()
      this.$forceUpdate()
    },
    mouseDown(e) {
      this.isMouseDown = true
    },
    mouseUp(e) {
      this.isMouseDown = false
      this.valueOver = true
    },
    mouseDownItem(hour, day, value, id) {
      this.idMouseDown = id
      this.valueOver = value
      this.pickHours(hour, day, value)
    },
    mouseOver(hour, day, value, id) {
      if (this.isMouseDown && this.idMouseDown !== id) {
        this.pickHours(hour, day, true)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-time-schedule {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
   user-select: none;
  .e-resize{
      cursor: e-resize ;
  }
  th,
  td {
    width: 12.5%;
    border: 1px solid #f2f2f2;
    text-align: center;
    padding: 0;
    cursor: pointer;
    .dot{
      height: 15px;
    }
    .active {
      background: #1b93cd;
      margin: 5px 0px;
      padding: 0;
      line-height: 16px;
      color: #1b93cd;
    }
    .active.start {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      margin-left: 20px;
    }
    .active.end {
      margin-right: 20px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .white {
      color: #fff;
    }
  }

  td.active {
    background: #e9f4fa;
    border-right: 0;
    border-left: 0;
  }
  td.active.start {
    border-left: 1px solid #f2f2f2;
  }
  td.active.end {
    border-right: 1px solid #f2f2f2 !important;
  }
  th {
    background: #e7ebee;
    padding: 5px 0;
  }
}
</style>

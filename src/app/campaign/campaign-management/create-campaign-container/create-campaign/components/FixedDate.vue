<template>
  <el-row class="h-form-input w-100 pt-0 pt-1 fixed-date-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td
          class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title"
        >{{ genI18n('title') }}</td>
        <td
          class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0"
        >{{ genI18n('description') }}</td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button
            :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
            type="default"
            class="border-0 p-1 expad-btn"
          />
        </td>
      </tr>
    </table>
    <div
      :class="{ 'show': showContent }"
      class="el-col-md-18 el-col-sm-18 el-col-xs-24 float-right px-0 content-hide transition-height"
    >
      <div v-show="showContent" class="content-fields">
        <el-row>
          <el-col :xs="24" :md="12" class="pr-2">
            <div>{{ genI18n('allowDates') }}</div>
            <div class="allow-date border p-2">
              <div>
                <div>{{ listAllowDates.length }}</div>
                <div class="list-date">
                  <div v-for="(item, index) in listAllowDates" :key="index">
                    <div class="d-flex pb-1">
                      <div class="flex-grow-1 ml-2">{{ item }}</div>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="removeDate('listAllowDates', item)"
                      >{{ genI18n('delete') }}</el-button>
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <el-date-picker
                    v-model="allowDate"
                    type="datetime"
                    class="flex-grow-1"
                    placeholder="Select date and time"
                  />
                  <el-button type="default" @click="addList('listAllowDates', 'allowDate')">{{ genI18n('choose') }}</el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" class="pr-2">
            <div>{{ genI18n('blockDates') }}</div>
            <div class="block-date border p-2">
              <div>
                <div>{{ listBlockDates.length }}</div>
                <div class="list-date">
                  <div v-for="(item, index) in listBlockDates" :key="index">
                    <div class="d-flex pb-1">
                      <div class="flex-grow-1 ml-2">{{ item }}</div>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="removeDate('listBlockDates', item)"
                      >{{ genI18n('delete') }}</el-button>
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <el-date-picker
                    v-model="blockDate"
                    type="datetime"
                    class="flex-grow-1"
                    placeholder="Select date and time"
                  />
                  <el-button type="default" @click="addList('listBlockDates', 'blockDate')">{{ genI18n('choose') }}</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>
</template>

<script>
import * as moment from 'moment'
import { Common } from '@/common/constants'

export default {
  data() {
    return {
      showContent: false,
      listAllowDates: [],
      listBlockDates: [],
      allowDate: '',
      blockDate: ''
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.deliverCycle.fixedDate.${params}`
      )
    },
    addList(list, time) {
      if (this[time] === '') {
        return
      }
      const constDay = moment(this[time])
      this[list].push(
        `${constDay.format(Common.FORMAT_DATE_YYYY_MM_DD_2)}(${constDay.format(
          Common.FORMAT_DAY
        )})`
      )
      this[time] = ''
    },
    removeDate(list, item) {
      const index = this[list].indexOf(item)
      if (index > -1) {
        this[list].splice(index, 1)
      }
    }
  }
}
</script>

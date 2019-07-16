<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-row>
      <el-col :xs="24" :md="12" class="pr-2">
        <div class="block-checkbox-wrap">
          <div class="allow-title">{{ genI18n('allowDates') }} ({{ listAllowDates.length }})</div>
          <div class="block-checkbox">
            <div class="list-date">
              <div v-for="(item, index) in listAllowDates" :key="index">
                <div class="d-flex pb-1">
                  <div class="flex-grow-1">{{ item }}</div>
                  <svg-icon
                    icon-class="close-button"
                    class="close-btn"
                    @click="removeDate('listAllowDates', item)"
                  />
                </div>
              </div>
            </div>
            <div class="d-flex">
              <el-date-picker
                v-model="allowDate"
                :placeholder="genI18n('selectDatePlaceholder')"
                type="datetime"
                class="flex-grow-1"
              />
              <el-button
                type="default"
                @click="addList('listAllowDates', 'allowDate')"
              >{{ genI18n('choose') }}</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12" class="pr-2">
        <div class="block-checkbox-wrap">
          <div class="allow-title">{{ genI18n('blockDates') }} ({{ listBlockDates.length }})</div>
          <div class="block-checkbox">
            <div class="list-date">
              <div v-for="(item, index) in listBlockDates" :key="index">
                <div class="d-flex pb-1">
                  <div class="flex-grow-1">{{ item }}</div>
                  <svg-icon
                    icon-class="close-button"
                    class="close-btn"
                    @click="removeDate('listBlockDates', item)"
                  />
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
              <el-button
                type="default"
                @click="addList('listBlockDates', 'blockDate')"
              >{{ genI18n('choose') }}</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import * as moment from 'moment'
import { mapState } from 'vuex'
import uniqBy from 'lodash/uniqBy'
import { Common, CampaignManagementConstants } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      listAllowDates: [],
      listBlockDates: [],
      allowDate: '',
      blockDate: ''
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  watch: {
    listAllowDates: {
      handler: function(val) {
        this.buildFormData(CampaignManagementConstants.VERIFY_TYPE.ALLOW.toUpperCase(), val)
      },
      deep: true
    },
    listBlockDates: {
      handler: function(val) {
        this.buildFormData(CampaignManagementConstants.VERIFY_TYPE.BLOCK.toUpperCase(), val)
      },
      deep: true
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.deliverCycle.fixedDate.${params}`
      )
    },
    buildFormData(type, list) {
      const timeZone = this.$store.getters.user.timezone
      const convertedList = list.map(item => {
        return {
          status: type,
          date_time: `${moment(item).format('YYYYMMDD')}@${timeZone}`
        }
      })
      this.dataCreateCampaign.fixed_date = uniqBy([...this.dataCreateCampaign.fixed_date, ...convertedList], item => {
        return item.date_time
      })
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
<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
}

.allow-os {
  padding-right: 5px;
}

.block-os {
  padding-left: 5px;
}

.text-right {
  text-align: right;
}
.margin-bottom-10 {
  margin-bottom: 5px;
  margin-top: 5px;
}
.block-checkbox-wrap {
  border: 1px solid #e8ebee;
  border-collapse: collapse;
}
.list-date {
  padding: 10px;
}
.flex-1 {
  flex: 1;
  display: flex;
}
.device-name {
    flex: 2;
}
.colFrom {
  flex: 1;
}
.colTilde {
  flex: 1;
  text-align: center;
}
.colTo {
  flex: 1;
}
.allow-title {
  background-color: #e8ebee;
  width: 100%;
  height: 40px;
  border-block-end: 1px solid #cccccc;
  align-items: center;
  padding: 10px;
  font-weight: bold;
}
.fw-bold {
  font-weight: 600;
}
.el-button {
  border-radius: 0;
  border: 0;
  background-color: #1d93cf;
  color: #fff;
  font-weight: bold;
}
/deep/.el-input__inner {
  border: 0;
  border-top: 1px solid #dcdfe6;
}
@media only screen and (max-width: 768px) {
  .block-checkbox-wrap  {
    margin-top: 10px;
  }
}
</style>

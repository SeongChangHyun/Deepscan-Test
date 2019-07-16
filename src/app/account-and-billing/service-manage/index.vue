<template>
  <div class="service-manage">
    <div class="service-list">
      <el-collapse v-model="activeServices">
        <el-collapse-item :name="services[4]" class="support-menu">
          <template slot="title" class="collapse-panel">
            <div class="text-title">
              <b>{{ $t('serviceManage.allAccount') }}</b>
              {{ $t('serviceManage.extraText') }}
            </div>
          </template>
          <el-col v-for="(item, index) in listSuportMenuCheckbox" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8">
            <el-checkbox v-if="item.group === types.clients" :label="$t('serviceManage.' + item.label)" :checked="item.checked" @change="changeCheckBoxSupportMenu(index)"/>
          </el-col>
        </el-collapse-item>
        <el-collapse-item :name="services[0]" class="support-menu">
          <template slot="title" class="collapse-panel">
            <div class="text-title">
              <b>{{ $t('serviceManage.supportMenu') }}</b>
              {{ $t('serviceManage.extraText') }}
            </div>
          </template>
          <el-col v-for="(item, index) in listSuportMenuCheckbox" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8">
            <el-checkbox v-if="item.group === types.client" :label="$t('serviceManage.' + item.label)" :checked="item.checked" @change="changeCheckBoxSupportMenu(index)"/>
          </el-col>
        </el-collapse-item>
        <el-collapse-item :name="services[1]" class="support-goal-targeting-type">
          <template slot="title">
            <div class="text-title">
              <b>{{ $t('serviceManage.supportGoalTargeting') }}</b>
              {{ $t('serviceManage.extraText') }}
            </div>
          </template>
          <el-checkbox-group v-model="supportGoalTargetBrandingCheckList">
            <el-row v-for="items in supportGoalTargetBranding" :key="items.id" class="items-row">
              <el-col v-for="item in items" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="item.width">
                <el-checkbox :label="item.label" :disabled="item.disable" class="align-bottom"/>
              </el-col>
            </el-row>
          </el-checkbox-group>

          <el-checkbox-group v-model="supportGoalTargetTrafficCheckList">
            <el-row v-for="items in supportGoalTargetTraffic" :key="items.id" class="items-row">
              <el-col v-for="item in items" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="item.width">
                <el-checkbox :label="item.label" :disabled="item.disable" class="align-bottom"/>
              </el-col>
            </el-row>
          </el-checkbox-group>

          <el-checkbox-group v-model="supportGoalTargetRententionCheckList">
            <el-row v-for="items in supportGoalTargetRentention" :key="items.id" class="items-row">
              <el-col v-for="item in items" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="item.width">
                <el-checkbox :label="item.label" :disabled="item.disable" class="align-bottom"/>
              </el-col>
            </el-row>
          </el-checkbox-group>

          <el-checkbox-group v-model="supportGoalTargetConversionCheckList">
            <el-row v-for="items in supportGoalTargetConversion" :key="items.id" class="items-row">
              <el-col v-for="item in items" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="item.width" class="row-col">
                <el-checkbox :label="item.label" :disabled="item.disable" class="align-bottom"/>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item :name="services[2]" class="support-option">
          <template slot="title">
            <div class="text-title">
              <b>{{ $t('serviceManage.supportOption') }}</b>
              {{ $t('serviceManage.extraText') }}
            </div>
          </template>
          <el-checkbox-group v-model="supportOptionCheckList">
            <el-row v-for="items in supportOptionLabelName" :key="items.id" class="items-row">
              <el-col v-for="item in items" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="item.width" class="row-col">
                <el-checkbox :label="item.label" :disabled="item.disable" class="align-bottom"/>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item :name="services[3]" class="performance-support-index">
          <template slot="title">
            <div class="text-title">
              <b>{{ $t('serviceManage.supportPerformance') }}</b>
              {{ $t('serviceManage.extraText') }}
            </div>
          </template>
          <el-checkbox-group v-model="performanceSupportCheckList">
            <el-row v-for="items in supportPerformanceLabelName" :key="items.id" class="items-row">
              <el-col v-for="item in items" :key="item.id" :xs="24" :sm="12" :md="12" :lg="8" :xl="item.width" class="row-col">
                <el-checkbox :label="item.label" :disabled="item.disable" class="align-bottom"/>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="buttons">
      <el-button type="primary" class="save-btn" @click="save">{{ $t('serviceManage.save') }}</el-button>
      <el-button type="primary" class="reset-btn" @click="dialogVisible = true">{{ $t('serviceManage.reset') }}</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{ $t('serviceManage.messageReset') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('serviceManage.noBtn') }}</el-button>
        <el-button type="primary" @click="reset">{{ $t('serviceManage.yesBtn') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ServiceManage from './ServiceManage'
export default ServiceManage
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
@import './style.scss';
</style>

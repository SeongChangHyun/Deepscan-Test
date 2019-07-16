<template>
  <div class="content-wrapper">
    <div :class="isLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
      <list-loader :speed="2" :animate="true"/>
    </div>
    <el-form
      ref="updateClientForm"
      :model="updateClientForm"
      :rules="updateClientRules"
      class="content-under-loading update-client-form"
      auto-complete="on"
      label-position="left"
      label-width="150px"
    >
      <!-- Item 6 -->
      <el-form-item :label="$t('client.validImpression')+':'">
        <valid-time
          :time-value="updateClientForm.valid_impression_period"
          :in-session="updateClientForm.valid_impression_in_session"
          :disabled-init="!getRoleClient('valid_impression_period.edit')"
          @change-time-seconds="updateValidType(accountAndBillings.VALID_IMPRESSION_PERIOD, $event)"/>
      </el-form-item>

      <!-- Item 7 -->
      <el-form-item :label="$t('client.validClick')+':'">
        <valid-time
          :time-value="updateClientForm.valid_click_period"
          :in-session="updateClientForm.valid_click_in_session"
          :disabled-init="!getRoleClient('valid_click_period.edit')"
          @change-time-seconds="updateValidType(accountAndBillings.VALID_CLICK_PERIOD, $event)"/>
      </el-form-item>

      <!-- Item 8 -->
      <el-form-item :label="$t('client.validPlay')+':'">
        <valid-time
          :time-value="updateClientForm.valid_play_period"
          :in-session="updateClientForm.valid_play_in_session"
          :disabled-init="!getRoleClient('valid_play_period.edit')"
          @change-time-seconds="updateValidType(accountAndBillings.VALID_PLAY_PERIOD, $event)"/>
      </el-form-item>

      <!-- Item 9 -->
      <el-form-item :label="$t('client.conversionUserControl')+':'">
        <el-select
          v-model="conversionUserSelect"
          :disabled="!getRoleClient('conversion_user_control.edit')"
          class="w-100 conversion-user-control"
        >
          <el-option
            v-for="(item, index) in accountAndBillings.LIST_CONVERSION_USER_CONTROL"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <valid-time
          v-show="conversionUserSelect !== 0"
          :time-value="updateClientForm.conversion_user_control"
          :max-day="540"
          :hide-session="true"
          :disabled-init="!getRoleClient('conversion_user_control.edit')"
          @change-time-seconds="updateClientForm.conversion_user_control = $event"/>
      </el-form-item>

      <!-- Item 10 -->

      <!-- Item 11 -->
      <el-form-item :label="$t('client.userCollectControl')+':'">
        <el-select
          v-model="updateClientForm.user_collect_control"
          :disabled="!getRoleClient('user_collect_control.edit')"
          class="w-100"
        >
          <el-option
            v-for="(item) in accountAndBillings.LIST_USER_COLLECT_CONTROL"
            :key="item"
            :value="item * 24 *60 * 60"
            :label="item + ' ' + $t('client.day')"
          />
        </el-select>
      </el-form-item>

      <!-- Item 12 -->
      <el-form-item :label="$t('client.mediaExtension')+':'">
        <el-checkbox-group v-model="updateClientForm.media_extension" class="media-extension">
          <el-checkbox v-if="getRoleClient('mediaExtension.m.view')" key="1" :disabled="!getRoleClient('mediaExtension.m.edit')" label="m">{{ $t('client.Adlib') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.g.view')" key="2" :disabled="!getRoleClient('mediaExtension.g.edit')" label="g" >{{ $t('client.GDN') }}</el-checkbox>
          <br>
          <el-checkbox v-if="getRoleClient('mediaExtension.b.view')" key="3" :disabled="!getRoleClient('mediaExtension.b.edit')" label="b" >{{ $t('client.Baidu') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.t.view')" key="4" :disabled="!getRoleClient('mediaExtension.t.edit')" label="t" >{{ $t('client.Taboola') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.a.view')" key="5" :disabled="!getRoleClient('mediaExtension.a.edit')" label="a" >{{ $t('client.Smaato') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.i.view')" key="6" :disabled="!getRoleClient('mediaExtension.i.edit')" label="i" >{{ $t('client.Inmobi') }}</el-checkbox>
          <br>
          <el-checkbox v-if="getRoleClient('mediaExtension.d.view')" key="7" :disabled="!getRoleClient('mediaExtension.d.edit')" label="d" >{{ $t('client.Daumkakao') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.c.view')" key="8" :disabled="!getRoleClient('mediaExtension.c.edit')" label="c" >{{ $t('client.Microad') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.f.view')" key="9" :disabled="!getRoleClient('mediaExtension.f.edit')" label="f" >{{ $t('client.Fluct') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.s.view')" key="10" :disabled="!getRoleClient('mediaExtension.s.edit')" label="s" >{{ $t('client.Bidswitch') }}</el-checkbox>
          <el-checkbox v-if="getRoleClient('mediaExtension.e.view')" key="11" :disabled="!getRoleClient('mediaExtension.e.edit')" label="e" >{{ $t('client.Admixer') }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- Item 13 -->
      <el-form-item :label="$t('client.IPBlocking')+':'" prop="ip_blocking">
        <el-input
          v-model="ipBlocking"
          :disabled="!getRoleClient('ip_blocking.edit')"
          placeholder=""
          name="ip_blocking"
        />
      </el-form-item>

      <!-- Item 14 -->
      <el-form-item :label="$t('client.HCUID')+':'">
        <el-select
          v-model="updateClientForm.hcuid_control"
          :disabled="!getRoleClient('hcuid_control.edit')"
          class="w-100"
        >
          <el-option
            v-for="(item) in accountAndBillings.LIST_HCUID"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <!-- Item 15 -->
      <el-form-item :label="$t('client.settableCPC')+':'">
        <settable-item
          :settable="updateClientForm.settable"
          :settable-type="accountAndBillings.LIST_SETTABLE_OBJECT.CPC"
          :disabled-init="!getRoleClient('settable.edit')"
          @update-settable="updateClientForm.settable = $event"/>
      </el-form-item>

      <!-- Item 16 -->
      <el-form-item :label="$t('client.settableCPM')+':'">
        <settable-item
          :settable="updateClientForm.settable"
          :settable-type="accountAndBillings.LIST_SETTABLE_OBJECT.CPM"
          :disabled-init="!getRoleClient('settable.edit')"
          @update-settable="updateClientForm.settable = $event"/>
      </el-form-item>

      <!-- Item 17 -->
      <el-form-item :label="$t('client.settableCPVc')+':'">
        <settable-item
          :settable="updateClientForm.settable"
          :settable-type="accountAndBillings.LIST_SETTABLE_OBJECT.CPVC"
          :disabled-init="!getRoleClient('settable.edit')"
          @update-settable="updateClientForm.settable = $event"/>
      </el-form-item>

      <!-- Item 18 -->
      <el-form-item :label="$t('client.settableCPMg')+':'">
        <settable-item
          :settable="updateClientForm.settable"
          :settable-type="accountAndBillings.LIST_SETTABLE_OBJECT.CPMG"
          :disabled-init="!getRoleClient('settable.edit')"
          @update-settable="updateClientForm.settable = $event"/>
      </el-form-item>

      <!-- Item 19 -->
      <el-form-item :label="$t('client.settableCPI')+':'">
        <settable-item
          :settable="updateClientForm.settable"
          :settable-type="accountAndBillings.LIST_SETTABLE_OBJECT.CPI"
          :disabled-init="!getRoleClient('settable.edit')"
          @update-settable="updateClientForm.settable = $event"/>
      </el-form-item>

      <!-- Item 20 -->
      <el-form-item :label="$t('client.settableCPA')+':'">
        <settable-item
          :settable="updateClientForm.settable"
          :settable-type="accountAndBillings.LIST_SETTABLE_OBJECT.CPA"
          :disabled-init="!getRoleClient('settable.edit')"
          @update-settable="updateClientForm.settable = $event"/>
      </el-form-item>

      <!-- Item 21 -->
      <el-form-item v-if="getRoleClient('rta.view')" :label="$t('client.rta')+':'">
        <el-select
          v-model="updateClientForm.rta"
          :disabled="!getRoleClient('rta.edit')"
          class="w-100"
        >
          <el-option
            v-for="(item, index) in accountAndBillings.LIST_RTA"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <!-- Item 22 -->
      <el-form-item :label="$t('client.privacy')+':'">
        <el-input
          v-model="updateClientForm.privacy"
          :disabled="!getRoleClient('privacy.edit')"
          :rows="5"
          placeholder=""
          name="privacy"
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import updateClientsController from './UpdateClientsForm'
export default updateClientsController
</script>

<style lang="scss" scoped>
.update-client-form {
  .conversion-user-control {
    margin-bottom: 20px;
  }
  .media-extension {
    /deep/ .el-checkbox {
      margin-left: 0px;
      margin-right: 30px;
    }
  }
}
/deep/ .el-form-item__label{
  padding-right: 10px !important;
}
.mg-b-10{
  margin-bottom: 10px;
}
/deep/ .el-checkbox__label{
  min-width: 90px;
}
@media(max-width: 768px) {
  /deep/ .el-form-item__label {
    float: none;
  }
  /deep/ .el-form-item__content{
    margin-left: 0 !important;
  }
  .status {
    top: 19px;
  }
}
</style>


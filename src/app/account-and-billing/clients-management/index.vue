<template>
  <div class="client-management list">
    <el-row class="action-row">
      <el-button type="primary" class="btn-create" icon="el-icon-edit-outline" @click="goto('/account-and-billing/clients-management/create')">
        {{ $t('client.createClient') }}
      </el-button>

      <el-button :disabled="selectedItems.length===0" class="btn-delete" type="default" @click="updateStatusClients(clientManagement.ENABLE_CLIENT)" >
        <svg-icon icon-class="client-enabled" class="client-enabled"/>
        {{ $t('client.enableClient') }}
      </el-button>

      <el-button :disabled="selectedItems.length===0" class="btn-delete" type="default" @click="updateStatusClients(clientManagement.STOP_CLIENT)" >
        <svg-icon icon-class="client-disabled" class="client-stop"/>
        {{ $t('client.stopClient') }}
      </el-button>

      <div class="group-per-page">
        <div class="group-btn-show">
          <span :class="[dataPost.status !== clientManagement.ENABLE_CLIENT || (dataPost.total + clientHiddenNumber) === 0 ? 'disabled' : '', 'show-all-status']" @click="showAllClientStatus()">
            <svg-icon icon-class="view-files" class="icon-show-hide"/>
            {{ $t('client.show') }}
          </span>
          <span class="text-gray">|</span>
          <span :class="[dataPost.status === clientManagement.ENABLE_CLIENT || (dataPost.total + clientHiddenNumber) === 0 ? 'disabled' : '', 'show-enable-status']" @click="showEnableClientStatus()">
            <svg-icon icon-class="eye-off" class="icon-show-hide"/>
            {{ $t('client.hide') }}
          </span>
          <span class="client-hidden-number">{{ clientHiddenNumber }} {{ $t('client.clientHiddenNumber') }}</span>
        </div>

        <el-select v-model="dataPost.limit" :disabled="dataPost.total === 0" class="select-per-page" @change="handleSizePageChange">
          <el-option
            v-for="(item, index) in pageSizes"
            :key="index"
            :value="item"
            :label="`${item} rows`"
          />
        </el-select>
      </div>

    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          :class="tableData.length > 0 ? 'w-100 list-client' : 'w-100 list-client no-data'"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            :selectable="selectable"
            :type="selectable ? 'selection' : 'default'"
            class-name="client-no-checkbox"
            align="center"
            width="55" />
          <el-table-column
            v-for="(item, index) in tableHeaders"
            :key="index"
            :label="item.label"
            :min-width="getWidthCol(item.prop)"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="item.prop===clientNo">
                <router-link :to="{name: 'UpdateClient', params: {client_id: scope.row[item.prop]}}">
                  {{ scope.row[item.prop] }}
                </router-link>
              </span>
              <span v-else-if="item.prop===paymentType">
                {{ showPaymentType(scope.row[item.prop]) }}
              </span>
              <span v-else-if="item.prop===statusCode">
                {{ showClientStatus(scope.row[item.prop]) }}
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          v-if="dataPost.total >= dataPost.limit"
          :total="dataPost.total"
          :current-page.sync="dataPost.page"
          :page-size="dataPost.limit"
          layout="prev, pager, next"
          class="pagination-custom"
          @size-change="handleCurrentChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import clientsManagementController from './ClientsManagement'
export default clientsManagementController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './ClientsManagement.scss'
</style>

<template>
  <div class="client-management list">
    <el-row class="pb-3">
      <el-col>
        <el-button type="primary" icon="el-icon-plus" @click="goto('/account-and-billing/clients-management/create')">
          {{ $t('client.createClient') }}
        </el-button>
        <el-button :disabled="selectedItems.length===0" type="default" icon="el-icon-delete" @click="onDeleteItems">
          {{ $t('client.deleteClient') }}
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          border
          class="w-100"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
            width="55" />
          <el-table-column
            v-for="(item, index) in tableHeaders"
            :key="index"
            :label="item.label"
          >
            <template slot-scope="scope">
              <span v-if="item.prop==='client_no'"><a href="/account-and-billing/clients-management">{{ scope.row[item.prop] }}</a></span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="d-flex mt-3">
          <div>
            <span>{{ $t('client.showRow') }}:</span>
            <el-select v-model="dataPost.itemPerPage" class="select-per-page" @change="handleSizeChange">
              <el-option
                v-for="(item, index) in pageSizes"
                :key="index"
                :value="item"
                :label="item"
              />
            </el-select>
          </div>
          <el-pagination
            :total="dataPost.total"
            :current-page.sync="dataPost.page"
            :page-size="dataPost.itemPerPage"
            layout="prev, pager, next"
            class="ml-2"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
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

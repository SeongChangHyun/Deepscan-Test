<template>
  <div class="creative-container">
    <div class="creative-table-action"/>
    <el-row class="searchRow">
      <div class="filterAction">
        <el-select v-model="filterSize" placeholder="Size" filterable change-on-select clearable class="selectItem">
          <el-option v-for="item in list_size" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-select
          v-model="filterStatus"
          placeholder="Status"
          filterable
          change-on-select
          clearable
        >
          <el-option v-for="item in list_status" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-select
          v-model="filterCreative"
          placeholder="Creative"
          filterable
          change-on-select
          clearable
        >
          <el-option v-for="item in list_creative" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-button type="info" @click="onReset">{{ $t('creatives.common.reset') }}</el-button>
      </div>
      <div class="searchAction">
        <div class="searchInput">
          <autocomplete-search
            :source="tableData"
            :keyexpr="keyExpr"
            :displayexpr="displayExpr"
            :headersearch="false"
            @onSearchResult="onSearchResult"
          />
        </div>
        <el-button
          type="info"
        >{{ $t('creatives.creativeManagement.listCreative.clearCache') }}</el-button>
      </div>
    </el-row>
    <div class="table">
      <div class="creative-table-list">
        <el-button-group>
          <el-button class="button-black" @click="toCreate">{{ $t('creatives.common.create') }}</el-button>
          <el-button class="button-black" @click="onDelete">{{ $t('creatives.common.delete') }}</el-button>
          <el-button class="button-black" @click="onActivate">{{ $t('creatives.common.activate') }}</el-button>
          <el-button
            class="button-black"
            @click="onDeactivate"
          >{{ $t('creatives.common.deActivate') }}</el-button>
        </el-button-group>
      </div>
      <div class="creative-table-list">
        <el-table
          ref="creativeGridData"
          :data="filerData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30"/>
          <template v-if="columns.length">
            <template v-for="column in columns">
              <el-table-column
                v-if="column.prop === 'status'"
                :key="column.prop"
              >
                <template slot-scope="scope">
                  <i :style="getStatusStyle(scope.row)" class="el-icon-success"/>
                </template>
              </el-table-column>
              <el-table-column
                v-else-if="column.prop === 'name'"
                :key="column.prop"
              >
                <template slot-scope="scope">
                  <a :href="'#/creatives/'+scope.row.id+'/update-creative'">{{ scope.row.name }}</a>
                </template>
              </el-table-column>
              <el-table-column v-else v-bind="column" :key="column.prop"/>
            </template>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import listCreativeController from './ListCreatives'
export default listCreativeController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./ListCreatives.scss";
</style>

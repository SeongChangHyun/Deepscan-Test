<template>
  <div class="creatives-ci-container">
    <div class="grid-content bg-purple-light">
      <div class="action-table">
        <filters-action
          :on-select-size="onSelectSize"
          :on-select-status="onSelectStatus"
          :on-reset-filter="onResetFilter"
          :filter-by-size-options="filterBySizeOptions"
          :on-search-result="onSearchResult"
          :search-source="originalListCi"
        />
        <div class="creative-table-list">
          <el-button-group>
            <el-button class="button-black" @click="onCreate">{{ $t('creatives.ci.create') }}</el-button>
            <el-button v-if="isShownButton" :disabled="isDisabledButton" class="button-black" @click="onDelete">{{ $t('creatives.ci.delete') }}</el-button>
            <el-button v-if="isShownButton" :disabled="isDisabledButton" class="button-black" @click="onActivate">{{ $t('creatives.ci.activate') }}</el-button>
            <el-button v-if="isShownButton" :disabled="isDisabledButton" class="button-black" @click="onDeactivate">{{ $t('creatives.ci.deActivate') }}</el-button>
          </el-button-group>
          <el-table
            ref="filterTable"
            :data="listCi"
            :default-sort = "{prop: 'name', order: 'ascending'}"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="30"/>
            <template v-if="columns.length">
              <template v-for="column in columns">

                <el-table-column v-if="column.prop === 'status'" :key="column.prop" v-bind="column">
                  <template slot-scope="scope">
                    <i :style="getStatusStyle(scope.row)" class="el-icon-success"/>
                  </template>
                </el-table-column>

                <el-table-column v-else-if="['basicCi', 'auxiliaryCi'].includes(column.prop)" :key="column.prop" v-bind="column">
                  <template slot-scope="scope">
                    <img :src="scope.row.basicCi" class="panThumb">
                  </template>
                </el-table-column>

                <el-table-column v-else v-bind="column" :key="column.prop" />

              </template>
            </template>
          </el-table>
          <pagination v-bind="paginationOptions"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListCiController from './ListCI'
export default ListCiController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>

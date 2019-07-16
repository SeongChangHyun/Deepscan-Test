<template>
  <div class="creatives-ci-container">
    <filters-action
      :on-select-size="onSelectSize"
      :on-select-status="onSelectStatus"
      :on-reset-filter="onResetFilter"
      :filter-by-size-options="filterBySizeOptions"
      :search-source="listCi"
      @show-search-result="showSearchResult"
    />
    <div class="table">
      <el-row type="flex" justify="space-between" class="table-action">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="group-action">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="create-delete-group">
            <el-col :span="12" class="create-action">
              <el-button class="btn-create" @click="onCreate">
                <img src="@/assets/icon/ion-compose-Ionicons.png" class="icon icon-create">
                <span class="text-btn text-create">{{ $t('creatives.common.create') }}</span>
              </el-button>
            </el-col>
            <el-col :span="12" class="delete-action">
              <el-button :class="isShownButton ? 'btn-delete' : 'btn-disabled'" :disabled="isDisabledButton" @click="onDelete">
                <img src="@/assets/icon/delete-active-material.png" class="icon icon-delete">
                <span class="text-btn text-delete">{{ $t('creatives.common.delete') }}</span>
              </el-button>
            </el-col>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="activate-deactive-group">
            <el-col :span="12" class="activate-action">
              <el-button :class="isShownButton ? 'btn-activate' : 'btn-disabled'" :disabled="(isDisabledButton || ciStatus === 'Enable')" @click="onActivate">
                <img src="@/assets/icon/icon.png" class="icon icon-activate">
                <span class="text-btn text-activate">{{ $t('creatives.common.activate') }}</span>
              </el-button>
            </el-col>
            <el-col :span="12" class="deactivate-action">
              <el-button :class="isShownButton ? 'btn-deactivate' : 'btn-disabled'" :disabled="(isDisabledButton|| ciStatus === 'Stop' || ciStatus === 'Disable')" @click="onDeactivate">
                <img src="@/assets/icon/pause_circle_outline_material_active.png" class="icon icon-deactivate">
                <span class="text-btn text-deactivate">{{ $t('creatives.common.deActivate') }}</span>
              </el-button>
            </el-col>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="select-action">
          <el-col :xs="24" :sm="12" :md="12" :lg="15" :xl="15" class="select-title">
            <span>{{ $t('creatives.creativeManagement.listCreative.select_row_des') }}</span>
          </el-col>
          <el-col :xs="24" :sm="10" :md="12" :lg="9" :xl="9" class="select-item">
            <el-select v-model="rowSelected" filterable class="select-item-value" @change="onSelectNumRow">
              <el-option v-for="item in listRow" :key="item.key" :label="item.key" :value="item.value"/>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <div class="creative-table-list">
        <el-table ref="filterTable" :data="paginatedData" :default-sort="CreativeConstant.SORT_LIST_CREATIVE" @selection-change="handleSelectionChange">
          <el-table-column :min-width="checkBoxColumnWidth" type="selection" align="center" class-name="checkbox-column" />
          <template v-if="columns.length">
            <template v-for="column in columns">
              <el-table-column v-if="column.prop === checkStatus" :key="column.prop" v-bind="column" :min-width="column.minwidth" align="center" class-name="status-column">
                <template slot-scope="scope">
                  <i :style="getStatusStyle(scope.row)" class="el-icon-success"/>
                </template>
              </el-table-column>

              <el-table-column v-else-if="['basicCi', 'auxiliaryCi'].includes(column.prop)" :key="column.prop" v-bind="column" :min-width="column.minwidth" align="center" class-name="image-column">
                <template slot-scope="scope">
                  <img :src="scope.row.basicCi" class="pan-thumb">
                </template>
              </el-table-column>

              <el-table-column v-else v-bind="column" :key="column.prop" :min-width="column.minwidth" align="center" class-name="data-column"/>
            </template>
          </template>
        </el-table>
      </div>
      <pagination v-bind="paginationOptions" @pagination="handlePagging"/>
    </div>
  </div>
</template>
<script>
import ListCiController from './ListCI'
export default ListCiController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

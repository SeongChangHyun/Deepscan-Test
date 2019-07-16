<template>
  <div class="creative-container">
    <div class="creative-table-action"/>
    <el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="searchRow">
      <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mr-bt-10">
          <el-col :span="12">
            <el-select
              v-model="filterSize"
              :placeholder="$t('creatives.creativeManagement.listCreative.sizePlaceholder')"
              filterable
              change-on-select
              clearable
              class="selectItem mr-r-20"
            >
              <el-option v-for="(item, index) in list_size" :key="index" :label="`${item.width}x${item.height}`" :value="`${item.width}x${item.height}`"/>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="filterStatus"
              :placeholder="$t('creatives.creativeManagement.listCreative.statusPlaceholder')"
              filterable
              change-on-select
              clearable
              class="mr-r-21"
            >
              <el-option v-for="item in list_status" :key="item.id" :label="item.label" :value="item.value"/>
            </el-select>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mr-bt-10">
          <el-col :span="12">
            <el-select
              v-model="filterCreative"
              :placeholder="$t('creatives.creativeManagement.listCreative.campaignPlaceholder')"
              filterable
              change-on-select
              clearable
              class="mr-r-20"
            >
              <el-option v-for="item in list_creative" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-button
              type="info"
              class="resetBtn"
              @click="onReset"
            >{{ $t('creatives.common.reset') }}</el-button>
          </el-col>
        </el-col>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="searchAction">
        <el-col :xs="15" :sm="18" :md="18" :lg="18" :xl="18" class="searchInput">
          <el-col :span="20">
            <el-input :placeholder="$t('creatives.creativeManagement.listCreative.search_placeholder')"/>
          </el-col>
          <el-col :span="4" class="iconSearch">
            <img src="@/assets/icon/search-icon.png">
          </el-col>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="btnResetCache">
          <el-button
            type="info"
            class="resetCacheBtn"
          >{{ $t('creatives.creativeManagement.listCreative.clearCache') }}</el-button>
        </el-col>
      </el-col>
    </el-row>
    <div class="table">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" class="rowAction">
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="mr-bt-10 pd-r-5">
            <button class="btnCreate" @click="toCreate">
              <img src="@/assets/icon/ion-compose-Ionicons.png" class="iconActivate">
              <span class="btnText">{{ $t('creatives.common.create') }}</span>
            </button>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="mr-bt-10 pd-l-5">
            <button class="btnDelete" @click="onDelete">
              <img src="@/assets/icon/delete-material.png" class="iconActivate">
              <span class="btnTextDelete">{{ $t('creatives.common.delete') }}</span>
            </button>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="mr-bt-10 pd-r-5">
            <button class="btnDelete" @click="onActivate">
              <img src="@/assets/icon/icon-activation.png" class="iconActivate">
              <span class="btnTextDelete">{{ $t('creatives.common.activate') }}</span>
            </button>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="mr-bt-10 pd-l-5">
            <button class="btnDelete" @click="onDeactivate">
              <img src="@/assets/icon/pause_circle_outline-material.png" class="iconActivate">
              <span class="btnTextDelete">{{ $t('creatives.common.deActivate') }}</span>
            </button>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="16" class="selectRow">
          <span class="selectTitle">{{ $t('creatives.creativeManagement.listCreative.select_row_des') }}</span>
          <el-select
            v-model="rowSelected"
            filterable
            change-on-select
            clearable
            class="selectRowValue"
          >
            <el-option v-for="item in list_row" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-col>
      </el-row>
      <div class="creative-table-list">
        <el-table
          ref="creativeGridData"
          :data="filerData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="35"/>
          <template v-if="columns.length">
            <template v-for="column in columns">
              <el-table-column
                v-if="column.prop === 'approve_status'"
                v-bind="column"
                :key="column.prop"
                width="90"
              >
                <template slot-scope="scope">
                  <i :style="getStatusStyle(scope.row)" class="el-icon-success"/>
                </template>
              </el-table-column>
              <el-table-column
                v-else-if="column.prop === 'creative_name'"
                v-bind="column"
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
      <div>
        <pagination v-bind="paginationOptions" class="pagination"/>
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

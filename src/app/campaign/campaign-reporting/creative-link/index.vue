<template>
  <div class="creative-link-container">
    <div class="top-container">
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="8">
          <div class="campaign-info">
            <div>{{ `${$t('creativeLink.targetingGoal')}: ${campaign.goalName}` }}</div>
            <div>{{ `${$t('creativeLink.targetingType')}: ${campaign.type}` }}</div>
            <div>{{ `${$t('creativeLink.adGroupName')}: ${campaign.adGroupName}` }}</div>
            <div>{{ `${$t('creativeLink.campaignName')}: ${campaign.name}` }}</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="16">
          <el-table
            :data="linkedMatrix"
            class="top-table"
            border
            style="width: 100%">
            <el-table-column
              property="name"
              label=""/>
            <template v-for="column in columns">
              <el-table-column
                :key="column"
                :label="column">
                <template slot-scope="scope">
                  <span v-if="scope.row[column] === true">
                    <i class="el-icon-close"/>
                  </span>
                  <span v-else>
                    <i class="el-icon-check"/>
                  </span>
                </template>

              </el-table-column>
            </template>

          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="bottom-container">
      <div class="actions-bar">
        <div class="description"><strong>{{ $t('creativeLink.createList') }}</strong> - {{ $t('creativeLink.createListDescription') }}</div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-button-group>
              <el-button class="button-black">{{ $t('creativeLink.linkCampaignWithCreatives') }}</el-button>
              <el-button class="button-black" @click="goToLinkCreativesWithACampaign">{{ $t('creativeLink.linkCreativesWithACampaign') }}</el-button>
            </el-button-group>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="right-group-actions">
            <div class="search-filters">
              <div class="search">
                <autocomplete-search :source="searchCreativeSource" :keyexpr="keyExpr" :displayexpr="displayExpr" :headersearch="false" @onSearchResult="onSearchCreativeResult" />
              </div>
              <div class="filters">
                <el-select v-model="filterByStatusSelected" clearable filterable @change="onSelectStatus">
                  <el-option
                    v-for="item in filterByStatusOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table
        ref="multipleTable"
        :data="creatives"
        style="width: 100%"
        @selection-change="handleCreativeSelectionChange">
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          :label="$t('creativeLink.labelStatus')">
          <template slot-scope="scope">
            <i :style="getStatusStyle(scope.row.status)" class="el-icon-success"/>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('creativeLink.labelName')"
          property="banner_name"
        />
        <el-table-column
          :label="$t('creativeLink.labelType')"
          property="creative_type"
        />
        <el-table-column
          :label="$t('creativeLink.labelSize')"
          property="size" />
        <el-table-column
          :label="$t('creativeLink.labelPreview')"
          property="url"
          show-overflow-tooltip />
        <el-table-column
          :label="$t('creativeLink.labelBackgroundColor')">
          <template slot-scope="scope">
            <div :style="{ 'background-color': scope.row.background_color }" class="bgd-color">
              <span>{{ scope.row.background_color }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('creativeLink.labelLinkedCampaignCount')"
          property="linked_campaign_cnt"
        />
        <el-table-column
          :label="$t('creativeLink.labelInspectionStatus')"
          property="inspection_status"
        />
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <div class="dialog-modal">
        <div>
          <el-row :gutter="0">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-button class="button-black" @click="linkWithCampaign">{{ $t('creativeLink.linkWithCampaign') }}</el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="right-group-actions">
              <div class="search-filters">
                <div class="filters">
                  <el-select v-model="filterByStatusSelected" clearable filterable @change="onSelectStatus">
                    <el-option
                      v-for="item in filterByStatusOptions"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </div>
                <div class="search">
                  <autocomplete-search :source="searchCampaignSource" :keyexpr="keyExpr" :displayexpr="displayExpr" :headersearch="false" @onSearchResult="onSearchCampaignResult" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="campaigns-area">
          <el-table
            :data="campaigns"
            :default-sort = "{prop: 'name', order: 'ascending'}"
            style="width: 100%"
            @selection-change="handleCampaignSelectionChange">
            <el-table-column
              type="selection"
              width="55" />
            <el-table-column
              label="">
              <template slot-scope="scope">
                <i :style="getStatusStyle(scope.row.status)" class="el-icon-success"/>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('creativeLink.labelCampaignGoal')"
              sortable
              property="goalName"
            />
            <el-table-column
              :label="$t('creativeLink.labelCampaignTargetType')"
              sortable
              property="type"
            />
            <el-table-column
              :label="$t('creativeLink.labelCampaignName')"
              sortable
              property="name" />
            <el-table-column
              :label="$t('creativeLink.labelCampaignCreatedDate')"
              sortable
              property="createdDate"
            />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreativeLink from './CreativeLink'
export default CreativeLink
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

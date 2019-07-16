<template>
  <div class="tag-guide-container">
    <el-row class="tag-guide">
      <el-col :span="24">
        <el-row :gutter="10">
          <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3">
            <span class="title-label">{{ genI18n('siteType') }}</span>
          </el-col>
          <el-col :xs="19" :sm="20" :md="21" :lg="21" :xl="21">
            <el-radio-group v-model="siteType" @change="onChange">
              <el-radio :label="standaloneInstallationLabel" class="site-type-radio">{{ genI18n('standaloneInstallation') }}</el-radio> <br>
              <el-radio :label="platformSystemBaseLabel" class="site-type-radio">{{ genI18n('platformSystemBase') }}</el-radio>
            </el-radio-group>
            <div class="select-area-container">
              <el-select
                ref="SelectPlatformComponent"
                v-model="selectedPlatform"
                :disabled="siteType === standaloneInstallationLabel"
                :placeholder="genI18n('selectPlatformProvider')"
                class="dropdown-platforms"
              >
                <el-option v-for="platform in platforms" :key="platform.id" :value="platform.id" :label="getPlatformLabel(platform)" class="dropdown-platforms-item"/>
              </el-select>
              <div class="select-tracking-tag-container">
                <div class="select-tracking-tag-wrapper">
                  <div class="tracking-tag-item">
                    <el-checkbox v-model="checkAll">{{ genI18n('selectAllTrackingTags') }}</el-checkbox>
                  </div>
                  <hr>
                  <template>
                    <div v-for="trackingTag in trackingTagOptions" :key="trackingTag.label" class="tracking-tag-item">
                      <el-checkbox v-model="trackingTag.isChecked" :label="trackingTag.label" >{{ trackingTag.label }}</el-checkbox>
                    </div>
                  </template>
                  <div :class="showLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
                    <content-loader :speed="2" :animate="true">
                      <rect x="0" y="0" rx="3" ry="3" width="400" height="8" />
                      <rect x="20" y="20" rx="3" ry="3" width="330" height="8" />
                      <rect x="10" y="40" rx="3" ry="3" width="360" height="8" />
                      <rect x="0" y="60" rx="3" ry="3" width="400" height="8" />
                      <rect x="20" y="80" rx="3" ry="3" width="350" height="8" />
                    </content-loader>
                  </div>
                </div>
              </div>
            </div>
            <div class="generate-btn">
              <el-button type="primary" @click="onGenerate">{{ $t('productFeed.trackingTag.generateBtn') }}</el-button>
            </div>
          </el-col>
        </el-row>

        <div v-if="trackingTagOptions">
          <div v-for="item in informationList" :key="item.id" class="xml-information-area">
            <el-row v-if="informationList" :gutter="10">
              <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3" class="xml-information-title">
                <span class="title-label">{{ genI18n('tagGuide') }}</span>
              </el-col>
              <el-col :xs="19" :sm="20" :md="21" :lg="21" :xl="21">
                <div class="xml-information-description">{{ genI18n('description') + item.items[0].i + ']' }}</div>
                <div class="xml-information-item">
                  <el-tabs value="web" @tab-click="changeDevice(item)">
                    <el-tab-pane :label="$t('productFeed.trackingTag.form.pcWeb')" name="web">
                      <div :key="item.id" class="xml-information-container">
                        <div>{{ xmlPanelLabels.XML_HEADER }}</div>
                        <div class="p-l-20">{{ `${xmlPanelLabels.WP_HCUID}: "${generateDefaultValue(item.wpHcuid)}"` }}</div>
                        <div class="p-l-20">{{ `${xmlPanelLabels.TI}: "${generateDefaultValue(item.ti)}"` }}</div>
                        <div class="p-l-20">
                          <span>{{ `{ ${xmlPanelLabels.TY}: "` }}</span><span class="ty-value-style">{{ generateDefaultValue(item.ty) }}</span><span>"</span>
                        </div>
                        <div class="p-l-20">{{ `${xmlPanelLabels.DEVICE}: "${generateDefaultValue(item.device)}"` }}</div>
                        <div v-if="item.ty !== 'Home'" class="p-l-20">
                          <div class="p-l-20">{{ `${xmlPanelLabels.ITEMS}: [` }}</div>
                          <div class="p-l-20">
                            <div class="p-l-20">
                              <span>{{ `{ ${xmlPanelLabels.I}: "` }}</span><span class="name-value-style">{{ generateDefaultValue(item.items[0].i) }}</span><span>",</span>
                              <span>{{ `{ ${xmlPanelLabels.T}: "` }}</span><span class="name-value-style">{{ generateDefaultValue(item.items[0].t) }}</span><span>",</span>
                              <span>{{ `{ ${xmlPanelLabels.P}: "` }}</span><span class="price-value-style">{{ generateDefaultValue(item.items[0].p) }}</span><span>",</span>
                              <span>{{ `${xmlPanelLabels.Q}: "${generateDefaultValue(item.items[0].q)}"` }}</span>
                            </div>
                            ]
                          </div>
                        </div>
                        <div>{{ xmlPanelLabels.XML_FOOTER }}</div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('productFeed.trackingTag.form.mobileWeb')" name="mobile">
                      <div class="xml-information-container">
                        <div>{{ xmlPanelLabels.XML_HEADER }}</div>
                        <div class="p-l-20">{{ `${xmlPanelLabels.WP_HCUID}: "${generateDefaultValue(item.wpHcuid)}"` }}</div>
                        <div class="p-l-20">{{ `${xmlPanelLabels.TI}: "${generateDefaultValue(item.ti)}"` }}</div>
                        <div class="p-l-20">
                          <span>{{ xmlPanelLabels.TY + ': "' }}</span>
                          <span class="ty-value-style">{{ generateDefaultValue(item.ty) }}</span>
                          <span>"</span>
                        </div>
                        <div class="p-l-20">{{ `${xmlPanelLabels.DEVICE}: "${generateDefaultValue(item.device)}"` }}</div>
                        <div v-if="item.ty !== 'Home'" class="p-l-20">
                          <div class="p-l-20">{{ `${xmlPanelLabels.ITEMS}: [` }}</div>
                          <div class="p-l-20">
                            <div class="p-l-20">{{ `{ ${xmlPanelLabels.I}: "${generateDefaultValue(item.items[0].i)}", ${xmlPanelLabels.T}: "${generateDefaultValue(item.items[0].t)}"  ${xmlPanelLabels.P}: "${generateDefaultValue(item.items[0].p)}"  ${xmlPanelLabels.Q}: "${generateDefaultValue(item.items[0].q)}"}` }}</div>
                            ]
                          </div>
                        </div>
                        <div>{{ xmlPanelLabels.XML_FOOTER }}</div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TagGuide from './TagGuide'
export default TagGuide
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>

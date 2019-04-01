export default {
  createCampaign: {
    title: 'Create Campaign [JP] ',
    stepSelectCampaignObjectives: {
      title: 'Select campaign objectives[JP] ',
      campaignGoalList: {
        branding: {
          title: 'Branding[JP] ',
          text: 'RT/LT/UT/CT[JP] ',
          desc: '온라인상에 잠재되어 있는 사용자를 대상으로 광고를 송출하고 이를 통해 인지도를 상승시키는 것을 목표로 합니다. [jp]'
        },
        trafic: {
          title: 'Trafic[JP] ',
          text: 'UT/CT[JP] ',
          desc: '광고주의 사이트에 관심이 있거나 판매 상품과 관련이 높은 사용자의 방문 유도를 목표로 합니다. [jp]'
        },
        retention: {
          title: 'Retention[JP] ',
          text: 'RT[JP] ',
          desc: '광고를 통해 유입된 사용자를 분석하고 해당 사용자에게 광고를 송출하여 충성 고객으로의 전환을 목표로 합니다. [jp]'
        },
        conversion: {
          title: 'Conversion[JP] ',
          text: 'RT/LT[JP] ',
          desc: '온라인, 앱 등을 통해 전환율 유도하는 것을 목표로 합니다. [jp]'
        }
      },

      targetingTypeList: {
        leadTargeting: {
          title: 'Lead Targeting',
          desc: '광고주의 업종을 기준으로 유사 업종의 사용자에게 브랜딩 광고를 송출합니다. [jp]'
        },

        userTargeting: {
          title: 'User Targeting',
          desc: '광고주가 선택한 성향의 유저그룹에게 광고를 송출합니다. [jp]'
        },

        topicTargeting: {
          title: 'Topic Targeting',
          desc: '광고주가 선택한 유형의 지면에 광고를 송출합니다. [jp]'
        },

        keywordTargeting: {
          title: 'Keyword Targeting',
          desc: '광고주가 선택한 유형의 지면에 광고를 송출합니다. [jp]'
        },

        retargeting: {
          title: 'Retargeting[JP] ',
          desc: 'retargetingDesc'
        },

        retargetingNonOption: {
          title: 'Retargeting(non-ption)[JP] ',
          desc: 'retargetingNonOptionDesc'
        }
      },

      trackingTag: {
        title: 'Tracking tag 정보 [jp]',
        contentAct: '광고주 사이트를 통해 심어진 스크립트가 정상적으로 작동중입니다. [jp] ',
        contentDis: '광고주 사이트를 통해 심어진 스크립트가 정상적으로 작동중입니다. [jp]'
      },

      industry: 'Industry [JP]'
    },

    stepCreateCampaign: {
      title: 'Create Campaign[JP] ',
      targetingGoleAndType: {
        title: 'Tageting Gole&Type [JP] '
      },
      adGroupName: {
        title: 'Ad group name[JP] ',
        placeholderName: 'Enter a group name for your campaign[JP] ',
        setCampaignExtra: 'Set campaign to extra ad group[JP] ',
        placeholderSelectGroup: 'Select group [JP] '
      },
      campaignName: {
        title: 'Campaign name[JP] ',
        placeholderName: 'Enter a name for your campaign[JP] ',
        useCampaignSetting: 'Use campaign setting from another campaign[JP] ',
        placeholderSelectCampaign: 'Select campaign [JP] '
      },
      landingUrl: {
        title: 'Landing URL[JP] ',
        placeholderUrl: 'Enter a URL for your website or webpage[JP] ',
        setAboutApp: 'Set about app campaign[JP] ',
        btnCheck: 'Check[JP] ',
        android: {
          placeholderSelectApp: 'Select android app[JP] ',
          placeholderCounty: 'Country[JP] ',
          placeholderAppCheck: 'App android ID[JP] ',
          placeholderPartyTracking: '3rd Party Tracking Solution[JP] ',
          placeholderUrl: 'Enter a store URL for your Android app[JP] ',
          urlPattern: {
            select: 'URL 3rd[JP] ',
            placeholder: '3rd Tracking party URL pattern[JP] ',
            table: {
              th1: '[JP] ',
              th2: '[JP] ',
              th3: '[JP] ',
              th4: '[JP] '
            }
          },
          urlPromotion: {
            select: 'URL pro[JP] ',
            placeholder: 'Enter web-page URL for app promotion [JP] '
          }
        },
        ios: {
          placeholderSelectApp: 'Select IOS app[JP] ',
          placeholderCounty: 'Country[JP] ',
          placeholderAppCheck: 'App IOS ID[JP] ',
          placeholderPartyTracking: '3rd Party Tracking Solution[JP] ',
          placeholderUrl: 'Enter a store URL for your IOS app[JP] ',
          urlPattern: {
            select: 'URL 3rd[JP] ',
            placeholder: '3rd Tracking party URL pattern[JP] ',
            table: {
              th1: '[JP] ',
              th2: '[JP] ',
              th3: '[JP] ',
              th4: '[JP] '
            }
          },
          urlPromotion: {
            select: 'URL pro[JP] ',
            placeholder: 'Enter web-page URL for app promotion [JP] '
          }
        }
      },
      premiumCampaign: {
        title: 'Premium Campaign [JP] ',
        setPremium: 'Set Premium Campaign (Super-admin only) [JP] '
      },
      deliverCycle: {
        title: '광고송출주기정의 [JP]',
        schedule: {
          title: 'Schedule [JP]',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다 [JP]'
        },
        fixedDate: {
          title: 'Fixed Date [JP]',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다 [JP]'
        },
        productFiltering: {
          title: 'Product Filtering [JP]',
          description: '해당 캠페인과 연결된 소재(다이나믹 템플릿)내 노출되는 상품의 설정 혹은 조건을 변경하실 수 있습니다. 스크립트가 설치된 경우에 한합니다. [JP]',
          placeholderSelectProductFeed: 'Select Feed [JP]',
          labelId: 'Id [jp]',
          labelName: 'Name [jp]',
          labelPrice: 'Price [jp]',
          selectedProduct: 'Selected Product [jp]',
          deleteAllBtn: 'Delete All [jp]'
        }
      },
      targetGroupControlA: {
        title: 'Target Group Control A'
      },
      targetGroupControlB: {
        title: 'Target Group Control B'
      },
      targetConversionType: {
        title: 'Target Conversion Type'
      },

      probabilityOfPurchase: {
        title: 'Probability of purchase'
      },
      automaticallyOptimizeConversion: {
        title: 'Automatically Optimize Conversion',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        conversion: 'Conversion',
        join: 'Join',
        purchaseComplete: 'PurchaseComplete',
        oneConversion: '1st Conversion',
        twoConversion: '2nd Conversion',
        conversionOfNewVisitor: 'Conversion of new visitor on that day',
        longTermDormant: 'Long term dormant user conversion'
      },
      leadTargetingRange: {
        title: 'Lead Targeting Range',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        topRange: 'Top',
        middleRange: 'Middle',
        lowRange: 'Low',
        highSimilarity: 'High similarity',
        lowSimilarity: 'Low similarity',
        excludeUsers: 'Exclude users who visit your site more than once'
      },
      userInterestDirectory: {
        title: 'User Interest Directory',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        selectedTitle: 'Select User Interest Directory',
        target: 'Target',
        targeted: 'Targeted',
        exclude: 'Exclude',
        excluded: 'Excluded'
      },
      keywordList: {
        title: 'Keyword List',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다 지정한 타겟에 대한 가능합니다',
        copy: 'Copy',
        delete: 'Delete',
        deleteAll: 'Delete all',
        upload: 'Upload',
        enter: 'Enter',
        position: 'Position',
        allowKeywords: 'Allow keywords',
        blockKeywords: 'Block keywords',
        currency: 'currency',
        keyword: 'keyword'
      },
      demographic: {
        title: 'Demographic',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다'
      },
      behaviorOfVisit: {
        title: 'Behavior of site visit',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        defaultBehaviorSelect: 'My website visitors (default)',
        relativeBehaviorSelect: 'My website and relative visitors',
        allow: 'Allow',
        block: 'Block',
        itemName: 'behavior',
        suffixDescription: '최소 1개의 값을 선택해 주세요',
        target: 'Target',
        targeted: 'Targeted',
        exclude: 'Exclude',
        excluded: 'Excluded'
      },
      advertisingPosition: {
        title: 'Advertising Position',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다'
      },
      customUserGroup: {
        title: 'Custom User Group',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다'
      },
      forecastOfConversion: {
        title: 'Forecast Of Conversion',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        range: 'Range',
        group: 'Group',
        krw: 'KRW',
        totalUV: 'Total UV',
        targetUV: 'Target UV',
        convRate: 'Conv.rate'
      },
      feedCategoryBaseUserTageting: {
        title: 'Feed Category Base User Tageting',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다'
      }
    },
    stepMatchCreatives: {
      title: 'Match creatives[JP] '
    }
  },
  campaignReporting: {
    reportingType: {
      daily: 'Daily [jp]',
      weekly: 'Weekly [jp]',
      monthly: 'Monthly [jp]'
    },
    reportingAction: {
      createCampaign: '+ Create Campaign [jp]',
      enable: 'Enable [jp]',
      stop: 'Stop [jp]',
      downloadReport: 'Download report [jp]',
      accounts: 'Accounts [jp]',
      campaigns: 'Campaigns [jp]',
      adGroupd: 'Ad groups [jp]',
      level: 'Level [jp]',
      custom: 'Custom [jp]',
      segment: 'Segment [jp]'
    },
    reportingDateSelection: {
      today: 'Today [jp]: ',
      yesterday: 'Yesterday [jp]: ',
      thisWeek: 'This week [jp]: ',
      lastWeek: 'Last week [jp]: ',
      last14Days: 'Last 14Days [jp]: ',
      thisMonth: 'This month [jp]: ',
      lastMonth: 'Last month [jp]: ',
      last3Month: 'Last 3 month [jp]: ',
      last6Month: 'Last 6 month [jp]: ',
      thisYear: 'This year [jp]: ',
      lastYear: 'Last year [jp]: '
    },
    select: 'Select [jp]',
    columnsNameEmpty: 'Please input columns name [jp]',
    columnsEmpty: 'You have not selected the column [jp]'
  }
}

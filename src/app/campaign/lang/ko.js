export default {
  createCampaign: {
    title: 'Create Campaign [ko] ',
    stepSelectCampaignObjectives: {
      title: 'Select campaign objectives[ko] ',
      campaignGoalList: {
        branding: {
          title: 'Branding[ko] ',
          text: 'RT/LT/UT/CT[ko] ',
          desc: '온라인상에 잠재되어 있는 사용자를 대상으로 광고를 송출하고 이를 통해 인지도를 상승시키는 것을 목표로 합니다. [ko]'
        },
        trafic: {
          title: 'Trafic[JP] ',
          text: 'UT/CT[JP] ',
          desc: '광고주의 사이트에 관심이 있거나 판매 상품과 관련이 높은 사용자의 방문 유도를 목표로 합니다. [ko]'
        },
        retention: {
          title: 'Retention[JP] ',
          text: 'RT[JP] ',
          desc: '광고를 통해 유입된 사용자를 분석하고 해당 사용자에게 광고를 송출하여 충성 고객으로의 전환을 목표로 합니다. [ko]'
        },
        conversion: {
          title: 'Conversion[JP] ',
          text: 'RT/LT[JP] ',
          desc: '온라인, 앱 등을 통해 전환율 유도하는 것을 목표로 합니다. [ko]'
        }
      },

      targetingTypeList: {
        leadTargeting: {
          title: 'Lead Targeting',
          desc: '광고주의 업종을 기준으로 유사 업종의 사용자에게 브랜딩 광고를 송출합니다. [ko]'
        },

        userTargeting: {
          title: 'User Targeting',
          desc: '광고주가 선택한 성향의 유저그룹에게 광고를 송출합니다. [ko]'
        },

        topicTargeting: {
          title: 'Topic Targeting',
          desc: '광고주가 선택한 유형의 지면에 광고를 송출합니다. [ko]'
        },

        keywordTargeting: {
          title: 'Keyword Targeting',
          desc: '광고주가 선택한 유형의 지면에 광고를 송출합니다. [ko]'
        },

        retargeting: {
          title: 'Retargeting[ko] ',
          desc: 'retargetingDesc'
        },

        retargetingNonOption: {
          title: 'Retargeting(non-ption)[ko] ',
          desc: 'retargetingNonOptionDesc'
        }
      },

      trackingTag: {
        title: 'Tracking tag 정보 [ko]',
        contentAct: '광고주 사이트를 통해 심어진 스크립트가 정상적으로 작동중입니다. [ko] ',
        contentDis: '광고주 사이트를 통해 심어진 스크립트가 정상적으로 작동중입니다. [ko]'
      },

      industry: 'Industry [ko]'
    },

    stepCreateCampaign: {
      title: 'Create Campaign[ko] ',
      targetingGoleAndType: {
        title: 'Tageting Gole&Type [ko] '
      },
      adGroupName: {
        title: 'Ad group name[ko] ',
        placeholderName: 'Enter a group name for your campaign[ko] ',
        setCampaignExtra: 'Set campaign to extra ad group[ko] ',
        placeholderSelectGroup: 'Select group [ko] '
      },
      campaignName: {
        title: 'Campaign name[ko] ',
        placeholderName: 'Enter a name for your campaign[ko] ',
        useCampaignSetting: 'Use campaign setting from another campaign[ko] ',
        placeholderSelectCampaign: 'Select campaign [ko] '
      },
      landingUrl: {
        title: 'Landing URL[ko] ',
        placeholderUrl: 'Enter a URL for your website or webpage[ko] ',
        setAboutApp: 'Set about app campaign[ko] ',
        btnCheck: 'Check[ko] ',
        android: {
          placeholderSelectApp: 'Select android app[ko] ',
          placeholderCounty: 'Country[ko] ',
          placeholderAppCheck: 'App android ID[ko] ',
          placeholderPartyTracking: '3rd Party Tracking Solution[ko] ',
          placeholderUrl: 'Enter a store URL for your Android app[ko] ',
          urlPattern: {
            select: 'URL 3rd[ko] ',
            placeholder: '3rd Tracking party URL pattern[ko] ',
            table: {
              th1: '[ko] ',
              th2: '[ko] ',
              th3: '[ko] ',
              th4: '[ko] '
            }
          },
          urlPromotion: {
            select: 'URL pro[ko] ',
            placeholder: 'Enter web-page URL for app promotion [ko] '
          }
        },
        ios: {
          placeholderSelectApp: 'Select IOS app[ko] ',
          placeholderCounty: 'Country[ko] ',
          placeholderAppCheck: 'App IOS ID[ko] ',
          placeholderPartyTracking: '3rd Party Tracking Solution[ko] ',
          placeholderUrl: 'Enter a store URL for your IOS app[ko] ',
          urlPattern: {
            select: 'URL 3rd[ko] ',
            placeholder: '3rd Tracking party URL pattern[ko] ',
            table: {
              th1: '[ko] ',
              th2: '[ko] ',
              th3: '[ko] ',
              th4: '[ko] '
            }
          },
          urlPromotion: {
            select: 'URL pro[ko] ',
            placeholder: 'Enter web-page URL for app promotion [ko] '
          }
        }
      },
      premiumCampaign: {
        title: 'Premium Campaign [ko] ',
        setPremium: 'Set Premium Campaign (Super-admin only) [ko] '
      },
      deliverCycle: {
        title: '광고송출주기정의 [ko]',
        schedule: {
          title: 'Schedule [ko]',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다 [ko]'
        },
        fixedDate: {
          title: 'Fixed Date [ko]',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다 [ko]'
        },
        productFiltering: {
          title: 'Product Filtering [ko]',
          description: '해당 캠페인과 연결된 소재(다이나믹 템플릿)내 노출되는 상품의 설정 혹은 조건을 변경하실 수 있습니다. 스크립트가 설치된 경우에 한합니다. [ko]',
          placeholderSelectProductFeed: 'Select Feed [ko]',
          labelId: 'Id [ko]',
          labelName: 'Name [ko]',
          labelPrice: 'Price [ko]',
          selectedProduct: 'Selected Product [ko]',
          deleteAllBtn: 'Delete All [ko]'
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
      title: 'Match creatives[ko] '
    }
  },
  campaignReporting: {
    reportingType: {
      daily: 'Daily [ko]',
      weekly: 'Weekly [ko]',
      monthly: 'Monthly [ko]'
    },
    reportingAction: {
      createCampaign: '+ Create Campaign [ko]',
      enable: 'Enable [ko]',
      stop: 'Stop [ko]',
      downloadReport: 'Download report [ko]',
      accounts: 'Accounts [ko]',
      campaigns: 'Campaigns [ko]',
      adGroupd: 'Ad groups [ko]',
      level: 'Level [ko]',
      custom: 'Custom [ko]',
      segment: 'Segment [ko]'
    },
    reportingDateSelection: {
      today: 'Today [ko]: ',
      yesterday: 'Yesterday [ko]: ',
      thisWeek: 'This week [ko]: ',
      lastWeek: 'Last week [ko]: ',
      last14Days: 'Last 14Days [ko]: ',
      thisMonth: 'This month [ko]: ',
      lastMonth: 'Last month [ko]: ',
      last3Month: 'Last 3 month [ko]: ',
      last6Month: 'Last 6 month [ko]: ',
      thisYear: 'This year [ko]: ',
      lastYear: 'Last year [ko]: '
    },
    select: 'Select [ko]',
    columnsNameEmpty: 'Please input columns name [ko]',
    columnsEmpty: 'You have not selected the column [ko]'
  }
}

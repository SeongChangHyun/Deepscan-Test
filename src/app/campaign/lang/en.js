export default {
  createCampaign: {
    title: 'Create Campaign',
    stepSelectCampaignObjectives: {
      title: 'Select campaign objectives',
      campaignGoalList: {
        branding: {
          title: 'Branding',
          text: 'RT/LT/UT/CT',
          desc: '온라인상에 잠재되어 있는 사용자를 대상으로 광고를 송출하고 이를 통해 인지도를 상승시키는 것을 목표로 합니다.'
        },
        trafic: {
          title: 'Trafic[JP] ',
          text: 'UT/CT[JP] ',
          desc: '광고주의 사이트에 관심이 있거나 판매 상품과 관련이 높은 사용자의 방문 유도를 목표로 합니다.'
        },
        retention: {
          title: 'Retention[JP] ',
          text: 'RT[JP] ',
          desc: '광고를 통해 유입된 사용자를 분석하고 해당 사용자에게 광고를 송출하여 충성 고객으로의 전환을 목표로 합니다.'
        },
        conversion: {
          title: 'Conversion[JP] ',
          text: 'RT/LT[JP] ',
          desc: '온라인, 앱 등을 통해 전환율 유도하는 것을 목표로 합니다.'
        }
      },

      targetingTypeList: {
        leadTargeting: {
          title: 'Lead Targeting',
          desc: '광고주의 업종을 기준으로 유사 업종의 사용자에게 브랜딩 광고를 송출합니다.'
        },

        userTargeting: {
          title: 'User Targeting',
          desc: '광고주가 선택한 성향의 유저그룹에게 광고를 송출합니다.'
        },

        topicTargeting: {
          title: 'Topic Targeting',
          desc: '광고주가 선택한 유형의 지면에 광고를 송출합니다.'
        },

        keywordTargeting: {
          title: 'Keyword Targeting',
          desc: '광고주가 선택한 유형의 지면에 광고를 송출합니다.'
        },

        retargeting: {
          title: 'Retargeting',
          desc: 'retargetingDesc'
        },

        retargetingNonOption: {
          title: 'Retargeting(non-ption)',
          desc: 'retargetingNonOptionDesc'
        }
      },

      trackingTag: {
        title: 'Tracking tag 정보',
        contentAct: '광고주 사이트를 통해 심어진 스크립트가 정상적으로 작동중입니다.',
        contentDis: '광고주 사이트를 통해 심어진 스크립트가 정상적으로 작동중입니다.'
      },

      industry: 'Industry'
    },

    stepCreateCampaign: {
      title: 'create Campaign',
      targetingGoleAndType: {
        title: 'Targeting Gole&Type'
      },
      adGroupName: {
        title: 'Ad group name',
        placeholderName: 'Enter a group name for your campaign',
        setCampaignExtra: 'Set campaign to extra ad group',
        placeholderSelectGroup: 'Select group'
      },
      campaignName: {
        title: 'Campaign name',
        placeholderName: 'Enter a name for your campaign',
        useCampaignSetting: 'Use campaign setting from another campaign',
        placeholderSelectCampaign: 'Select campaign'
      },
      landingUrl: {
        title: 'Landing URL',
        placeholderUrl: 'Enter a URL for your website or webpage',
        setAboutApp: 'Set about app campaign',
        btnCheck: 'Check',
        android: {
          placeholderSelectApp: 'Select android app',
          placeholderCounty: 'Country',
          placeholderAppCheck: 'App android ID',
          placeholderPartyTracking: '3rd Party Tracking Solution',
          placeholderUrl: 'Enter a store URL for your Android app',
          urlPattern: {
            select: 'URL 3rd',
            placeholder: '3rd Tracking party URL pattern',
            table: {
              th1: '',
              th2: '',
              th3: '',
              th4: ''
            }
          },
          urlPromotion: {
            select: 'URL pro',
            placeholder: 'Enter web-page URL for app promotion'
          }
        },
        ios: {
          placeholderSelectApp: 'Select IOS app',
          placeholderCounty: 'Country',
          placeholderAppCheck: 'App IOS ID',
          placeholderPartyTracking: '3rd Party Tracking Solution',
          placeholderUrl: 'Enter a store URL for your IOS app',
          urlPattern: {
            select: 'URL 3rd',
            placeholder: '3rd Tracking party URL pattern',
            table: {
              th1: '',
              th2: '',
              th3: '',
              th4: ''
            }
          },
          urlPromotion: {
            select: 'URL pro',
            placeholder: 'Enter web-page URL for app promotion'
          }
        }
      },
      premiumCampaign: {
        title: 'Premium Campaign ',
        setPremium: 'Set Premium Campaign (Super-admin only)'
      },
      location: {
        title: 'Location',
        selectedTitle: 'Selected location',
        placeholderSearch: 'Search location',
        optionDefault: 'South Korea(default)',
        optionAll: 'All available country/region',
        optionCustom: 'Let me choose specific location',
        removeAll: 'Remove all',
        noData: 'No data'
      },
      language: {
        title: 'Language',
        selectedTitle: 'Selected language',
        placeholderSearch: 'Search language',
        optionAll: 'All available language (default)',
        optionCustom: 'Let me choose specific language'
      },
      device: {
        title: 'Device'
      },
      budget: {
        title: 'Budget',
        placeholderBudget: 'Please input',
        dailyBudgetOption: 'Daily budget option',
        standard: 'Standard (spend budget evenly through the day)',
        accelerated: 'Accelerated (spend budget as quickly as possible)',
        liveAd: 'Live AD from today(default)',
        startAndEndDate: 'Start and end date settings',
        start: 'Start',
        end: '~ End',
        noEndDate: 'No end date',
        perDay: 'Per day(default)',
        perWeek: 'Per week(Sun ~ Sat)',
        perMonth: 'Per month(1 ~ 31)'

      },
      deliverCycle: {
        title: 'Ad Delivery Restrictions Settings',
        schedule: {
          title: 'Schedule',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다'
        },
        fixedDate: {
          title: 'Fixed Date',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
          allowDates: 'Allow dates',
          delete: 'Delete',
          choose: 'Choose',
          blockDates: 'Block dates'
        },
        productFiltering: {
          title: 'Product Filtering',
          description: '해당 캠페인과 연결된 소재(다이나믹 템플릿)내 노출되는 상품의 설정 혹은 조건을 변경하실 수 있습니다. 스크립트가 설치된 경우에 한합니다.',
          placeholderSelectProductFeed: 'Select Feed',
          labelId: 'Id',
          labelName: 'Name',
          labelPrice: 'Price',
          selectedProduct: 'Selected Product',
          deleteAllBtn: 'Delete All',
          removeAll: 'Remove all'
        }
      },
      bidDetail: {
        title: 'Bid Detail',
        CPC: 'CPC (Default)',
        CPM: 'CPM',
        CPVc: 'CPVc',
        CPMg: 'CPMg',
        CPI: 'CPI',
        CPA: 'CPA',
        bid: 'Bid',
        estimateMonthlyClick: 'Estimate monthly clicks',
        estimateImpressionsClick: 'Estimate monthly impressions',
        estimateMonthlySpend: 'Estimate monthly spend'

      },

      targetGroupControlA: {
        title: 'Target Group Control A'
      },
      targetGroupControlB: {
        title: 'Target Group Control B',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        selectSpecifiedTarget: '지정한 타겟에 대한 광고 송출 조건을 선택하신',
        setDeliveryConditions: '지정한 타겟에 대한 광고 송출 조건을',
        adsSpecifiedTargets: '지정한 타겟에 대한 광고'
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
        allow: 'Allow',
        block: 'Block',
        itemName: 'keyword'
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
      },
      productFitering: {
        title: 'Product Fitering',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다'
      },
      ipAddress: {
        title: 'IP Address',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        allowIpAddress: 'Allow ip address',
        blockIpAddress: 'Block ip address',
        copy: 'Copy',
        delete: 'Delete',
        deleteAll: 'Delete all',
        upload: 'Upload',
        enter: 'Enter',
        position: 'Position'
      },
      os: {
        title: 'OS',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        allowOs: 'Allow OS',
        blockOs: 'Block OS',
        android: 'Android',
        iOsIPad: 'iOS(iPad)',
        iOsIPhone: 'iOS(iPhone) ',
        windows: 'Windows',
        macOs: 'Mac OS'
      },
      carrier: {
        title: 'Carrier',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        allCarrier: 'All carrier',
        specificCarrier: 'Specific carrier',
        selected: 'Selected'
      },
      manufactureBrand: {
        title: 'Manufacture/Brand',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        allDeviceMode: 'All device/mode',
        specificDeviceMode: 'Specific device/mode',
        select: 'Select'
      },
      browser: {
        description: '광고가 송출되는 환경 중 사용자의 인터넷 브라우저를 선택하실 수 있습니다.',
        browser: 'Browser',
        allowBrowser: 'Allow Browser',
        blockBrowser: 'Block Browser',
        chrome: 'Chrome',
        safari: 'Safari',
        opera: 'Opera',
        microsoftEdge: 'Microsoft Edge',
        microsoftIE: 'Microsoft IE',
        firefox: 'Firefox',
        webView: 'WebView',
        sendAdsToAll: '모든 브라우저에 광고를 송출합니다.',
        weWillSendOutAds: '선택한 브라우저에 한해 광고를 송출합니다.'
      },
      feedCategoryBaseUser: {
        title: 'Feed category base user targeting',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        feedYourUser: '광고주 사이트 내 상품을 본 사용자들을 피드 내 카테고리',
        youCanGroupBy: '기준으로 그룹화하고, 특정 그룹에 광고 송출을 결정하실 수 있습니다.',
        feedCategory: 'Feed category',
        categoryInformation: 'Category information',
        productCount: 'Product count',
        averagePrice: 'Average price'
      },
      impressionCapping: {
        title: '해당 캠페인의 소재가 사용자에게 노출되는 횟수를 설정하실 수 있습니다.',
        impressionCapping: 'Impression capping',
        limitTheExposure: '사용자당 광고의 노출 제한을',
        circuitSetting: '회로 설정하며',
        initializeEvery: '마다 초기화',
        limitTheExposureOfSession: '세션당 광고의 노출 제한을',
        circuitSettingShort: '회로 설정',
        toPeopleWhoClicked: '광고를 클릭한 사용자에게',
        doNotShowAds: '동안 광고를 노출하지 않습니다.',
        itemsYouPurchase: '사용자가 구매한 상품은 다시 조회할때가지 노출하지 않습니다.',
        theItemsInTheSameCategory: '구매한 상품과 동일 카테고리(3뎁 > 2뎁 > 1뎁순)의 상품은 노출하지 않습니다.'
      }
    },

    stepMatchCreatives: {
      title: 'Match creatives'
    }
  },
  campaignReporting: {
    reportingType: {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly'
    },
    reportingAction: {
      createCampaign: '+ Create Campaign',
      enable: 'Enable',
      stop: 'Stop',
      downloadReport: 'Download report',
      accounts: 'Accounts',
      campaigns: 'Campaigns',
      adGroupd: 'Ad groups',
      level: 'Level',
      custom: 'Custom',
      segment: 'Segment'
    },
    reportingDateSelection: {
      today: 'Today: ',
      yesterday: 'Yesterday: ',
      thisWeek: 'This week: ',
      lastWeek: 'Last week: ',
      last14Days: 'Last 14Days: ',
      thisMonth: 'This month: ',
      lastMonth: 'Last month: ',
      last3Month: 'Last 3 month: ',
      last6Month: 'Last 6 month: ',
      thisYear: 'This year: ',
      lastYear: 'Last year: '
    },
    select: 'Select',
    columnsNameEmpty: 'Please input columns name',
    columnsEmpty: 'You have not selected the column'
  }
}

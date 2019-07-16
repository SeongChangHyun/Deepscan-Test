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
      title: 'Create campaign',
      targetGoalTitle: 'Targeting Goal Default Option',
      targetTypeTitle: 'Targeting Type Default Option',
      targetingGoalAndType: {
        title: 'Targeting Goal&Type'
      },
      adGroupName: {
        title: 'Ad group name',
        error: 'Please enter campaign group name',
        errorSelect: 'Please select campaign group name',
        errorAlreadyExist: 'The campaign group name is already used',
        placeholderName: 'Enter a group name for your campaign',
        setCampaignExtra: 'Set campaign to extra ad group',
        placeholderSelectGroup: 'Select group',
        getListAdGroupError: 'Get Ad groups failed',
        getListCampaignError: 'Get campaigns failed'
      },
      campaignName: {
        title: 'Campaign name',
        error: 'Please enter campaign name',
        errorSelect: 'Please select campaign name',
        placeholderName: 'Enter a name for your campaign',
        useCampaignSetting: 'Use campaign setting from another campaign',
        placeholderSelectCampaign: 'Select campaign'
      },
      landingUrl: {
        title: 'Landing URL',
        error: 'Please enter landing URL',
        urlFormatError: 'Format must start with "http://" OR "https://"',
        placeholderUrl: 'Enter a URL for your website or webpage',
        setAboutApp: 'Set about app campaign',
        btnCheck: 'Check',
        btnVerify: 'Verify ',
        standardParameter: 'Standard Parameter',
        inputParameter: 'Input Parameter',
        type: 'Type',
        status: 'Status',
        noData: 'No Data',
        aboutAppType: {
          required: 'Required',
          optional: 'Optional'
        },
        aboutAppStatus: {
          doNotInclude: 'Do not include',
          normal: 'Normal',
          error: 'Error'
        },
        android: {
          placeholderSelectApp: 'Select android app',
          customInput: 'Custom Input',
          placeholderCounty: 'Country',
          placeholderAppCheck: 'App android ID',
          placeholderPartyTracking: '3rd Party Tracking Solution',
          partyTrackingNone: 'None',
          placeholderUrl: 'Enter a store URL for your Android app',
          placeholderCampaignDeepLink: 'Enter campaign DeepLink',
          urlPattern: {
            select: 'Modify',
            placeholder: '3rd Tracking party URL pattern',
            table: {
              th1: '',
              th2: '',
              th3: '',
              th4: ''
            }
          },
          urlPromotion: {
            select: 'Use',
            placeholder: 'Enter web-page URL for app promotion'
          }
        },
        ios: {
          placeholderSelectApp: 'Select IOS app',
          customInput: 'Custom Input',
          placeholderCounty: 'Country',
          placeholderAppCheck: 'App IOS ID',
          placeholderPartyTracking: '3rd Party Tracking Solution',
          partyTrackingNone: 'None',
          placeholderUrl: 'Enter a store URL for your IOS app',
          placeholderCampaignDeepLink: 'Enter campaign DeepLink',
          urlPattern: {
            select: 'Modify',
            placeholder: '3rd Tracking party URL pattern',
            table: {
              th1: '',
              th2: '',
              th3: '',
              th4: ''
            }
          },
          urlPromotion: {
            select: 'Use',
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
        error: 'Please select at least 1 region',
        selectedTitle: 'Selected location',
        placeholderSearch: 'Search location',
        optionDefault: 'South Korea',
        optionAll: 'All available country/region',
        optionCustom: 'Let me choose specific location',
        removeAll: 'Remove all',
        noData: 'No data'
      },
      language: {
        title: 'Language',
        error: 'Please select language',
        selectedTitle: 'Selected language',
        placeholderSearch: 'Search language',
        optionAll: 'All available language ',
        optionCustom: 'Let me choose specific language'
      },
      device: {
        title: 'Device',
        error: 'Please select device',
        allAvailableDevices: 'All Available Devices'
      },
      budget: {
        title: 'Budget',
        error: 'Please enter budget',
        zeroError: 'Budget price must be more than 0',
        priceConflictError: 'Budget must greater than bid price',
        placeholderBudget: 'Please input',
        dailyBudgetOption: 'Daily budget option',
        applyBudgetByDay: 'Apply budget by day',
        standard: 'Standard (spend budget evenly through the day)',
        accelerated: 'Accelerated (spend budget as quickly as possible)',
        liveAd: 'Live AD from today',
        startAndEndDate: 'Start and end date settings',
        start: 'Start',
        end: 'End',
        noEndDate: 'No end date',
        perDay: 'Per day',
        perWeek: 'Per week(Sun ~ Sat)',
        perMonth: 'Per month(1 ~ 31)',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'

      },
      deliverCycle: {
        title: 'Ad Delivery Restrictions Settings',
        schedule: {
          title: 'Schedule',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
          hour: 'h',
          allDay: 'All day',
          mon: 'Mon',
          tue: 'Tue',
          wed: 'Wed',
          thu: 'Thu',
          fri: 'Fri',
          sat: 'Sat',
          sun: 'Sun'
        },
        fixedDate: {
          title: 'Fixed Date',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
          allowDates: 'Allow dates',
          delete: 'Delete',
          choose: 'Choose',
          blockDates: 'Block dates',
          selectDatePlaceholder: 'Select date and time'
        },
        productFiltering: {
          title: 'Product Filtering',
          description: '해당 캠페인과 연결된 소재(다이나믹 템플릿)내 노출되는 상품의 설정 혹은 조건을 변경하실 수 있습니다. 스크립트가 설치된 경우에 한합니다.',
          placeholderSelectProductFeed: 'Select Feed',
          labelId: 'Id',
          labelName: 'Name',
          labelPrice: 'Price',
          items: 'Items',
          deleteAllBtn: 'Delete All',
          removeAll: 'Remove all',
          noData: 'No Data',
          checkbox1: 'If the user has recently viewed this product and similar products',
          checkbox2: 'Exposure based on recommended products of advertiser site as of the previous day',
          checkbox3: 'Exposure of advertiser-specified products'
        }
      },
      bidDetail: {
        title: 'Bid Detail',
        CPC: 'CPC ',
        CPM: 'CPM',
        CPVc: 'CPVc',
        CPMg: 'CPMg',
        CPI: 'CPI',
        CPA: 'CPA',
        bid: 'Bid',
        estimateMonthlyClick: 'Estimate monthly clicks',
        estimateImpressionsClick: 'Estimate monthly impressions',
        estimateMonthlySpend: 'Estimate monthly spend',
        error: 'Please enter bid detail'
      },
      targetGroupControlA: {
        title: 'Target Group Control A',
        desc: 'You can set the advertisement delivery conditions for the specified target in detail according to the purpose you selected',
        impressionCount: 'Circuit setting',
        impressionCount2: 'Initialize every',
        excludeCustomerWhoVisitedHomepage: 'Exclude customers who have been influenced (clicks on your ads) through this campaign.',
        disableAllOptionSetForEnforcementWithExposedAds: 'Disable all options set for enforcement with exposed ads (excluding geographic information, language, and devices)',
        limitExposeAdsToUser: 'You can limit the exposure of your ads per user'
      },
      targetGroupControlB: {
        title: 'Target Group Control B',
        description: 'You can set the advertisement delivery conditions for the specified target in detail according to the purpose you selected',
        selectSpecifiedTarget: 'Sends ads to all users',
        setDeliveryConditions: 'Provide activity history on the advertiser site within the set time period',
        adsSpecifiedTargets: 'Sends an ad to a user who has not visited an advertiser site for a set period of time'
      },
      targetConversionType: {
        title: 'Target Conversion Type',
        desc: 'You can set the criteria for conversions that occur through your campaigns. PurchaseCompete and Join are provided by default, and can be set separately from the Tracking tag menu',
        conversionSegment: 'Conversion segment',
        conversionType: 'Conversion type',
        errorConversionType: '목적에 따라 상세히',
        errorConversionSegment: '목적에 따라 상세히',
        join: 'Join(Default)',
        purchaseComplete: 'PurchaseComplete(Default)',
        oneConversion: '1st Conversion',
        twoConversion: '2nd Conversion'
      },
      probabilityOfPurchase: {
        title: 'Probability of purchase',
        desc: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다 지정한 타겟에 대한 가능합니다',
        gradeBid: 'Grage bid',
        group: 'Group',
        targetUv: 'Target UV',
        convRate: 'Conv.rate',
        visitUv: 'Visit UV',
        convUv: 'Conv.UV',
        appearedUser: 'Appeared User',
        krw: 'KRW',
        unknown: 'Unknown',
        sendToAllGrade: 'Send to all grades ( default)',
        sendToSpecificGrade: 'Send ads to specific grades only'
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
      articleTopicDirectory: {
        title: 'Article Topic Directory',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        selectedTitle: 'Select Article Topic Directory',
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
        itemName: 'keyword',
        verifyError: 'An error happens when verify keyword'
      },
      demographic: {
        title: 'Demographic',
        description: '성별, 연령, 소득수준을 기준으로 사용자 타겟팅이 가능합니다.',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        age: 'Age',
        unknown: 'Unknown',
        incomeLevel: 'Income level',
        sendToALl: '모든 유저에게 송출합니다.',
        sendToSpecific: '특정 Demographic 유저에 한해 광고를 송출합니다.'
      },
      behaviorOfVisit: {
        title: 'Behavior of site visit',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        defaultBehaviorSelect: 'My website visitors',
        relativeBehaviorSelect: 'My website and relative visitors',
        allow: 'Allow',
        block: 'Block',
        itemName: 'behavior',
        suffixDescription: '최소 1개의 값을 선택해 주세요',
        target: 'Target',
        targeted: 'Targeted',
        exclude: 'Exclude',
        excluded: 'Excluded',
        deleteAll: 'Delete all'
      },
      advertisingPosition: {
        title: 'Advertising Position',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        allowPosition: 'Allow position',
        deleteAll: 'Delete all',
        currency: 'Currency',
        enter: 'Enter',
        delete: 'Delete',
        blockPosition: 'Block position',
        position: 'Position',
        copy: 'Copy',
        upload: 'Upload',
        allow: 'Allow',
        block: 'Block',
        itemName: 'position'
      },
      customUserGroup: {
        title: 'Custom User Group',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        optionAll: 'All user',
        optionCustom: 'Specific user group ',
        selectedTitle: 'Selected user',
        placeholderSearch: 'Search user'
      },
      forecastOfConversion: {
        title: 'Forecast Of Conversion',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        range: 'Range',
        group: 'Group',
        krw: 'KRW',
        totalUV: 'Total UV',
        targetUV: 'Target UV',
        convRate: 'Conv.rate',
        selectDefault: 'Send ads to all groups (default)',
        selectCustom: 'Send ads only to specific groups'
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
        position: 'Position',
        allow: 'Allow',
        block: 'Block',
        itemName: 'ip address'
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
        selected: 'Selected',
        placeholderSearch: 'Search carrier'
      },
      manufactureBrand: {
        title: 'Manufacture/Brand',
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
        optionAll: 'All device/mode',
        optionCustom: 'Specific device/mode',
        selectedTitle: 'Selected Manufacture/Brand',
        placeholderSearch: 'Search Manufacture/Brand'
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
        theItemsInTheSameCategory: '구매한 상품과 동일 카테고리(3뎁 > 2뎁 > 1뎁순)의 상품은 노출하지 않습니다.',
        cpm: 'Weight (CPM)',
        cpmr: 'Weight (CPC/CPM-R)'
      }
    },

    stepMatchCreatives: {
      title: 'Match creatives',
      targetingReachPrediction: 'Targeting Reach Prediction',
      estimatedUV: 'EstimatedUV'
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
      custom: 'Columns',
      segment: 'Segment',
      addAllColumns: 'Add all columns',
      added: 'Added',
      accountName: 'Account name',
      remove: 'Remove',
      saveThisSet: 'Save this set of columns',
      apply: 'Apply',
      cancel: 'Cancel'
    },
    reportingDateSelection: {
      today: 'Today: ',
      yesterday: 'Yesterday: ',
      thisWeek: 'This week: ',
      lastWeek: 'Last week: ',
      last14Days: 'Last 14 days: ',
      last7Days: 'Last 7 days: ',
      last30Days: 'Last 30 days: ',
      thisMonth: 'This month: ',
      lastMonth: 'Last month: ',
      last3Month: 'Last 3 month: ',
      last6Month: 'Last 6 month: ',
      thisYear: 'This year: ',
      lastYear: 'Last year: ',
      specificStartDate: 'Specific start date',
      specificEndDate: 'Specific end date',
      apply: 'Apply'
    },
    select: 'Select',
    columnsNameEmpty: 'Please input columns name',
    columnsEmpty: 'You have not selected the column',
    count: 'Count',
    deleteSetOfColumnSuccess: 'Deleted successfully',
    deleteSetOfColumnFailed: 'Deleted failed',
    saveSetOfColumnSuccess: 'Save successfully',
    saveSetOfColumnFailed: 'Save failed',
    loadColumnMaterialsFailed: 'Load column materials failed',
    loadListColumnsFailed: 'Load list of column failed',
    loadSetOfColumnsFailed: 'Load set of columns failed',
    loadDefaultColumnsFailed: 'Load default columns failed'
  },
  creativeLink: {
    createList: 'Creative List',
    createListDescription: 'A description or something like that',
    linkCampaignWithCreatives: 'Link campaign with creatives',
    linkCreativesWithACampaign: 'Link creatives with a campaign',
    linkWithCampaign: 'Link with campaign',
    labelStatus: 'Status',
    labelName: 'Name',
    labelType: 'Type',
    labelSize: 'Size',
    labelPreview: 'Preview',
    labelBackgroundColor: 'BG Color',
    labelLinkedCampaignCount: 'Linked Campaign Count',
    labelInspectionStatus: 'Inspection status',
    targetingGoal: 'Targeting Goal',
    targetingType: 'Targeting Type',
    adGroupName: 'Ad group name',
    campaignName: 'Campaign name',
    labelCampaignGoal: 'Campaign Goal',
    labelCampaignTargetType: 'Targeting Type',
    labelCampaignName: 'Campaign Name',
    labelCampaignCreatedDate: 'Created Date',
    messageNoCampaignSelected: 'Please select at least one campaign that you would like to link to'
  },
  dailyReporting: {
    allCampaigns: 'All Campaigns',
    search: 'Search',
    download: 'Download'
  }
}

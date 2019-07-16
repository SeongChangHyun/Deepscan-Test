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
      targetGoalTitle: 'Targeting Goal Default Option',
      targetTypeTitle: 'Targeting Type Default Option',
      targetingGoalAndType: {
        title: 'Tageting Goal&Type [ko] '
      },
      adGroupName: {
        title: 'Ad group name[ko] ',
        error: 'Please enter campaign group name [ko]',
        errorSelect: 'Please select campaign group name',
        errorAlreadyExist: 'The campaign group name is already used [ko]',
        placeholderName: 'Enter a group name for your campaign[ko] ',
        setCampaignExtra: 'Set campaign to extra ad group[ko] ',
        placeholderSelectGroup: 'Select group [ko] ',
        getListAdGroupError: 'Get Ad groups failed [ko]',
        getListCampaignError: 'Get campaigns failed [ko]'
      },
      campaignName: {
        title: 'Campaign name[ko] ',
        error: 'Please enter campaign name',
        errorSelect: 'Please select campaign name',
        placeholderName: 'Enter a name for your campaign[ko] ',
        useCampaignSetting: 'Use campaign setting from another campaign[ko] ',
        placeholderSelectCampaign: 'Select campaign [ko] '
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
          placeholderSelectApp: 'Select android app[ko] ',
          customInput: '직접 입력',
          placeholderCounty: 'Country[ko] ',
          placeholderAppCheck: 'App android ID[ko] ',
          placeholderPartyTracking: '3rd Party Tracking Solution[ko] ',
          partyTrackingNone: 'None',
          placeholderUrl: 'Enter a store URL for your Android app[ko] ',
          placeholderCampaignDeepLink: 'Enter campaign DeepLink',
          urlPattern: {
            select: '수정',
            placeholder: '3rd Tracking party URL pattern[ko] ',
            table: {
              th1: '[ko] ',
              th2: '[ko] ',
              th3: '[ko] ',
              th4: '[ko] '
            }
          },
          urlPromotion: {
            select: '사용',
            placeholder: 'Enter web-page URL for app promotion [ko] '
          }
        },
        ios: {
          placeholderSelectApp: 'Select IOS app[ko] ',
          customInput: '직접 입력',
          placeholderCounty: 'Country[ko] ',
          placeholderAppCheck: 'App IOS ID[ko] ',
          placeholderPartyTracking: '3rd Party Tracking Solution[ko] ',
          partyTrackingNone: 'None',
          placeholderUrl: 'Enter a store URL for your IOS app[ko] ',
          placeholderCampaignDeepLink: 'Enter campaign DeepLink',
          urlPattern: {
            select: '수정',
            placeholder: '3rd Tracking party URL pattern[ko] ',
            table: {
              th1: '[ko] ',
              th2: '[ko] ',
              th3: '[ko] ',
              th4: '[ko] '
            }
          },
          urlPromotion: {
            select: '사용',
            placeholder: 'Enter web-page URL for app promotion [ko] '
          }
        }
      },
      premiumCampaign: {
        title: 'Premium Campaign [ko] ',
        setPremium: 'Set Premium Campaign (Super-admin only) [ko] '
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
        applyBudgetByDay: '예산의 요일별 적용',
        standard: 'Standard (spend budget evenly through the day)',
        accelerated: 'Accelerated (spend budget as quickly as possible)',
        liveAd: 'Live AD from today',
        startAndEndDate: 'Start and end date settings',
        start: 'Start',
        end: '~ End',
        noEndDate: 'No end date',
        perDay: 'Per day',
        perWeek: 'Per week(Sun ~ Sat)',
        perMonth: 'Per month(1 ~ 31)',
        monday: '월요일',
        tuesday: '화요일',
        wednesday: '수요일',
        thursday: '목요일',
        friday: '금요일',
        saturday: '토요일',
        sunday: '일요일'

      },
      deliverCycle: {
        title: '광고송출주기정의 [ko]',
        schedule: {
          title: 'Schedule [ko]',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다 [ko]',
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
          title: 'Fixed Date [ko]',
          description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다 [ko]',
          allowDates: 'Allow dates',
          delete: 'Delete',
          choose: 'Choose',
          blockDates: 'Block dates',
          selectDatePlaceholder: 'Select date and time [JP]'
        },
        productFiltering: {
          title: 'Product Filtering [ko]',
          description: '해당 캠페인과 연결된 소재(다이나믹 템플릿)내 노출되는 상품의 설정 혹은 조건을 변경하실 수 있습니다. 스크립트가 설치된 경우에 한합니다. [ko]',
          placeholderSelectProductFeed: 'Select Feed [ko]',
          labelId: 'Id [ko]',
          labelName: 'Name [ko]',
          labelPrice: 'Price [ko]',
          items: 'Items',
          deleteAllBtn: 'Delete All [ko]',
          noData: 'No Data [ko]',
          checkbox1: '사용자가 최근 본 상품 및 유사상품, 추천상품 위주 노출(DEFAULT)',
          checkbox2: '전날 기준 광고주 사이트의 추천 상품 위주 노출',
          checkbox3: '광고주 지정상품 노출',
          removeAll: 'Remove all [ko]'
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
        desc: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        impressionCount: '회로 설정하며',
        impressionCount2: '마다 초기화',
        excludeCustomerWhoVisitedHomepage: '해당 캠페인을 통해(광고 클릭) 유입(홈페이지 방문)된 고객을 제외합니다.',
        disableAllOptionSetForEnforcementWithExposedAds: '노출형 광고로의 집행을 위해 설정된 모든 옵션을 무력화합니다.(지리정보, 언어, 디바이스 제외)',
        limitExposeAdsToUser: '유저당 광고의 노출 제한을'
      },
      targetGroupControlB: {
        title: 'Target Group Control B',
        description: '지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다',
        selectSpecifiedTarget: '모든 유저에게 광고를 송출합니다',
        setDeliveryConditions: '설정된 기간 내 광고주 사이트에서 활동 이력 보유 유저에게 광고 송출',
        adsSpecifiedTargets: '설정된 기간 내 광고주 사이트에 미방문한 유저에게 광고 송출'
      },
      targetConversionType: {
        title: 'Target Conversion Type',
        desc: '캠페인을 통해 발생하게 되는 전환에 대한 기준을 설정하실 수 있습니다. 기본으로 PurchaseCompete와 Join이 제공되며, Tracking tag메뉴에서 별도 설정이 가능합니다',
        conversionSegment: '전환 구분 선택',
        conversionType: '전환 유형 선택',
        errorConversionType: '목적에 따라 상세히',
        errorConversionSegment: '목적에 따라 상세히',
        join: '회원가입(Join) (Default)',
        purchaseComplete: 'PurchaseComplete',
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
        sendToAllGrade: '모든 Grade에게 송출합니다.(default)',
        sendToSpecificGrade: '특정 Grade에 한해 광고를 송출합니다'
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
        description: '광고가 송출되는 기간에대해요일 혹은 시간 단위로 설정가능하며, 이를 통해광고 송출흘 제어하실 수 있습니다',
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
        selectDefault: '모든 Group에게 송출합니다.(default)',
        selectCustom: '특정 Group에 한해 광고를 송출합니다.'
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
        cpm: '가중치 (CPM)',
        cpmr: '가중치 (CPC/CPM-R)'
      }
    },

    stepMatchCreatives: {
      title: 'Match creatives[ko] ',
      targetingReachPrediction: 'Targeting Reach Prediction [ko]',
      estimatedUV: 'EstimatedUV [ko]'
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
      custom: 'Columns [ko]',
      segment: 'Segment [ko]',
      addAllColumns: 'Add all columns [ko]',
      added: 'Added [ko]',
      accountName: 'Account name [ko]',
      remove: 'Remove [ko]',
      saveThisSet: 'Save this set of columns [ko]',
      apply: 'Apply [ko]',
      cancel: 'Cancel [ko]'
    },
    reportingDateSelection: {
      today: 'Today [ko]: ',
      yesterday: 'Yesterday [ko]: ',
      thisWeek: 'This week [ko]: ',
      lastWeek: 'Last week [ko]: ',
      last14Days: 'Last 14 days [ko]: ',
      last7Days: 'Last 7 days [ko]:',
      last30Days: 'Last 30 days [ko]: ',
      thisMonth: 'This month [ko]: ',
      lastMonth: 'Last month [ko]: ',
      last3Month: 'Last 3 month [ko]: ',
      last6Month: 'Last 6 month [ko]: ',
      thisYear: 'This year [ko]: ',
      lastYear: 'Last year [ko]: ',
      specificDate: 'Specific date [ko]',
      specificStartDate: 'Specific start date [ko]',
      specificEndDate: 'Specific end date [ko]',
      apply: 'Apply [ko]'
    },
    select: 'Select [ko]',
    columnsNameEmpty: 'Please input columns name [ko]',
    columnsEmpty: 'You have not selected the column [ko]',
    count: 'Count [ko]',
    deleteSetOfColumnSuccess: 'Deleted successfully [ko]',
    deleteSetOfColumnFailed: 'Deleted failed [ko]',
    saveSetOfColumnSuccess: 'Save successfully [ko]',
    saveSetOfColumnFailed: 'Save failed [ko]',
    loadColumnMaterialsFailed: 'Load column materials failed [ko]',
    loadListColumnsFailed: 'Load list of column failed [ko]',
    loadSetOfColumnsFailed: 'Load set of columns failed [ko]',
    loadDefaultColumnsFailed: 'Load default columns failed [ko]'
  },
  creativeLink: {
    createList: 'Creative List [ko]',
    createListDescription: 'A description or something like that [ko]',
    linkCampaignWithCreatives: 'Link campaign with creatives [ko]',
    linkCreativesWithACampaign: 'Link creatives with a campaign [ko]',
    linkWithCampaign: 'Link with campaign [ko]',
    labelStatus: 'Status [ko]',
    labelName: 'Name [ko]',
    labelType: 'Type [ko]',
    labelSize: 'Size [ko]',
    labelPreview: 'Preview [ko]',
    labelBackgroundColor: 'BG Color [ko]',
    labelLinkedCampaignCount: 'Linked Campaign Count [ko]',
    labelInspectionStatus: 'Inspection status [ko]',
    targetingGoal: 'Targeting Goal [ko]',
    targetingType: 'Targeting Type [ko]',
    adGroupName: 'Ad group name [ko]',
    campaignName: 'Campaign name [ko]',
    labelCampaignGoal: 'Campaign Goal [ko]',
    labelCampaignTargetType: 'Targeting Type [ko]',
    labelCampaignName: 'Campaign Name [ko]',
    labelCampaignCreatedDate: 'Created Date [ko]',
    messageNoCampaignSelected: '연결하고자 하는 캠페인을 1개 이상 선택하여 주시기 바랍니다'
  },
  dailyReporting: {
    allCampaigns: '모든 캠페인',
    search: '검색',
    download: 'Download [ko]'
  }
}

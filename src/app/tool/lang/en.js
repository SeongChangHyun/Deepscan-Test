export default {
  productFeed: {
    stateSummary: 'State summary',
    feedSetting: 'Feed setting',
    addProductFeed: 'Add product feed',
    deleteProductFeed: 'Delete',
    defautlSetting: 'Defautl Setting',
    additionalOptions: 'Additional options',
    usageStatus: 'Usage Status',
    feedName: 'Feed Name',
    currency: 'Currency',
    fullFeedUrl: 'Full feed URL',
    schedule: 'Schedule',
    check: 'Check',
    feedNamePlacehoder: 'Enter a feed name for your dynamic creatives',
    fullFeedUrlPlacehoder: 'Enter a feed URL(need duplicates check)',
    addingFeedURL: 'Adding feed URL',
    crawlStartEveryHourOnTime: 'Crawl Start Every Hour On Time',
    soldoutFeedURL: 'Soldout Feed URL',
    feedGroupName: 'Feed group name ',
    feedGroupNamePlacehoder: 'Enter a name for feed group',
    setFeedToExtraGroup: 'Set Feed To Extra Group',
    selectGroup: 'Select group',
    urlPattern: 'URL pattern',
    desktopWebsite: 'Desktop Webstite',
    desktopWebsitePlacehoder: 'http://www.widerplanet.com/prdNo={product_id}',
    mobileWebsite: 'Mobile website',
    mobileWebsitePlacehoder: 'http://m.widerplanet.com/prdNo={product_id}',
    androidApp: 'Android app',
    androidAppPlacehoder: 'widerplanetandroidapp://prdNo={product_id}',
    iOSApp: 'iOS app',
    iOSAppPlacehoder: 'widerplanetiosapp://prdNo={product_id}',
    clickURLParameter: 'Click URL parameter',
    impressionURLParameter: 'Impression URL parameter',
    advancedSettings: 'Advanced Settings (Super-admin only)',
    preview: 'Preview',
    currencyMarking: 'Currency marking [en]',
    feedType: 'Feed type',
    detection: 'Detection',
    encodingType: 'Encoding type',
    regularExpression: 'Regular Expression',
    existingValue: 'Existing Value',
    changedValue: 'Changed Value',
    create: 'Create',
    cancel: 'Cancel',
    search: 'Search...',
    productList: 'Products list :',
    emptyText: 'The collected data does not exist',
    all: 'All',
    id: 'ID',
    name: 'Name',
    numOfRow: 'Number of records displayed per page',
    textDescriptionFeedSetting: 'You can register up to 5 product feed, and you are currently using four. If a creative created through the feed is linked to an active campaign, you will not be able to delete it. If there are no active campaign in your advertiser account in the last 3 month, the information will be removed and we will not try to crawl it later.',
    trackingTag: {
      trackingTag: 'Tracking Tag',
      total: 'Total',
      stateSummary: 'State summary',
      collectedInformation: 'Collected information',
      customTag: 'Custom tag',
      tagGuide: 'Tag guide',
      generateBtn: 'Generate Tracking Tag',
      downloadFile: 'Download',
      checkAll: 'set (applied).',
      unCheckAll: 'not set',
      checkClickUser: 'User is visiting via ad.',
      unCheckClickUser: 'No history has been visited by the user through the ad.',
      form: {
        customTagName: 'Custom tag name',
        customTagNamePlaceholder: 'Enter a custom tag name for your website',
        rule: 'Rule',
        urlEqualsLabel: 'URL Equals (default)',
        installCustomTagLabel: 'Install custom tag',
        conversion: 'Conversion',
        conversionDefault: 'Conversion (default)',
        conversionGeneral: 'General',
        customValueNamePlaceholder: 'Typing custom value name',
        conversionPlaceholder: 'Select conversion',
        destinationUrl: 'Typing destination URL',
        urlPrepend: 'http://가.com',
        refererUrl: 'Typing referer URL',
        setConversionValue: 'Set a conversion value',
        followingInformation: 'Please copy and paste the following information into the page where you want to install the custom tag.',
        followingInformationPlaceholder: 'Typing following information',
        validateUrlMessage: 'Please input correct value',
        pcWeb: 'PC-Web',
        mobileWeb: 'Mobile-web'
      },
      table: {
        status: 'Status',
        customTagName: 'Custom tag name',
        rule: 'Rule',
        category: 'Category',
        createData: 'Create data',
        checkedData: 'Checked data',
        action: 'Action',
        used: 'Used',
        unused: 'Unused'
      }
    },
    noData: 'No data',
    messageConfirmDeleteFeedSetting: 'Are you sure you want to delete this Feed Setting? This action cannot be undone.',
    yes: 'Yes',
    no: 'No',
    warning: 'Warning',
    validateMessage: {
      feedName: 'Feed name is required.',
      feedNameHint: 'Enter a feed name for your dynamic creatives',
      fullFeedURL: 'Full feed URL is required',
      feedURLUnique: 'The URL you entered is already a registered feed URL. Please check again',
      feedURLValid: 'This feed URL can be registed',
      fullFeedFileName: 'There is no feed files for the entered full feed URL. Please check again',
      fullFeedUrlDB: 'There is no feed files for the entered full feed URL in the DB. Please check again.',
      addingFeedUrlDB: 'There is no feed files for the entered adding feed URL in the DB. Please check again.',
      addingFeedFileName: 'There is no feed files for the entered adding feed URL in the DB. Please check again',
      soldoutFeedUrlDB: 'There is no feed files for the entered soldout feed URL in the DB. Please check again.',
      startHttpAndHttps: 'must start with http:// or https://.',
      soldoutFeedFileName: 'There is no feed files for the entered soldout feed URL in the DB. Please check again',
      checkFullFeedURL: 'Check Full Feed URL Fail',
      checkAddingFeedURL: 'Check Adding Feed URL Fail',
      checkSoldoutFeedURL: 'Check Soldout Feed URL Fail',
      changeValue: 'Change value is required',
      submitFormFail: 'Submit Form Feed Setting Fail',
      scheduleValid: 'Please select at least 1 crawl time on the Schedule',
      isCheckFullFeedUrl: 'You must check the full feed url'
    },
    stateSummaryErrorMessage: {
      feedSummaryData: 'Get Feed Summary Data Fail',
      productListData: 'Get Product List Data Fail',
      suggestListData: 'Get Suggest List Data Fail'
    }
  },
  trackingTag: {
    tagGuide: {
      description: 'Please copy and paste the following information to the page where you want to install [',
      siteType: 'Site type',
      tagGuide: 'Tag guide',
      standaloneInstallation: 'Standalone installation(default)',
      platformSystemBase: 'Platform system base',
      selectPlatformProvider: 'Select platform provider',
      selectAllTrackingTags: 'Select all tracking tag',
      pcWeb: 'PC-Web',
      mobileWeb: 'Mobile-Web',
      platforms: {
        cafe_24: 'Cafe24',
        make_shop: 'MakeShop',
        godo_mall: 'GodoMall',
        whois_mall: 'WhoisMall',
        wisa_mall: 'WisaMall',
        gabia: 'Gabia'
      }
    },
    customTag: {
      errorMessage: {
        msgDestinationUrlExist: 'DestinationUrl already exists'
      },
      check: 'Check',
      errMsgEmpty: 'Empty value is not allowed',
      errMsgAlreadyExist: 'Already exist!',
      errMsgCallAPIFailed: 'Cannot call api',
      successMsgValidValue: 'Valid Destination Url',
      trackingTagCreatedSuccessfully: 'Created Successfully',
      errMsgLimitationViolate: 'Cannot create new tracking tag due to limitation 20',
      validateValueMessage: 'Please input correct value'
    }
  }
}

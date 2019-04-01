import auth from '@/app/auth/lang/en'
import campaign from '@/app/campaign/lang/en'
import memberAccount from '@/app/account-and-billing/lang/en'
import creatives from '@/app/creatives/lang/en'

export default {
  ...auth,
  ...memberAccount,
  ...creatives,
  route: {
    dashboard: 'Dashboard',
    accountsBilling: 'Accounts & Billing',
    myInformation: 'My Information',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    creatives: 'Creatives',
    listCreative: 'List Creative',
    listCi: 'List CI',
    campaign: 'Campaign',
    campaignManagement: 'Campaign Management',
    createCampaign: 'Create Campaign',
    campaignReporting: 'Campaign Reporting'
  },
  navbar: {
    logout: 'Logout',
    changeLang: 'Change Language',
    infor: 'My Information',
    logOut: 'Log Out',
    dashboard: 'Dashboard'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the sample experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  // button
  btnOk: 'Ok',
  btnNext: 'Next',
  btnCancel: 'Cancel',
  btnImportTemporary: 'Import temporary',
  btnSaveTemporary: 'Save temporary',
  btnDel: 'DEL',

  noData: 'No data',

  targetingType: {
    targeted: 'Targeted',
    excluded: 'Excluded',
    target: 'Target',
    exclude: 'Exclude'
  },

  // Create campaign screen;
  createCampaign: campaign.createCampaign,
  campaignReporting: campaign.campaignReporting
}

import auth from '@/app/auth/lang/en'
import campaign from '@/app/campaign/lang/ja'
import memberAccount from '@/app/account-and-billing/lang/ja'
import creatives from '@/app/creatives/lang/ja'

export default {
  ...auth,
  ...memberAccount,
  ...creatives,
  route: {
    dashboard: 'Dashboard',
    accountsBilling: 'Accounts & Billing [ja]',
    myInformation: 'My Information [ja]',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    creatives: 'Creatives [ja]',
    listCreative: 'List Creative [ja]',
    listCi: 'List CI [ja]',
    campaign: 'Campaign [ja]',
    campaignManagement: 'Campaign Management [ja]',
    createCampaign: 'Create Campaign [ja]',
    campaignReporting: 'Campaign Reporting [ja]'
  },
  navbar: {
    logout: 'Logout [ja]',
    changeLang: 'Change Language [ja]',
    infor: 'My Information [ja]',
    logOut: 'Log Out',
    dashboard: 'Dashboard'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the sample experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  // button
  btnOk: 'Ok [ja]',
  btnNext: 'Next [ja]',
  btnCancel: 'Cancel [ja]',
  btnImportTemporary: 'Import temporary',
  btnSaveTemporary: 'Save temporary',

  // Create campaign screen;
  createCampaign: campaign.createCampaign,
  campaignReporting: campaign.campaignReporting
}

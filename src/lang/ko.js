import auth from '@/app/auth/lang/ko'
import campaign from '@/app/campaign/lang/ko'
import memberAccount from '@/app/account-and-billing/lang/ko'
import creatives from '@/app/creatives/lang/ko'

export default {
  ...auth,
  ...memberAccount,
  ...creatives,
  route: {
    dashboard: 'Dashboard',
    accountsBilling: 'Accounts & Billing [ko]',
    myInformation: 'My Information [ko]',
    listClientsManagement: 'List [ko]',
    detailClientsManagement: 'Detail [ko]',
    createClientsManagement: 'Create [ko]',
    updateClientsManagement: 'Update [ko]',
    clientsManagement: 'Clients Management [ko]',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    creatives: 'Creatives [ko]',
    listCreative: 'List Creative [ko]',
    listCi: 'List CI [ko]',
    campaign: 'Campaign [ko]',
    campaignManagement: 'Campaign Management [ko]',
    createCampaign: 'Create Campaign [ko]',
    campaignReporting: 'Campaign Reporting [ko]'
  },
  navbar: {
    logout: 'Logout [ko]',
    changeLang: 'Change Language [ko]',
    infor: 'My Information [ko]',
    logOut: 'Log Out [ko]',
    dashboard: 'Dashboard [ko]',
    koLang: 'Korean [ko]',
    enLang: 'English [ko]',
    jaLang: 'Japan [ko]'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the sample experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  btnOk: 'Ok [ko]',
  btnNext: 'Next [ko]',
  btnCancel: '취소',
  btnImportTemporary: 'Import temporary [ko]',
  btnSaveTemporary: 'Save temporary [ko]',

  createCampaign: campaign.createCampaign,
  campaignReporting: campaign.campaignReporting,
  creativeLink: campaign.creativeLink
}

export function createClientModel() {
  return {
    client_name: '',
    website_url: '',
    category_code: '',
    postal_code: '',
    address1: '',
    address2: '',
    currency: '',
    email: '',
    cell_phone: '',
    business_phone: '',
    advertiser_terms: '',
    payment_type: 'pre',
    tax_invoice_amount: 'revenue',
    tax_invoice_issuer: null,
    otp: '',
    phone_code: '',
    teAdminUser: null,
    tmAdminUser: null,
    agencyUser: null
  }
}

export function updateClientModel() {
  return {
    client_id: null,
    conversion_user_control: 0,
    hcuid_control: 0,
    ip_blocking: null,
    media_extension: ['m', 'g', 't', 'a', 's', 'e'],
    rta: null,
    user_collect_control: 15552000,
    valid_click_in_session: false,
    valid_click_period: 0,
    valid_impression_in_session: false,
    valid_impression_period: 0,
    valid_play_in_session: false,
    valid_play_period: 0,
    settable: null,
    agreeTermsDate: null,
    approval_status: null
  }
}

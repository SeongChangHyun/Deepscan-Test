import { isValidURL } from '@/utils/creative'

/**
 * Created by nvquang on 22/02/2019.
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* Lower case letters*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* uppercase letter*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* Uppercase and lowercase letters*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* Number letters*/
export function validNumber(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/* Special symbol letters*/
export function validSpecialSymbol(str) {
  const reg = /^[!@#$%^&*(),.?":{}|<>]+$/
  return reg.test(str)
}

/**
 * validate password
 * @param password
 * @returns {boolean}
 */
export function validPassword(password) {
  let flag = true
  for (const char of password.split('')) {
    if (!(/[a-z]/.test(char)) &&
      !(/[A-Z]/.test(char)) &&
      !(/[0-9]/.test(char)) &&
      !(/[!@#$%^&*(),.?":{}|<>]/.test(char))) {
      // if any character in password is NOT alphabet, numbers or special symbols -> false
      flag = false
      break
    }
  }
  return /[a-z]/.test(password) && // lowercase
    /[A-Z]/.test(password) && // uppercase
    /[0-9]/.test(password) && // number
    /[!@#$%^&*(),.?":{}|<>]/.test(password) && // Special symbol
    flag
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validEmailFormat(email) {
  const re = /^[a-zA-Z0-9\"][a-zA-Z0-9_\.\-\+\"]{0,19}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9_\-\+]{2,4}){1,3}$/
  if (email.indexOf('..') > -1) {
    return false
  }
  if (email.indexOf('--') > -1) {
    return false
  }
  if (email.indexOf('__') > -1) {
    return false
  }
  return re.test(email)
}

/* validate type file*/
export function validTypeFile(file) {
  const exts = ['.pdf', '.jpg', '.gif', '.png', '.jpeg']
  return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(file.name.toString().toLowerCase())
}

export function validFormWebUrl(rule, value, callback) {
  if (!value.trim()) {
    callback(new Error(this.$t('memberAccount.errMsg1', { fieldName: this.$t('client.webUrl') })))
    return
  }
  if (value.toLowerCase().indexOf('http://') === -1 && value.toLowerCase().indexOf('https://') === -1) {
    callback(new Error(this.$t('client.errWeb', {
      fieldName: this.$t('client.webUrl')
    })))
    return
  }
  if (!isValidURL(value)) {
    callback(new Error(this.$t('client.incorrectURLFormat')))
    return
  }
  callback()
}

export function validFormEmail(rule, value, callback) {
  if (value.trim() === '') {
    callback(new Error(this.$t('client.errEmail1')))
  }
  const emailName = value.trim().substring(0, value.lastIndexOf('@'))
  if (Buffer.byteLength(emailName, 'shift_jis') > 20) {
    callback(new Error(this.$t('client.errEmail2')))
  }
  if (Buffer.byteLength(value.trim(), 'shift_jis') > 30) {
    callback(new Error(this.$t('client.errMsgLimit', { fieldName: this.$t('client.email'), num: 30 })))
  }
  if (!validEmailFormat(value)) {
    callback(new Error(this.$t('client.errEmail2')))
  }
  callback()
}

export function formatNumberEvent(e) {
  e.target.value = e.target.value.replace(/[^0-9]/g, '')
}

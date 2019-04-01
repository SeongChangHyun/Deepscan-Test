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
export function validPassword(str) {
  return /[a-z]/.test(str) && // lowercase
    /[A-Z]/.test(str) && // uppercase
    /[0-9]/.test(str) && // number
    /[!@#$%^&*(),.?":{}|<>]/.test(str) // Special symbol
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

/* validate type file*/
export function validTypeFile(file) {
  const exts = ['.pdf', '.jpg', '.gif', '.png']
  console.log((new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(file.name))
  return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(file.name)
}

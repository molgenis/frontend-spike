/**
 * Based on:
 * https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
 */

export function setCookie (name, value, days) {
  const expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + '=' + value + ';path=/;secure: false;expires=' + expirationDate.toUTCString()
}

export function deleteCookie (name) {
  setCookie(name, '', -1)
}

// Extracts a value by key in a "key=value; key=value2;" list
export function findValueInList (haystack, needle) {
  const capturingGroupOffset = 2
  let value = haystack.match('(^|;) ?' + needle + '=([^;]*)(;|$)')
  return value ? value[capturingGroupOffset] : null
}

export default {
  setCookie, deleteCookie, findValueInList
}

import { writable, derived, get } from 'svelte/store'

let fallbackLocale = 'en'
let initialLocale = localStorage.getItem('locale')

if (initialLocale == null || initialLocale == 'null') {
  initialLocale = fallbackLocale
}

export const dict = writable()
export const locale = writable(initialLocale)
const fallbackDict = derived(dict, ($dict) => {
  return $dict[fallbackLocale]
})

locale.subscribe((val) => localStorage.setItem('locale', val))

const localizedDict = derived([dict, locale], ([$dict, $locale]) => {
  if (!$dict || !$locale) return
  return $dict[$locale]
})

const getMessageFromLocalizedDict = (id, localizedDict, params) => {
  const splitId = id.split('.')
  let message = { ...localizedDict }

  splitId.forEach((partialId) => {
    message = message[partialId]
  })

  if (message == null) {
    message = getMessageFromFallback(id)
  }
  if (params != null) {
    message = replaceParams(message, params)
  }
  return message
}

const getMessageFromFallback = (id) => {
  const splitId = id.split('.')
  let message = { ...get(dict)[fallbackLocale] }

  splitId.forEach((partialId) => {
    message = message[partialId]
  })
  return message
}

const replaceParams = (message, params) => {
  params.forEach((param) => {
    message = message.replace('%s%', param)
  })
  return message
}

const createMessageFormatter = (localizedDict) => (id, params) =>
  getMessageFromLocalizedDict(id, localizedDict, params)

export const t = derived(localizedDict, ($localizedDict) => {
  return createMessageFormatter($localizedDict)
})

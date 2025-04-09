import { I18nStore } from '@i18nlite/core'
import { makeI18n } from '@i18nlite/svelte'

const languages = ['en-us'] as const

type Languages = (typeof languages)[number]

const store = new I18nStore(languages as unknown as Languages[])

export const { useLanguage, useTranslate } = makeI18n(store)

export function defineLiterals<T extends Record<string, string>>(
  literals: Record<Languages, T>,
): Record<Languages, T> {
  return literals
}

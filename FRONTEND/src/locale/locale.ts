import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { requestFullLocaleList } from '../api/locale'
import { locale } from '../types/app'

let isolatedT: Function
const fetchAndGenerateLocaleList = async () => {
    const { data }: { data: locale[] } = await requestFullLocaleList()
    return data.reduce(
        (prev, next) => {
            prev.ko = { ...prev.ko, [next.msgKey]: next.ko_text }
            prev.jp = { ...prev.jp, [next.msgKey]: next.jp_text }
            prev.en = { ...prev.en, [next.msgKey]: next.en_text }
            return prev
        },
        { ko: {}, jp: {}, en: {} },
    )
}

const createi18nObj = async (langs: { ko: Record<string, string>; jp: Record<string, string>; en: Record<string, string> }) =>
    createI18n({
        legacy: false,
        locale: 'ko',
        fallbackLocale: 'jp',
        messages: langs,
    })

const initI18n = async (app: App<Element>) => {
    const langs = await fetchAndGenerateLocaleList()
    const i18n = await createi18nObj(langs)
    isolatedT = i18n.global.t
    app.use(i18n)
}

export { initI18n, isolatedT }

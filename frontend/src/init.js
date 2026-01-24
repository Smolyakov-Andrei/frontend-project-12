import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru.js'

const i18n = i18next.createInstance()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru,
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

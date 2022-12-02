import { createI18n } from 'vue-i18n'
import en from './messages/en.json'
import ru from './messages/ru.json'

const messages = { en,
  ru }
export const i18n = createI18n({
  locale: 'en',
  messages
})
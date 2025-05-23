import { createI18n } from 'vue-i18n'

const modules = import.meta.glob('./locales/*.json')

// Function to extract the name from the file path
const getName = (data: string): string => data.replace(/.\/locales\/(.*).json/, '$1')

// Use camelCase or snake_case as key names, kebab-case could lead into issues
const messages: { [key: string]: any } = {}
for (const path in modules) {
  modules[path]().then((mod) => {
    messages[getName(path)] = mod
  })
}

export default createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  allowComposition: true,
  messages,
})

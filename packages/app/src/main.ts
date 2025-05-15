import { createUi } from '@baldeweg/ui'
import i18n from './i18n'
import '@baldeweg/ui/styles'
import { createHead } from '@unhead/vue/client'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const theme = () => {
  if (import.meta.env.VITE_APP_THEME === 'false') return

  document.documentElement.innerHTML +=
    '<style>@import "' + import.meta.env.VITE_APP_THEME + '";</style>'
}

theme()

const ui = createUi()
const app = createApp(App)
const head = createHead({
  init: [
    {
      title: 'Home',
      titleTemplate: '%s - js-monorepo-template',
      htmlAttrs: { lang: navigator.language }
    },
  ]
})

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

enableMocking().then(() => {
  app.use(ui)
  app.use(i18n)
  app.use(router)
  app.use(head)

  app.mount('#app')
})

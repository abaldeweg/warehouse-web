import { createUi } from '@baldeweg/ui'
import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router/index.js'
import i18n from './i18n.js'
import '@baldeweg/ui/styles'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

const ui = createUi()
const app = createApp(App)

app.use(ui)
app.use(i18n)
app.use(router)

registerSW()

enableMocking().then(() => app.mount('#app'))

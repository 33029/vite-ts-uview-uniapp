import { createSSRApp } from 'vue'
import App from './App.vue'
import uviewPlus from 'uview-plus'
// modules
import { setupPinia } from '@/modules/pinia'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  // Configure store
  // https://pinia.vuejs.org/
  setupPinia(app)
  app.use(uviewPlus)
  return {
    app,
  }
}

/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import 'vue-toastification/dist/index.css'

import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import Toast, { POSITION } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
}

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.vue`, import.meta.glob<DefineComponent>('../pages/**/*.vue'))
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(Toast, options)
      .mount(el)
  },
})

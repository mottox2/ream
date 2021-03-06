import Vue from 'vue'
import { createServerRouter } from './create-server-router'
import { PageInterface } from './utils'

export function createServerApp({
  originalPath,
  page,
  pageProps,
  _app,
}: {
  originalPath: string
  page: PageInterface
  pageProps: any
  _app: any
}) {
  const App = _app.createApp()
  const router = createServerRouter(originalPath, {
    // @ts-ignore
    render(h: any) {
      return h(App, {
        props: {
          Component: page.default,
          pageProps,
        },
      })
    },
  })
  const app = new Vue({
    router,
    // @ts-ignore
    head: {},
    render(h) {
      return h(
        'div',
        {
          attrs: {
            id: '_ream',
          },
        },
        [h('router-view')]
      )
    },
  })

  if (_app.onCreated) {
    _app.onCreated({ app, router })
  }

  return app
}

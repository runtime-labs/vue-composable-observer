import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'

import { transformComposable } from './transform'
import { type PluginOptions } from './types'
import { DEVTOOLS_ROUTE } from '../constants'
import { renderDevtoolsPage } from '../../../devtools/src/render'

export const VueComposableObserver = createUnplugin(
  (options: PluginOptions = {}) => {
    const filter = createFilter(
      options.include ?? [
        /\.[jt]s$/,
      ],
      options.exclude,
    )

    return {
      name: 'vue-composable-observer',
      vite: {
        configureServer(server) {
          server.middlewares.use(DEVTOOLS_ROUTE, (_, res) => {
            res.setHeader(
              'Content-Type',
              'text/html',
            )

            res.end(
              renderDevtoolsPage()
            )
          })
        }
      },
      transform(code, id) {
        if (!filter(id)) {
          return
        }

        if (
          !id.endsWith('.ts')
        && !id.endsWith('.js')
        ) {
          return
        }

        return transformComposable(code, {importPrefix: options.importPrefix ?? ''})
      },
    }
  })

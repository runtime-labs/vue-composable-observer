import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'

import { transformComposable } from './transform'
import { type PluginOptions } from './types'

export const VueComposableObserver = createUnplugin(
  (options: PluginOptions = {}) => {
    const filter = createFilter(
      options.include ?? [
        /\.[jt]s$/,
      ],
      options.exclude,
    )

    return {
      name: '@runtime-labs/composable-observer',
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

        return transformComposable(
          code,
          id,
          { importPrefix: options.importPrefix ?? '' },
        )
      },
    }
  })

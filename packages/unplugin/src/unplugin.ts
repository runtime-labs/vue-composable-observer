import { createUnplugin } from 'unplugin'

import { transformComposable } from './transform'

export const VueComposableObserver = createUnplugin(() => {
  return {
    name: 'vue-composable-observer',
    transform(code, id) {
      if (
        !id.endsWith('.ts')
        && !id.endsWith('.js')
      ) {
        return
      }

      return transformComposable(code)
    },
  }
})
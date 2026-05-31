import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/unplugin/index',
    'src/vue/index',
  ],
  declaration: true,
  clean: true,
})

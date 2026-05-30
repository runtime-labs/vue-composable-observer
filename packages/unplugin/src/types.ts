import { type FilterPattern } from 'unplugin'

export interface FoundComposable {
  name: string

  exportStart: number
  exportEnd: number

  functionStart: number
  functionEnd: number
}

export interface PluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

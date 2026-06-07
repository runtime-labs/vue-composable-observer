import { type Tag } from '../types'

const FILE_TAG_COLORS = {
  textColor: 0x555555,
  backgroundColor: 0xeeeeee,
} as const

const COUNT_TAG_COLORS = {
  textColor: 0x236e9c,
  backgroundColor: 0xe1f0fa,
} as const

export function fileTag(file?: string): Tag[] {
  if (!file) {
    return []
  }

  return [{
    label: file.split('/').pop() ?? file,
    tooltip: file,
    ...FILE_TAG_COLORS,
  }]
}

export function countTag(count: number): Tag[] {
  return [{
    label: String(count),
    ...COUNT_TAG_COLORS,
  }]
}

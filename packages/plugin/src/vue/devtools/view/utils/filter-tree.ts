import { type Node } from '../types'

export function filterTree(nodes: Node[], filter: string): Node[] {
  const query = filter.trim().toLowerCase()

  if (!query) {
    return nodes
  }

  return nodes.reduce<Node[]>((matched, node) => {
    const isMatch = node.label.toLowerCase().includes(query)
    const children = isMatch ? node.children : filterTree(node.children, filter)

    if (isMatch || children.length > 0) {
      matched.push({ ...node, children })
    }

    return matched
  }, [])
}

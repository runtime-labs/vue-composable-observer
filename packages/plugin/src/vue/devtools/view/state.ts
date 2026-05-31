import { type InspectorView } from './types'

let currentView: InspectorView = 'flat'

export function getCurrentView() {
  return currentView
}

export function setCurrentView(view: InspectorView) {
  currentView = view
}

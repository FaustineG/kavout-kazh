export interface Action {
  cat: string
  from: string
  to: string
  comment: string
  by: string
}

export interface HistoryAction {
  id: string
  timestamp: string
  action: Action
}

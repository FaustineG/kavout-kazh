export interface HistoryAction {
  cat_id: string
  cat_name: string
  where_from: string
  where_to: string
  comment: string
  by_user: string
  action_id: string
  timestamp: string
}

export interface MoveCatPayload {
  where_to: string
  by_user: string
  timestamp: string
}

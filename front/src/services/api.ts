import type { HistoryAction, MoveCatPayload } from '@/models/action'
import type { Cat } from '@/models/cat'
import type { CatState } from '@/models/state'

const API_URL = `${import.meta.env.VITE_API_URL}/api`

export const getHistoryActions = (filters: { limit: number | null }): Promise<HistoryAction[]> =>
  fetch(`${API_URL}/actions?limit=${filters.limit}`).then((res) => res.json())

export const getCatState = (catId: string): Promise<CatState> =>
  fetch(`${API_URL}/state/${catId}`).then((res) => res.json())

export const getCats = (): Promise<Cat[]> => fetch(`${API_URL}/cats`).then((res) => res.json())

export const moveCat = async (cat_id: string, payload: MoveCatPayload) => {
  const actionId = await fetch(`${API_URL}/action`, {
    method: 'POST',
    body: JSON.stringify({ cat_id, ...payload }),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
  return actionId
}
export const switchCats = async ({ by_user, cats }: { by_user: string; cats: Cat[] }) => {
  const actionId = await fetch(`${API_URL}/action:switch`, {
    method: 'POST',
    body: JSON.stringify({ by_user, cats }),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
  return actionId
}

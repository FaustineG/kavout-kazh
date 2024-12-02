import type { HistoryAction, MoveCatPayload } from '@/models/action'
import type { Cat } from '@/models/cat'
import type { CatState } from '@/models/state'

const API_URL = import.meta.env.VITE_API_URL

export const getHistoryActions = (): Promise<HistoryAction[]> =>
  fetch(`${API_URL}/actions`).then((res) => res.json())

export const getCatState = (catId: string): Promise<CatState> =>
  fetch(`${API_URL}/state/${catId}`).then((res) => res.json())

export const getCats = (): Promise<Cat[]> => fetch(`${API_URL}/cats`).then((res) => res.json())

export const moveCat = (catId: string, payload: MoveCatPayload) => {
  fetch(`${API_URL}/action`, {
    method: 'POST',
    body: JSON.stringify({ cat_id: catId, ...payload }),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
}

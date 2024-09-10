const API_URL = 'http://localhost:3000'

export const getHistoryActions = () => fetch(`${API_URL}/actions`).then((res) => res.json())
export const getCurrentState = () => fetch(`${API_URL}/state`).then((res) => res.json())
export const getCats = () => fetch(`${API_URL}/cats`).then((res) => res.json())

import { ref, watch } from 'vue'

export const useUser = () => {
  const currentUser = ref('')

  const saveUserLocal = () => {
    localStorage.setItem('user', currentUser.value)
  }

  const loadUserLocal = () => {
    currentUser.value = localStorage.getItem('user') ?? ''
    console.log(currentUser.value)
  }
  watch(currentUser, saveUserLocal)
  return { currentUser, loadUserLocal }
}

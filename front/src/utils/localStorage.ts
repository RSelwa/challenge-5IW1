export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
  triggerEventLocalStorageUpdated(key, value)
}
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
  triggerEventLocalStorageUpdated(key, "")
}

const triggerEventLocalStorageUpdated = (key: string, value: any) => {
  const event = new CustomEvent("local-storage-updated", {
    detail: { key, value: JSON.stringify(value) }
  })
  window.dispatchEvent(event)
}

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

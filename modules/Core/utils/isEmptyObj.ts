export const isEmptyObj = (obj): boolean => {
  if (!obj) return true
  return Object.keys(obj).length === 0
}

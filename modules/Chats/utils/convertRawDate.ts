export const convertRawDate = (dateRaw: string) => {
  const date = new Date(dateRaw)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
  return formattedTime
}

let timer: NodeJS.Timeout | undefined
export function debounce<T extends Function>(cb: T, wait = 20): any {
  const callable = (...args: any): any => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => cb(...args), wait)
  }
  return <T>(<any>callable)
}

function debounce<T, A>(fn: (...args: A[]) => Promise<T>, ms = 0) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  let cancelled = false

  const debounced = (...args: A[]) => {
    cancelled = false
    if (timer) {
      clearTimeout(timer)
    }
    return new Promise<T>(resolve => {
      timer = setTimeout(() => {
        if (!cancelled) {
          resolve(fn(...args))
        }
      }, ms)
    })
  }

  debounced.cancel = function() {
    cancelled = true
  }

  return debounced
}

export default debounce
export { debounce }

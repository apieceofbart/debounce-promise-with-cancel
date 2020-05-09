function debounce<T, A extends Array<unknown>>(fn: (...args: A) => Promise<T>, ms = 0) {
  let lastTimer: ReturnType<typeof setTimeout> | undefined = undefined
  let cancelled = false

  const debounced = (...args: A) => {
    cancelled = false
    if (lastTimer) {
      clearTimeout(lastTimer)
    }
    return new Promise<T>((resolve, reject) => {
      const curTimer = setTimeout(async () => {
        try {
          let res
          if (!cancelled && curTimer === lastTimer) {
            res = await fn(...args)
          }
          if (!cancelled && curTimer === lastTimer) {
            resolve(res)
          }
        } catch (e) {
          reject(e)
        }
      }, ms)
      lastTimer = curTimer
    })
  }

  debounced.cancel = function () {
    cancelled = true
  }

  return debounced
}

export default debounce
export { debounce }

/**
 * @method getLevelPathList
 * @description 获取传入路径的各层级路由列表
 * @param { string } path string
 * @return { string[] } 路由列表
 */

export function getLevelPathList (path) {
  const arr = path.split('/').filter(item => item)
  const keys = []
  if (arr.length <= 1) {
    return keys
  }
  for (let i = 0; i < arr.length; i++) {
    const key = '/' + arr.slice(0, i + 1).join('/')
    keys.push(key)
  }
  return keys
}

/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const throttle = (fn, t) => {
  let last
  let timer
  const interval = t || 100
  return function() {
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}

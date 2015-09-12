/**
 * Vars
 */

const types = ['TIMEOUT', 'INTERVAL', 'RAF', 'CLEAR_TIMEOUT', 'CLEAR_INTERVAL', 'CLEAR_RAF']

/**
 * Timeout
 */

function timeoutMiddleware (api={}) {
  const handle = handler(api)
  return ({dispatch, getState}) => next => effect =>
    types.indexOf(effect.type) !== -1
      ? Promise.resolve(handle(dispatch, effect))
      : next(effect)
}

function handler ({interval=world().setInterval, timeout=world().setTimeout, raf=world().requestAnimationFrame, cancelInterval=clearInterval, cancelTimeout=world().clearTimeout, cancelRaf=world().cancelAnimationFrame}) {

  return function (dispatch, effect) {
    const fn = compose(dispatch, effect.cb)

    switch (effect.type) {
      case 'TIMEOUT':
        return timeout(fn, effect.value)
      case 'RAF':
        return raf(fn)
      case 'INTERVAL':
        return interval(fn, effect.value)
      case 'CLEAR_TIMEOUT':
        return cancelTimeout(effect.value)
      case 'CLEAR_INTERVAL':
        return cancelInterval(effect.value)
      case 'CLEAR_RAF':
        return cancelRaf(effect.value)
    }
  }
}

function world () {
  return typeof window === 'undefined'
    ? global
    : window
}

function compose (...fns) {
  return fns.reduce((memo, fn) => arg => memo(fn(arg)), arg => arg)
}

/**
 * Exports
 */

export default timeoutMiddleware

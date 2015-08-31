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
      ? handle(effect)
      : next(effect)
}

function handler ({interval=world().setInterval, timeout=world().setTimeout, raf=world().requestAnimationFrame, cancelInterval=clearInterval, cancelTimeout=world().clearTimeout, cancelRaf=world().cancelAnimationFrame}) {
  return function (effect) {
    switch (effect.type) {
      case 'TIMEOUT':
        return timeout(effect.cb, effect.value)
      case 'RAF':
        return raf(effect.cb)
      case 'INTERVAL':
        return interval(effect.cb, effect.value)
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

/**
 * Exports
 */

export default timeoutMiddleware

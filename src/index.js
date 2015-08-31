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

function handler ({interval=setInterval, timeout=setTimeout, raf=requestAnimationFrame, cancelInterval=clearInterval, cancelTimeout=clearTimeout, cancelRaf=cancelAnimationFrame}) {
  return function (effect) {
    switch (effect.type) {
      case 'TIMEOUT':
        return setTimeout(effect.cb, effect.value)
      case 'RAF':
        return requestAnimationFrame(effect.cb)
      case 'INTERVAL':
        return setInterval(effect.cb, effect.value)
      case 'CLEAR_TIMEOUT':
        return cancelTimeout(effect.value)
      case 'CLEAR_INTERVAL':
        return cancelInterval(effect.value)
      case 'CLEAR_RAF':
        return cancelRaf(effect.value)
    }
  }
}

/**
 * Exports
 */

export default timeoutMiddleware

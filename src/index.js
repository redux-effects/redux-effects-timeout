/**
 * Vars
 */

const types = ['TIMEOUT', 'INTERVAL', 'RAF', 'CLEAR_TIMEOUT', 'CLEAR_INTERVAL', 'CLEAR_RAF']

/**
 * Timeout
 */

function timeoutMiddleware (api={}) {
  const handle = handler(api)
  return ({dispatch, getState}) => next => action =>
    types.indexOf(action.type) !== -1
      ? Promise.resolve(handle(dispatch, action))
      : next(action)
}

function handler ({interval=world().setInterval, timeout=world().setTimeout, raf=world().requestAnimationFrame, cancelInterval=clearInterval, cancelTimeout=world().clearTimeout, cancelRaf=world().cancelAnimationFrame}) {

  return function (dispatch, action) {
    const fn = compose(dispatch, action.payload.cb)

    switch (action.type) {
      case 'TIMEOUT':
        return timeout(fn, action.payload.value)
      case 'RAF':
        return raf(fn)
      case 'INTERVAL':
        return interval(fn, action.payload.value)
      case 'CLEAR_TIMEOUT':
        return cancelTimeout(action.payload.value)
      case 'CLEAR_INTERVAL':
        return cancelInterval(action.payload.value)
      case 'CLEAR_RAF':
        return cancelRaf(action.payload.value)
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

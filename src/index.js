/**
 * Action types
 */

const TIMEOUT = 'TIMEOUT'
const INTERVAL = 'INTERVAL'
const RAF = 'RAF'
const CLEAR_TIMEOUT = 'CLEAR_TIMEOUT'
const CLEAR_INTERVAL = 'CLEAR_INTERVAL'
const CLEAR_RAF = 'CLEAR_RAF'

/**
 * Vars
 */

const types = [TIMEOUT, INTERVAL, RAF, CLEAR_TIMEOUT, CLEAR_INTERVAL, CLEAR_RAF]

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
      case TIMEOUT:
        return timeout(fn, action.payload.value)
      case RAF:
        return raf(fn)
      case INTERVAL:
        return interval(fn, action.payload.value)
      case CLEAR_TIMEOUT:
        return cancelTimeout(action.payload.value)
      case CLEAR_INTERVAL:
        return cancelInterval(action.payload.value)
      case CLEAR_RAF:
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
 * Action creators
 */

function raf (cb) {
  return {
    type: RAF,
    payload: {
      cb
    }
  }
}

function timeout (cb, ms) {
  return {
    type: TIMEOUT,
    payload: {
      cb,
      value: ms
    }
  }
}

function interval (cb, ms) {
  return {
    type: INTERVAL,
    payload: {
      cb,
      value: ms
    }
  }
}

function cancelTimeout (id) {
  return {
    type: CLEAR_TIMEOUT,
    payload: {
      value: id
    }
  }
}

function cancelInterval (id) {
  return {
    type: CLEAR_INTERVAL,
    payload: {
      value: id
    }
  }
}

function cancelAnimationFrame (id) {
  return {
    type: CLEAR_RAF,
    payload: {
      value: id
    }
  }
}

/**
 * Exports
 */

export default timeoutMiddleware
export {
  raf,
  timeout,
  interval,
  cancelTimeout,
  cancelInterval,
  cancelAnimationFrame
}

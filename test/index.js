/**
 * Imports
 */

import test from 'tape'
import timeout from '../src'

/**
 * Tests
 */

test('should work', ({pass, plan}) => {
  run({type: 'TIMEOUT', payload: {value: 20, cb: () => pass()}})
  plan(1)
})

function run (effect) {
  return timeout()({dispatch: () => {}, getState: () => {}})(() => {})(effect)
}

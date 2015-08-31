/**
 * Imports
 */

import test from 'tape'
import timeout from '../src'

/**
 * Tests
 */

test('should work', () => {
  run({type: 'TIMEOUT', value: 20, cb: () => pass()})
})

function run (effect) {
  return timeout()({dispatch: () => {}, getState: () => {}})(() => {})(effect)
}

# redux-effects-timeout

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Driver and set of action creators for timing related effects in [redux-effects](https://github.com/redux-effects/redux-effects).

## Installation

    $ npm install redux-effects-timeout

## Usage

### Middleware

To install the middleware, just do this:

```javascript
import timeout from 'redux-effects-timeout'

applyMiddleware(timeout)(createStore)
```

### Action creators

  * `raf(cb)` - execute `cb` on the next animation frame
  * `timeout(cb, ms)` - execute `cb` in `ms` milliseconds
  * `interval(cb, ms)` - execute `cb` every `ms` milliseconds
  * `cancelTimeout(id)` - cancel the timeout specified by `id`
  * `cancelInterval(id)` - cancel the interval specified by `id`
  * `cancelAnimationFrame(id)` - cancel the animation frame callback specified by `id`

Each of the first three methods returns an `id` (which may then be passed to each of the latter three, respectively) to any handlers in `.meta.steps`.

```javascript
import {interval, cancelInterval} from 'redux-effects-timeout'
import {createAction} from 'redux-actions'
import bind from 'bind-effect'

function startCounting () {
  return bind(interval(incrementCounter, 1000), id => intervalCreated)
}

function stopCounting (id) {
  return cancelInterval(id)
}

const intervalCreated = createAction('INTERVAL_CREATED')

// ... in your state reducer:

function reduce (state, action) {
  if (action.type === 'INTERVAL_CREATED') {
    state = {...state, intervalId: action.payload}
  }

  return state
}
```

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

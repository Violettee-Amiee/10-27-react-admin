import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

let middleware = applyMiddleware(thunk)

// 判断是开发环境还是生产环境
if(process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools(middleware)
}


export default createStore(reducers,middleware)
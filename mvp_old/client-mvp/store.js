import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './app/reducers'
import rootSaga from './app/sagas'
import logger from "redux-logger"

const sagaMiddleware = createSagaMiddleware()

function StoreConfiguration(preloadedState) {

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass`preloadedState`
   * when creating the store.
   */

  var middlewareArray = [sagaMiddleware, logger]

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewareArray)
  )

  /**
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  // run the rootSaga initially
  store.runSagaTask()

  return store
}

export default StoreConfiguration

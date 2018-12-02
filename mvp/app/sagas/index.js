import { fork, all } from 'redux-saga/effects'
import courseWatcher from './courseSaga'
import commonWatcher from './commonSaga'

export default function* rootSaga() {
  yield all([
    fork(courseWatcher),
    fork(commonWatcher),
  ])
}

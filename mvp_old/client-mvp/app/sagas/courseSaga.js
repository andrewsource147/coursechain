import { takeLatest, take, put, call, fork, select, takeEvery, all, apply, cancel } from 'redux-saga/effects'

function* fetchCourse(action) {

}

export default function* userWatcher() {
  yield takeLatest("COURSE.FETCH_COURSES", fetchCourse)
}

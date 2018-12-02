export const courseActionTypes = {
  FETCH_COURSES: 'FETCH_COURSES',
  SET_COURSE: 'SET_COURSE',
}

export function setCourse(course) {
  return {
    type: courseActionTypes.SET_COURSE,
    payload: course
  }
}

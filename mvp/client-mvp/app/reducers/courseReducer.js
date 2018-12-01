export const initialState = {
  courses: [
    {
      id: 1,
      name: "Course 1"
    },
    {
      id: 2,
      name: "Course 1"
    }
  ]
};

function courseReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return false;
  }
}

export default courseReducer

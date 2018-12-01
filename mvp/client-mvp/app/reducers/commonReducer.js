export const initialState = {
  error: ''
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case "COMMON.THROW_METAMASK_ERROR": {
      const { err } = action.payload;

      return {
        ...state,
        ...{error: err}
      }
    }
    default:
      return false;
  }
}

export default commonReducer

export const initialState = {
  users: [
    {
      id: 0,
      address: '0x9559034c287a0e73a9a68288bc27eb8189427aa1',
      role: "expert"
    },
    {
      id: 1,
      address: '0x0859A7958E254234FdC1d200b941fFdfCAb02fC1',
      role: "user"
    }
  ]
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return false
  }
}

export default userReducer


const initState = {
  usesrError: null,
  currentUser: '',
  msg: ''
}

const userReducer = (state = initState, action) => {
  switch(action.type){
    case 'DELETE_SUCCESS':
      console.log("action", action);
      return {
        ...state,
        msg: 'User successfully deleted'
      }
    case 'USER_SUCCESS':
      console.log("action", action);
      return {
        ...state,
        currentUser: action.data,
        userError: null
      }

    default:
      return state
  }
};

export default userReducer;

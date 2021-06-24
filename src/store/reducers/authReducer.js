
const initState = {
  authError: null,
  currentUser: localStorage.getItem("currentUser") || '',
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'PASSWORD_RESET_SUCCESS':
      console.log('password reset success', action)
      return {
        ...state,
        authError: null,
      }
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: action.err.message
      }

    case 'LOGIN_SUCCESS':
      console.log('login success', action);
      const data = action.data

      console.log("data", data);

      let usedata = {
        uid: data.uid,
        displayName: data.displayName,
        avatar: data.photoURL,
        email: data.email
      }

      localStorage.setItem("currentUser", JSON.stringify(usedata));

      return {
        ...state,
        currentUser: action.data,
        authError: null
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      localStorage.removeItem("currentUser");
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success', action)
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        currentUser: action.data,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;

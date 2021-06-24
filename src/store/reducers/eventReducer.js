
const initState = {
  eventError: null,
  eventList: []
}

const eventReducer = (state = initState, action) => {
  switch(action.type){
    case 'EVENT_SUCCESS':
      return {
        ...state,
        eventError: null
      }
    case 'EVENT_ERROR':
      return {
        ...state,
        eventError: action.err.message
      }
    case 'NO_EVENT':
      return {
        ...state,
        eventError: 'No Events on selected date!!'
      }

    case 'DELETE_SUCCESS':
      console.log("action", action);
      return {
        ...state,
        eventList: action.data,
        msg: 'User successfully deleted',
        eventError: null
      }

    case 'EVENT_LIST':
      return {
        ...state,
        eventList: action.data,
        eventError: null
      }

    default:
      return state
  }
};

export default eventReducer;

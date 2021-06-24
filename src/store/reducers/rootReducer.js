import authReducer from './authReducer'
import eventReducer from './eventReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  user: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer

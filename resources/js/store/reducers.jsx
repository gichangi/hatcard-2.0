import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import {reducer as userDetails} from "../contexts/AuthContext";
import userReducer from './../reducer/user'

const reducers = combineReducers({
  form: formReducer,
  user: userDetails,
  users: userReducer
});

export default reducers;

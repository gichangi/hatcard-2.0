import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import {reducer as userDetails} from "../contexts/AuthContext";

const reducers = combineReducers({
  form: formReducer,
  user: userDetails
});

export default reducers;

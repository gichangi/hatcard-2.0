import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools, devToolsEnhancer} from 'redux-devtools-extension';

import reducers from './reducers';

/*const store = configureStore({
  reducer: reducers,
  devTools: true
});*/


const store = createStore(reducers, /* preloadedState, */ devToolsEnhancer(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
));

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;

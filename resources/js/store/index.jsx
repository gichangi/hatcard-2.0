// import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { createStore, applyMiddleware } from 'redux';
// import {composeWithDevTools, devToolsEnhancer} from 'redux-devtools-extension';
//
// import reducers from './reducers';
//
// /*const store = configureStore({
//   reducer: reducers,
//   devTools: true
// });*/
//
//
// const store = createStore(reducers, /* preloadedState, */ devToolsEnhancer(
//     // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// ));
//
// export const useSelector = useReduxSelector;
//
// export const useDispatch = () => useReduxDispatch();
//
// export default store;


import { createStore, compose, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import rootReducer from './reducers'



const middleware = [thunk]



const initialState = {}



const store = window.__REDUX_DEVTOOLS_EXTENSION__

    ? createStore(

        rootReducer,

        initialState,

        compose(

            applyMiddleware(...middleware),

            window.__REDUX_DEVTOOLS_EXTENSION__()

        )

    )

    : createStore(

        rootReducer,

        initialState,

        compose(applyMiddleware(...middleware))

    )



export default store;

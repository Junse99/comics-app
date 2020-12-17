import {createStore, applyMiddleware, compose} from 'redux'
import reduxSaga from 'redux-saga'
import rootSaga from './rootSaga'
import rootReducer from './rootReducer' 
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const sagaMiddleware = reduxSaga();

//const middleware = [ sagaMiddleware ];
const rootMiddleware = [ 
    ...getDefaultMiddleware({thunk: false})
    .concat( sagaMiddleware )
    .concat(logger) 
];

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//Agrupa los middlewares

//export const store = createStore( rootReducer, composeEnhancers(applyMiddleware(...middleware)) );
export const store = configureStore({
    reducer: rootReducer, 
    middleware: rootMiddleware
});

sagaMiddleware.run(rootSaga);
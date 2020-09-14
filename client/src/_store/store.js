import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk'

import { authReducer } from './modules/auth/reducer'

const initialState = {};


const reducer = combineReducers({
    authReducer: authReducer,

})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const configureStore = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default configureStore;
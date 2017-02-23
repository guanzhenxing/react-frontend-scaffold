import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'

import app from './app';

/**
 * 合并reducer
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    routing,
    app
});

export default rootReducer

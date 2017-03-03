import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'

import todos from './todos';

/**
 * 合并reducer
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    routing,
    todos
});

export default rootReducer

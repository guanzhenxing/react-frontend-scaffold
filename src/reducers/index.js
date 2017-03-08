import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'


/**
 * 合并reducer
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    routing
});

export default rootReducer

import {routerReducer as route} from 'react-router-redux'
import {combineReducers} from 'redux'

import appReducer from './app'; //系统全局的reducer
/**
 * 合并reducer
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    route,
    app: appReducer
});

export default rootReducer

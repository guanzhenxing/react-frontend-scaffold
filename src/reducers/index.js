import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux'

import app from './app'; //系统全局的reducer
import auth from './auth';   //权限认证的reducer


/**
 * 合并reducer
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    routing: routerReducer,
    app,
    auth,
});

export default rootReducer

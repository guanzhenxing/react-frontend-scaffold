import {routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux'

import app from './app'; //系统全局的reducer
import auth from './auth';   //权限认证的reducer
import team from './team';  //t20team
import dict from './dict';  //字典类型
import teamCluster from './teamCluster';    //项目集群

/**
 * 合并reducer
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    routing: routerReducer,
    app,
    auth,
    team,
    dict,
});

export default rootReducer

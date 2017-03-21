import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
const authUtil = require('./utils/auth-util');

import App from './containers/app/index'
import Login from './containers/login/index'

function authorize(nextState, replaceState, callback) {
    if (!authUtil.isLogin()) {  //如果没有登录，那么跳转到登录页面
        replaceState('/login');
    }
    callback();
}

export default (store) => {
    const history = syncHistoryWithStore(hashHistory, store);
    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/" onEnter={authorize} component={App}>

            </Route>
        </Router>
    )
}




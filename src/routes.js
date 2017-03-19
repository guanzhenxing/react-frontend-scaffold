import React from 'react'
import {Route, Router, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
const authUtil = require('./utils/authUtil');
import App from './containers/app/index'
import Login from './containers/login/index'


function authorize(nextState, replaceState) {
    if (!authUtil.isLogin()) {  //如果没有登录，那么跳转到登录页面
        //replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
}


export const routes = (store) => {
    const history = syncHistoryWithStore(browserHistory, store);
    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/" onEnter={authorize} component={App}>
            </Route>
        </Router>
    )
};




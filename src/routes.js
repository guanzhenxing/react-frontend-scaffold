import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
const authUtil = require('./utils/authUtil');

import App from './containers/app/index'
import Login from './containers/login/index'
import About from './components/About/index'
import Inbox from './components/Inbox/index'

function authorize(nextState, replaceState, callback) {
    if (!authUtil.isLogin()) {  //如果没有登录，那么跳转到登录页面
        // replaceState({nextPathname: nextState.location.pathname}, '/login', nextState.location.query);
    }
    callback()
}

export default (store) => {
    const history = syncHistoryWithStore(hashHistory, store);
    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/" onEnter={authorize} component={App}>
                <Route path="about" component={About}/>
                <Route path="inbox" component={Inbox}/>
            </Route>
        </Router>
    )
}




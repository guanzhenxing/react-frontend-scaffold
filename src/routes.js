import React from 'react'
import {Route, Router, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import App from './containers/App'
import Login from './containers/login/index'


export const routes = (store) => {
    const history = syncHistoryWithStore(browserHistory, store);

    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/">
                <IndexRoute component={App}/>
                <Route path="/app" component={App}/>
            </Route>
        </Router>
    )
};




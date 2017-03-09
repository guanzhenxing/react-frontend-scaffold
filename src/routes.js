import React from 'react'
import {Route} from 'react-router'
import App from './containers/App'

/**
 * 在Root.js中已经存在Router，所以在此处直接使用Route
 */
export default (
    <Route path="/" component={App}>
    </Route>
)


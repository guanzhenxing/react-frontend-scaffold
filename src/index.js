import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './store/configureStore'

// Import root app
import Root from './containers/Root'

// Import CSS reset and Global Styles
import './global-styles';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
);

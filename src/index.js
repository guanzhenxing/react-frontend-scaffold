import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import DevTools from './DevTools'
import GeneralUtil from './utils/generalUtil'
import routes from './routes'
import configureStore from './store/configureStore'
import './global-styles'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

/**
 * 页面主入口
 */
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes}/>
            {GeneralUtil.isProdEnv() ? null : <DevTools />}
        </div>
    </Provider>,
    document.getElementById('root')
);

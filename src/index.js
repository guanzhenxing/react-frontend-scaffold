import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import DevTools from './DevTools'
import {isProdEnv} from './utils/general-util'
import routes from './routes'
import configureStore from './store/configureStore'
import './global-styles'

const store = configureStore();


/**
 * 页面主入口
 */
ReactDOM.render(
    <Provider store={store}>
        <div>
            {routes(store)}
            {isProdEnv() ? null : <DevTools />}
        </div>
    </Provider>,
    document.getElementById('root')
);

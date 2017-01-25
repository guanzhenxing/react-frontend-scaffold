import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import routes from '../routes'
import DevTools from './DevTools'
import GeneralUtil from '../utils/GeneralUtil';

const Root = ({store, history}) => (
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes}/>
            {GeneralUtil.isProdEnv() ? null : <DevTools />}
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import api from '../middlewares/api'
import apiRequester from '../middlewares/apiRequester'
import GeneralUtil from '../utils/GeneralUtil'

import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'


/**
 * store增强
 * @param node_env
 * @returns {*}
 */
const storeEnhancer = () => {
    if (GeneralUtil.isProdEnv()) {  //生产环境配置
        return applyMiddleware(thunk, api, apiRequester)
    } else {    //开发环境配置
        return compose(
            applyMiddleware(thunk, api, apiRequester, createLogger()),
            DevTools.instrument()
        )
    }
};

/**
 * 给开发环境中的webpack替换掉reducers使用
 * @param store
 */
const webpackHotReplaceReducers = store => {

    if (!GeneralUtil.isProdEnv()) {  //开发环境
        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../reducers', () => {
                const nextRootReducer = require('../reducers').default;
                store.replaceReducer(nextRootReducer)
            })
        }
    }

};

/**
 * 配置store
 * @param preLoadedState
 * @returns {Store<S>}
 */
const configureStore = preLoadedState => {

    const store = createStore(
        rootReducer,
        preLoadedState,
        storeEnhancer()
    );

    webpackHotReplaceReducers(store);

    return store
};

export default configureStore



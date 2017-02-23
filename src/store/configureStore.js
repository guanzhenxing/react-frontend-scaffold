import {createStore, applyMiddleware, compose} from 'redux'

import GeneralUtil from '../utils/GeneralUtil'

import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'

import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'


const sagaMiddleware = createSagaMiddleware(); //创建saga中间件

/**
 * store增强
 * @param node_env
 * @returns {*}
 */
const storeEnhancer = () => {
    if (GeneralUtil.isProdEnv()) {  //生产环境配置
        return applyMiddleware(sagaMiddleware)
    } else {    //开发环境配置
        return compose(
            applyMiddleware(sagaMiddleware, createLogger()),
            DevTools.instrument()
        )
    }

};

/**
 * 给开发环境中的webpack替换掉reducers使用
 * @param store
 */
const webpackHotReplaceReducers = store => {
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer)
        })
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
    sagaMiddleware.run(rootSaga);

    if (!GeneralUtil.isProdEnv()) {  //开发环境
        webpackHotReplaceReducers(store);
    }

    return store
};

export default configureStore



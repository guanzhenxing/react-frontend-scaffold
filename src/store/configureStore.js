import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../models'
import GeneralUtil from '../utils/GeneralUtil'
import DevTools from '../DevTools'

const sagaMiddleware = createSagaMiddleware(); //创建saga中间件

/**
 * store增强
 * @param node_env
 * @returns {*}
 */
const storeEnhancer = () => {

    // 定义创建Store时所需要的中间件
    const middleWares = [sagaMiddleware];
    if (GeneralUtil.isDevEnv()) {
        middleWares.concat(createLogger())
    }

    const enhancers = [
        applyMiddleware(...middleWares)
    ];

    return GeneralUtil.isDevEnv() ? compose(...enhancers, DevTools.instrument()) : compose(...enhancers)

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
 * @param initialState
 * @returns {Store<S>}
 */
const configureStore = (initialState = {}) => {

    const store = createStore(
        rootReducer,
        initialState,
        storeEnhancer(),
    );
    sagaMiddleware.run(rootSaga);   //运行sagas

    if (!GeneralUtil.isProdEnv()) {  //开发环境
        webpackHotReplaceReducers(store);
    }

    return store
};

export default configureStore



/**
 * 认证的模型
 * Created by guanzhenxing on 2017-03-17.
 */

//在这边进行业务逻辑处理 （独立到另一个文件中）
import {call, put, takeEvery}  from 'redux-saga/effects'
import * as types from '../constants/action-types'
import {onLoginFetch, onLoginSuccess, onLoginError} from '../actions/auth/auth-action';
// import {getMD5Value} from '../utils/NDMD5Util';
// import {getCurrentUC, getCurrentHost} from  '../utils/config-util';
// import FetchUtil from "../utils/fetch-util";
// import DispatchUtil from '../utils/dispatchUtil';
const authUtil = require('../utils/auth-util');
import {hashHistory} from 'react-router'

/**
 * 获得用户的token
 * @param username
 * @param password
 */
function getToken(username, password) {
    // let user = {
    //     login_name: username,
    //     password: getMD5Value(password)
    // };
    // let url = `${getCurrentUC().url}/tokens`;
    // return FetchUtil.request(url, user, 'POST', false);
}

/**
 * 存储token
 * @param token
 */
function* storeToken(tokens) {
    yield authUtil.setTokens(tokens);
}

/**
 * 获得用户信息
 */
function getUserInfo() {
    // let dispatchParam = {
    //     protocol: 'http',
    //     api: '/auth',
    //     ver: 'v0.1',
    //     host: getCurrentHost().dispatch,
    //     vars: {},
    //     module: "admin"
    // };
    // return new DispatchUtil().dispatch(dispatchParam);
}

/**
 * 存储用户信息
 */
function* storeUserInfo(userInfo) {
    yield authUtil.setUser(userInfo);
}

/**
 * 登录
 * @param user
 */
function* login(data) {
    yield put(onLoginFetch());
    try {
        let username = data.payload.username;
        let password = data.payload.password;
        const tokens = yield call(getToken, username, password);
        yield call(storeToken, tokens);
        const userInfo = yield call(getUserInfo);
        yield call(storeUserInfo, userInfo);
        yield put(onLoginSuccess({tokens, userInfo}));
        hashHistory.push('/');
    } catch (error) {
        yield put(onLoginError(error));
    }
}


export default function*() {
    yield [
        takeEvery(types.LOGIN, login)
    ]
}
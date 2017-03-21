/**
 * 认证的模型
 * Created by guanzhenxing on 2017-03-17.
 */

//在这边进行业务逻辑处理 （独立到另一个文件中）
import {call, put, takeEvery}  from 'redux-saga/effects'
import * as types from '../constants/action-types'
import {onLoginFetch, onLoginSuccess, onLoginError} from '../actions/auth/auth-action';
import CryptoJS from 'crypto-js';
import {getCurrentUC, getCurrentHost} from  '../utils/config-util';
import {request, doGet} from "../utils/fetch-util";
// import DispatchUtil from '../utils/dispatchUtil';
const authUtil = require('../utils/auth-util');
import {hashHistory} from 'react-router'

/**
 * 获得用户的token
 * @param username
 * @param password
 */
function getToken(username, password) {
    let pwd = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);
    let user = {
        login_name: username,
        password: pwd
    };
    let url = `${getCurrentUC().url}/tokens`;
    return request(url, user, 'POST', null, false);
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
function getUserInfo(tokens) {
    let userId = tokens['user_id'];
    let url = `${getCurrentUC().url}/users/${userId}`;
    return doGet(url);
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
    console.log('>>>>>>', data);
    yield put(onLoginFetch());
    try {
        let username = data.payload.username;
        let password = data.payload.password;
        const tokens = yield call(getToken, username, password);
        yield call(storeToken, tokens);
        const userInfo = yield call(getUserInfo, tokens);
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
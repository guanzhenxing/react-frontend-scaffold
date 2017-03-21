/**
 * 认证的Action
 * Created by guanzhenxing on 2017-03-17.
 */

import * as types from '../../constants/actionType';
import {createAction} from '../../utils/actionUtil';
const authUtil = require('../../utils/authUtil');
/**
 * 登录
 * @param user
 * @returns {{type, user: *}}
 */
export function login(user) {
    return createAction(types.LOGIN, user);
}

/**
 * 清除错误
 * @returns {{type}}
 */
export function cleanError() {
    return createAction(types.LOGIN_CLEAN_ERROR);
}

/**
 * 登录开始
 * @returns {{type}}
 */
export function onLoginFetch() {
    return createAction(types.LOGIN_FETCH);
}

/**
 * 登录成功
 * @param res
 * @returns {{type: *, payload: *, error: *, meta: *}}
 */
export function onLoginSuccess(res) {
    return createAction(types.LOGIN_SUCCESS, res);
}

/**
 * 登录失败
 * @param error
 */
export function onLoginError(error) {
    return createAction(types.LOGIN_ERROR, null, error)
}

/**
 * 登出
 * @returns {{type: *, payload: *, error: *, meta: *}}
 */
export function logout() {
    authUtil.setTokens(null);
    authUtil.setAuth(null);
    return createAction(types.LOGOUT)
}

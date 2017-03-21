/**
 * fetch请求的工具类
 * Created by guanzhenxing on 2017-01-25.
 */
import 'whatwg-fetch'

import {encodeURI} from './general-util';
const authUtil = require('./auth-util');
import {getCurrentHost} from './config-util';


/**
 * Parses the JSON returned by a network request
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function _parseJSON(response) {
    return response.json().catch(e => (null));
}

/**
 * 请求
 * @param url
 * @param body
 * @param method
 * @param host
 * @param withAuthToken
 * @returns {*}
 */
export function request(url, body, method, host, withAuthToken = true) {

    let _url = encodeURI(url);
    let _method = method.toUpperCase();
    let _host = host || getCurrentHost().target;

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    };
    if (withAuthToken) {
        headers['Authorization'] = authUtil.getAuthorization(method, url, _host);
    }
    let options = {
        method: _method,
        headers: headers
    };
    if (!['GET', 'HEAD'].includes(_method) && body) {   //为除了GET和HEAD以外的方法配置body
        options['body'] = JSON.stringify(body);
    }

    return doFetch(_url, options);

}


export function doFetch(url, options) {

    return fetch(url, options).then(response => {
        return _parseJSON(response).then(json => ({json, response}));
    }).then(({json, response}) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }).catch(e => {
        throw e;
    });

}

/**
 * 头部带有验证的GET请求
 * @param url 请求地址
 * @returns {*}
 */
export function doGet(url) {
    return request(url, null, 'GET')
}

/**
 * 头部带有验证的PUT请求
 * @param url 请求地址
 * @param data put的数据
 * @returns {*}
 */
export function doPut(url, data) {
    return request(url, data, 'PUT')
}

/**
 * 头部带有验证的POST请求
 * @param url 请求地址
 * @param data post的数据
 * @returns {*}
 */
export function doPost(url, data) {
    return request(url, data, 'POST')
}

/**
 * 头部带有验证的PATCH请求
 * @param url 请求地址
 * @param data patch的数据
 */
export function doPatch(url, data) {
    return request(url, data, 'PATCH')
}

/**
 * 头部带有验证的DELETE请求
 * @param url 请求地址
 * @returns {*}
 */
export function doDelete(url) {
    return request(url, null, 'DELETE')
}



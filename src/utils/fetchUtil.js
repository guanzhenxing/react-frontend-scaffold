/**
 * fetch请求的工具类
 * Created by guanzhenxing on 2017-01-25.
 */
import 'whatwg-fetch'

import GeneralUtil from './generalUtil';
const authUtil = require('./authUtil');
import {getCurrentHost} from './configUtil';

class FetchUtil {

    /**
     * Parses the JSON returned by a network request
     * @param  {object} response A response from a network request
     * @return {object}          The parsed JSON from the request
     */
    static parseJSON(response) {
        return response.json().catch(e => (null));
    }

    /**
     * Requests a URL, returning a promise
     * @param url   请求的URL地址
     * @param body  HTTP请求的数据
     * @param method    HTTP请求的方法
     * @param withAuthToken 是否需要权限认证
     * @returns {*}     The response data
     */
    static request(url, body, method = 'GET', withAuthToken = true) {
        const _url = GeneralUtil.encodeURI(url);
        const _method = method.toUpperCase();
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        };
        if (withAuthToken) {
            headers['Authorization'] = authUtil.getAuthentization(method, url, getCurrentHost().target);
        }
        let options = {
            method: _method,
            headers: headers
        };
        if (!['GET', 'HEAD'].includes(_method) && body) {   //为除了GET和HEAD以外的方法配置body
            options['body'] = JSON.stringify(body);
        }

        return fetch(_url, options).then(response => {
            return this.parseJSON(response).then(json => ({json, response}));
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
    static get(url) {
        return this.request(url, null, 'GET')
    }

    /**
     * 头部带有验证的PUT请求
     * @param url 请求地址
     * @param data put的数据
     * @returns {*}
     */
    static put(url, data) {
        return this.request(url, data, 'PUT')
    }

    /**
     * 头部带有验证的POST请求
     * @param url 请求地址
     * @param data post的数据
     * @returns {*}
     */
    static post(url, data) {
        return this.request(url, data, 'POST')
    }

    /**
     * 头部带有验证的PATCH请求
     * @param url 请求地址
     * @param data patch的数据
     */
    static patch(url, data) {
        return this.request(url, data, 'PATCH')
    }

    /**
     * 头部带有验证的DELETE请求
     * @param url 请求地址
     * @returns {*}
     */
    static delete(url) {
        return this.request(url, null, 'DELETE')
    }


}
export default FetchUtil

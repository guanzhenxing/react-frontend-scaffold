/**
 * fetch请求的工具类
 * Created by guanzhenxing on 2017-01-25.
 */
import 'whatwg-fetch'

import GeneralUtil from './generalUtil';
import AuthTokenUtil from './authTokenUtil';

class FetchUtil {

    /**
     * Parses the JSON returned by a network request
     * @param  {object} response A response from a network request
     * @return {object}          The parsed JSON from the request
     */
    static parseJSON(response) {
        return response.json();
    }


    /**
     * Checks if a network request came back fine, and throws an error if not
     * @param  {object} response   A response from a network request
     * @return {object|undefined} Returns either the response, or throws an error
     */
    static checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
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
            headers['Authorization'] = AuthTokenUtil.getAuthorization();
        }
        let options = {
            method: _method,
            headers: headers
        };
        if (!['GET', 'HEAD'].includes(_method) && body) {   //为除了GET和HEAD以外的方法配置body
            options['body'] = JSON.stringify(body);
        }

        return fetch(_url, options).then(this.checkStatus).then(this.parseJSON);
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
     * 头部带有验证的DELETE请求
     * @param url 请求地址
     * @param data delete的数据
     * @returns {*}
     */
    static delete(url, data) {
        return this.request(url, data, 'DELETE')
    }


}
export default FetchUtil

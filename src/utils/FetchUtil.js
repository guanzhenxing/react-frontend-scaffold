/**
 * fetch请求的工具类
 * Created by guanzhenxing on 2017-01-25.
 */
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();
import GeneralUtil from './GeneralUtil';
import AuthTokenUtil from './AuthTokenUtil';

class FetchUtil {

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
        let settings = {
            method: _method,
            headers: headers
        };
        if (!['GET', 'HEAD'].includes(_method) && body) {   //为除了GET和HEAD以外的方法配置body
            settings['body'] = JSON.stringify(body);
        }
        return fetch(_url, settings).then(response => {
            return response.json().then(json => ({json, response})).catch(err => {
                // 这里的处理是因为有可能请求返回的是空的。此处返回null，对应下一个then的值就是undefined
                return {null, response}
            })
        }).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            return json
        }).catch(error => {
            throw error
        })
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

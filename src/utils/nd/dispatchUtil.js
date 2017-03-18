import 'whatwg-fetch';
import authUtil from './authUtil';
import {getCurrentHost} from '../configUtil';

/**
 * Dispatch请求的工具类
 */
class DispatchUtil {

    /**
     * dispatch方法
     * @param dispatchParam dispatcher对象{"protocol":"","host":"","ver":"","api":"","vars":"","module":""}
     * @param body 请求体
     * @param method 请求方法
     */
    dispatch(dispatchParam, body, method = "GET") {
        let url = this._buildUrl(dispatchParam);
        const _method = method.toUpperCase();

        let host = getCurrentHost().target;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': authUtil.getAuthentization(method, url, host),
            'Dispatcher': this._buildDispatcher(dispatchParam)
        }
        let settings = {
            method: _method,
            headers: headers
        }
        if (!['get', 'head'].includes(_method) && body) {
            settings['body'] = JSON.stringify(body);
        }
        return fetch(window.encodeURI(url), settings).then(response => {
            return response.json().then(json => ({json, response})).catch(e => {
                return {undefined, response}; //如果出错的话（通常是json解析错误），那么返回null，对应到底下的then就是undefined
            })
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
     * 构建URL地址
     * @param dispatchParam 同dispatch方法的dispatchParam
     * @returns {string}
     * @private
     */
    _buildUrl(dispatchParam) {

        let host = getCurrentHost().target;
        let version = getCurrentHost().version;

        let url = 'http://' + host + '/' + version + '/dispatcher' + dispatchParam.api;
        let vars = dispatchParam.vars;
        Object.keys(vars).map(v => {
            url = url.replace('{' + v + '}', vars[v])
        });
        return url
    }


    /**
     * 构建Dispatcher
     * @param dispatchParam 同dispatch方法的dispatchParam
     * @private
     */
    _buildDispatcher(dispatchParam) {
        let host = getCurrentHost().target;
        let encode = window.encodeURIComponent;
        Object.keys(dispatchParam.vars).map(key => {
            dispatchParam.vars[key] = encode(dispatchParam.vars[key])
        });
        let dispatcher = {
            'protocol': (dispatchParam.protocol || 'http') + '://',
            'host': dispatchParam.host || host,
            'ver': dispatchParam.ver || 'v0.1',
            'api': encode(dispatchParam.api.replace(/#/g, '%23')),
            'vars': dispatchParam.vars || {},
            'module': dispatchParam.module
        }
        return JSON.stringify(dispatcher)
    }
}
export default DispatchUtil;
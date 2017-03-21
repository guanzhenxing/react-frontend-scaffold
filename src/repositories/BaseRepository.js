import FetchUtil from "../utils/fetchUtil";
import DispatchUtil from '../utils/dispatchUtil';
import {getCurrentHost} from '../utils/configUtil';

/**
 * 基础的Base类
 */
export default class {

    /**
     * 请求处理
     * @param apiUrl url地址
     * @param body 请求数据
     * @param method 方法
     * @param withAuthToken 是否是有校验码
     * @returns {Promise.<T>}
     */
    request(apiUrl, body, method = "GET", withAuthToken = true) {
        return new FetchUtil().request(apiUrl, body, method, withAuthToken);
    }


    /**
     * 头部带有验证的GET请求
     * @param url URL地址
     * @returns {Object} 远程请求结果
     */
    get(url) {
        return new FetchUtil().get(url);
    }

    /**
     * 头部带有验证的POST请求
     * @param url URL地址
     * @param data 请求数据
     * @returns {Object} 远程请求结果
     */
    post(url, data) {
        return new FetchUtil().post(url, data);
    }

    /**
     * 头部带有验证的PUT请求
     * @param url URL地址
     * @param data 请求数据
     * @returns {Object} 远程请求结果
     */
    put(url, data) {
        return new FetchUtil().put(url, data);
    }

    patch(url, data) {
        return new FetchUtil().put(url, data);
    }

    /**
     * 头部带有验证的DELETE请求
     * @param url URL地址
     * @param data 请求数据
     * @returns {Object} 远程请求结果
     */
    delete(url, data) {
        return new FetchUtil().delete(url, data);
    }


    /**
     * 头部带有验证的ajax请求
     * @param  {string} url    URL地址
     * @param  {string} method HTTP请求方法
     * @param  {json} data  请求数据
     * @return {object} 远程请求结果
     */
    ajax(url, method, data) {
        return new FetchUtil().ajax(url, method, data);
    }


    /**
     * dispatch跳转
     * @param dispatchParam
     * @param body
     * @param method
     * @returns {*}
     */
    dispatch(dispatchParam, body, method = "GET", otherData) {
        dispatchParam.protocol = dispatchParam.protocol || 'http';
        dispatchParam.ver = dispatchParam.ver || 'v0.1';
        dispatchParam.host = dispatchParam.host || getCurrentHost().dispatch;
        return new DispatchUtil().dispatch(dispatchParam, body, method).then(res => {
            if (res) {
                res['otherData'] = otherData;
            } else {
                res = {otherData};
            }
            return res;
        });

    }

    /**
     * 加载表格数据
     * 这个接口实现不带 dispatch 的表格数据加载，这种数据通常存储在admin-service端
     * @param url 请求地址
     * @param pageNumber 页数
     * @param pageSize 每页显示条数
     * @param filter 过滤条件
     */
    loadTableData(url, pageNumber, pageSize, filter) {
        pageNumber -= 1;
        let param = `$count=true&size=${pageSize}&page=${pageNumber}`;
        if (filter) {
            param = `${param}&$filter=${filter}&_=${new Date().getTime()}`;
        }
        url = `${url}?${param}`;
        return this.get(url);
    }


}


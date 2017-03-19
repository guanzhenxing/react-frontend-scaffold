/**
 * Created by guanzhenxing on 2017-03-18.
 */
import Crypto from 'crypto-js';
const dateTime = require('./datetime');
const storage = require('./storage');


const tokensKey = 'AUTH-TOKENS';
const authKey = 'AUTH-AUTH';

var tokensObj;
var authObj;

// 自定义接口配置列表
// 白名单列表
function _convert(apiList) {
    let arr = [];
    ['customs', 'white_lists'].forEach(function (item) {
        let list;
        list = (apiList && apiList[item] && apiList[item]).map(function (api) {
                return api['interface_unique_key']
            }) || [];
        if (list.length) {
            arr = arr.concat(list)
        }
    });
    return arr
}


// 对项目的操作api权限
function _convertProjectApiList(apiList) {
    let arr = (apiList && apiList['project_apis']).map(function (project) {
            return project['apis'].map(function (api) {
                return project['project_id'] + '#' + api['interface_unique_key']
            })
        }) || [];
    let list = [];
    arr.forEach(function (item) {
        list = list.concat(item)
    });
    return list
}

//白名单
function _convertWhiteList(apiList) {
    return (apiList && apiList['white_lists']).map(function (api) {
            return api['interface_unique_key']
        }) || []
}

/*
 mod传的是projectId，跟项目权限相关
 说明--------判断是否对某个项目的某个操作是否有权限
 1.判断是否是白名单的接口
 2.如果不是白名单的接口，再结合项目来判断是否对项目的这个api操作有权限
 */
function _hasLevel(level, mod, auth) {
    if (mod) {
        // 含有项目的api操作权限
        return !!(auth.projectApis && auth.projectApis.indexOf(mod + '#' + level) !== -1)
    }
    return !!(auth.whiteLists && auth.whiteLists.indexOf(level) !== -1) || !!(auth.apis && auth.apis.indexOf(level) !== -1)
}

function randomCode() {
    let code = "";
    let codeLength = 8;//验证码的长度
    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //所有候选组成验证码的字符，当然也可以用中文的

    for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 36);
        code += chars[charIndex];
    }
    return code;
}

module.exports = {
    /**
     * 判断是否登录
     * @returns {boolean}
     */
    isLogin: function () {
        return !!this.getTokens()
    },

    /**
     * 判断是否有权限
     * @param  {string}  level 接口标识符或权限等级
     * @param  {string}  mod 项目模块id
     * @return {boolean}
     */
    hasAuth: function (level, mod) {

        // 未登录，或登录失效
        if (!this.isLogin()) {
            return false
        }

        let auth = this.getAuth();

        if (!auth) {
            return false
        }

        // 接口标识符
        // 支持“|”分隔，代表“或”
        return level.split('|').some(function (level) {
            let exact;
            if (level.charAt(0) === '=') {
                exact = true;
                level = level.substring(1)
            }
            if (/\D/.test(level)) {
                return _hasLevel(level, mod, auth)
            } else {
                return exact ? auth.level === +level : auth.level >= level
            }
        })
    },

    /**
     * 设置登录信息
     * @param auth
     */
    setAuth: function (auth) {
        authObj = auth;

        if (auth === null) {
            storage.remove(authKey)
        } else {
            storage.set(authKey, this.makeAuth(auth))
        }
    },

    /**
     * 创建auth
     * @param auth
     * @returns {*}
     */
    makeAuth: function (auth) {
        auth.projectApis = _convertProjectApiList(auth.apis);
        auth.whiteLists = _convertWhiteList(auth.apis);
        auth.apis = _convert(auth.apis);

        return auth
    },

    /**
     * 获得认证
     * @returns {*}
     */
    getAuth: function () {
        var auth = authObj;
        if (!auth) {
            auth = storage.get(authKey);

            if (auth) {
                authObj = auth
            }
        }
        if (auth) {
            var args = Array.prototype.slice.call(arguments);
            var key;

            while ((key = args.shift()) && auth) {
                auth = auth[key]
            }
        }
        return auth
    },

    /**
     * 获得tokens
     * @param key
     * @returns {*}
     */
    getTokens: function (key) {
        var tokens = tokensObj;
        if (!tokens) {
            // 本地存储
            tokens = storage.get(tokensKey)
        }
        if (tokens) {
            // 失效判断
            if (dateTime(tokens['expires_at']).toNumber() <= dateTime().toNumber()) {
                this.setTokens(tokens = null)
            }
        }
        if (tokens) {
            tokensObj = tokens
        }
        if (key && tokens) {
            return tokens[key]
        }
        return tokens
    },

    /**
     * 设置或清除 tokens
     * @param {object} tokens token值
     */
    setTokens: function (tokens) {
        tokensObj = tokens;

        if (tokens === null) {
            storage.remove(tokensKey)
        } else {
            tokens.diff = new Date(this.getTokens('server_time')) - new Date();
            storage.set(tokensKey, tokens)
        }
    },

    /**
     * 销毁
     */
    destroy: function () {
        this.setTokens(null);
        this.setAuth(null)
    },

    /**
     * 获得AccessToken
     * @returns {*}
     */
    getAccessToken: function () {
        return this.getTokens('access_token')
    },

    /**
     * 获得访问认证
     * @param method
     * @param url
     * @param host
     * @returns {string}
     */
    getAuthentization: function (method, url, host) {

        method = method.toUpperCase();
        url = encodeURI(url);
        let access_token = this.getAccessToken();
        let mac_key = this.getTokens('mac_key');

        let strAuth = 'MAC id="' + access_token + '",nonce="';
        let nonce = new Date().getTime() + ':' + randomCode();
        strAuth += nonce + '",mac="';

        let path;
        let pos = url.indexOf("://");
        if (pos > 0) {
            path = url.substring(pos + 3);
            pos = path.indexOf("/");
            host = path.substr(0, pos);
            path = path.substring(pos);
        } else {
            path = url;
        }
        let request_content = nonce + '\n' + method + '\n' + path + '\n' + host + '\n';
        let hash = Crypto.HmacSHA256(request_content, mac_key);
        let mac = hash.toString(Crypto.enc.Base64);
        strAuth += mac + '"';
        return strAuth;
    },


};
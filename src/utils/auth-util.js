/**
 * Created by guanzhenxing on 2017-03-18.
 */
import CryptoJS from 'crypto-js';
const datetime = require('./datetime');
const storage = require('./storage');


const tokensKey = 'AUTH-TOKENS';
const userKey = 'AUTH-USER';


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
     * 获得tokens
     * @param key
     * @returns {*}
     */
    getTokens: function (key) {
        var tokens = storage.get(tokensKey);
        if (tokens) {
            if (datetime(tokens['expires_at']).toNumber() <= datetime().toNumber()) {// 失效判断
                this.setTokens(tokens = null)
            }
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
        if (tokens === null) {
            storage.remove(tokensKey)
        } else {
            tokens.diff = new Date(this.getTokens('server_time')) - new Date();
            storage.set(tokensKey, tokens)
        }
    },

    /**
     * 获得用户信息
     * @returns {*}
     */
    getUser(){
        let user = storage.get(userKey);
        return user;
    },

    /**
     * 设置用户信息
     * @param user
     */
    setUser(user){
        if (user === null) {
            storage.remove(userKey)
        } else {
            storage.set(userKey, user)
        }
    },


    /**
     * 获得访问认证
     * @param method
     * @param url
     * @param host
     * @returns {string}
     */
    getAuthorization: function (method, url, host) {
        method = method.toUpperCase();
        url = encodeURI(url);
        let access_token = this.getTokens('access_token');
        let mac_key = this.getTokens('mac_key');

        let nonce = new Date().getTime() + ':' + randomCode();

        let _getMac = function () {
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
            let hash = CryptoJS.HmacSHA256(request_content, mac_key);
            let mac = hash.toString(CryptoJS.enc.Base64);
            return mac;
        };
        let mac = _getMac();

        let strAuth = `MAC id="${access_token}",nonce="${nonce}",mac="${mac}"`;
        return strAuth;
    },


    /**
     * 销毁
     */
    destroy: function () {
        this.setTokens(null);
    },


};
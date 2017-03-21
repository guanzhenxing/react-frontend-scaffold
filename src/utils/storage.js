/**
 * @param {string} prefix  key 前缀
 * @param {number} expire  默认过期秒数
 */
function Storage(prefix, expire) {
    this.prefix = prefix || '';

    if (expire === -1) {
        this.driver = window.sessionStorage;
    } else {
        this.driver = window.localStorage;
        this.expire = expire || 0;
    }
}

Storage.prototype = {

    constructor: Storage,

    _key: function (key) {
        return this.prefix + key;
    },

    /**
     * 获取所有的本地存储数据对应的 key
     */
    keys: function () {
        var keys = Object.keys(this.driver);

        if (this.prefix) {
            var index = this.prefix.length;

            return keys.map(function (key) {
                return key.substring(index);
            });
        }

        return keys;
    },

    /**
     * 移除某一项本地存储的数据
     */
    remove: function (key) {
        this.driver.removeItem(this._key(key));
    },

    /**
     * 清除所有本地存储的数据
     */
    clear: function () {
        this.driver.clear();
    },

    /**
     * 将数据进行本地存储
     */
    set: function (key, value, expire) {
        var data = {
            value: value
        };

        if (typeof expire === 'undefined') {
            expire = this.expire;
        }

        if (expire) {
            data.expire = Date.now() + expire * 1000;
        }

        this.driver.setItem(this._key(key), JSON.stringify(data));
    },

    /**
     * 提取本地存储的数据
     */
    get: function (key) {
        var data = this.driver.getItem(this._key(key));

        if (data) {
            data = JSON.parse(data);

            if (data.expire) {
                if (data.expire < Date.now()) {
                    this.remove(key);
                    data = null;
                }
            }
        }

        return data && data.value;
    }

};
// 默认一周有效期
module.exports = new Storage(null, 7 * 24 * 3600);
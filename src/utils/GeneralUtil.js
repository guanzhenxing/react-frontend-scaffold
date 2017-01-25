/**
 * 常规的工具类
 * Created by guanzhenxing on 2017-01-25.
 */
class GeneralUtil {

    /**
     * 判断当前环境是否是production
     * @returns {boolean}
     */
    static isProdEnv() {
        return process.env.NODE_ENV === 'production'
    }

    /**
     * 对uri进行encode
     * @param uri
     * @returns {string}
     */
    static encodeURI(uri) {
        return window.encodeURI(uri)
    }

    /**
     * decode uri
     * @param uri
     * @returns {string}
     */
    static decodeURI(uri) {
        return window.decodeURI(uri);
    }

    /**
     * 判断字符串是不是JSON格式
     * @param str
     * @returns {boolean}
     */
    static isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}

export default GeneralUtil

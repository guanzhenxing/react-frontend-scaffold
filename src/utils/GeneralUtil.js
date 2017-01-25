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

}

export default GeneralUtil

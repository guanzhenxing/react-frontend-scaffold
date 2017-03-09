/**
 * config工具
 * Created by guanzhenxing on 2017-03-09.
 */
const config = require('../config');


class ConfigUtil {

    /**
     * 获得当前的HOST
     */
    static getCurrentHost() {
        let _parse = (closure) => {
            let envList = Object.keys(config.host);
            for (let index = 0; index < envList.length; index++) {
                let key = envList[index];
                let env = config.host[key];
                closure(env);
            }
        };
        return _parse((env) => {
            if (window.location.href.match(env.rule)) {
                return env;
            }
        })
    }

}


export default ConfigUtil
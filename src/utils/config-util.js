/**
 * config工具
 * Created by guanzhenxing on 2017-03-09.
 */
const config = require('../config');


const _parse = (configItem) => {
    let envList = Object.keys(configItem);
    for (let index = 0; index < envList.length; index++) {
        let key = envList[index];
        let env = configItem[key];
        if (window.location.href.match(env.rule)) {
            return env;
        }
    }
};

/**
 * 获得当前的HOST
 */
export function getCurrentHost() {
    return _parse(config.host);
}

/**
 * 获得当前的UC
 */
export function getCurrentUC() {
    return _parse(config.uc);
}







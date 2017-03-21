/**
 * 常规的工具类
 * Created by guanzhenxing on 2017-01-25.
 */

/**
 * 判断当前环境是否是development
 * @returns {boolean}
 */
export function isDevEnv() {
    return process.env.NODE_ENV === 'development'
}


/**
 * 判断当前环境是否是production
 * @returns {boolean}
 */
export function isProdEnv() {
    return process.env.NODE_ENV === 'production'
}

/**
 * 对uri进行encode
 * @param uri
 * @returns {string}
 */
export function encodeURI(uri) {
    return window.encodeURI(uri)
}

/**
 * decode uri
 * @param uri
 * @returns {string}
 */
export function decodeURI(uri) {
    return window.decodeURI(uri);
}

/**
 * 判断字符串是不是JSON格式
 * @param str
 * @returns {boolean}
 */
export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * 获得两个数组的差异。array1和array2的顺序不一样，结果不一样
 * @param array1
 * @param array2
 * @returns {Array}
 */
export function arrayDiff(array1, array2) {
    let o = {};//转成hash可以减少运算量，数据量越大，优势越明显。
    for (let i = 0, len = array2.length; i < len; i++) {
        o[array2[i]] = true;
    }
    let result = [];
    for (let i = 0, len = array1.length; i < len; i++) {
        let v = array1[i];
        if (o[v]) continue;
        result.push(v);
    }
    return result;
}

/**
 * 获得arrRecommend不在arrDisplayed的一个值
 * @param arrRecommend
 * @param arrDisplayed
 * @returns {*}
 */
export function getOneDiffFromArrays(arrRecommend, arrDisplayed) {
    for (let rv of arrRecommend) {
        if (!arrDisplayed.includes(rv)) {
            return rv;
        }
    }
}


/**
 * 精度加法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export function accAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

/**
 * 获得对象的类型
 * @param obj
 */
export function getObjectClass(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length === 2) {
            return arr[1];
        }
    }
    return undefined;
}

/**
 * 自动执行generator方法
 * @param gen
 */
export function autoRunGeneratorFunc(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data);
        });
    }

    next();
}
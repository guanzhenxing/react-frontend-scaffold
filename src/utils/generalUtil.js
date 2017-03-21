/**
 * 常规的工具类
 * Created by guanzhenxing on 2017-01-25.
 */
class GeneralUtil {


    static isDevEnv() {
        return process.env.NODE_ENV === 'development'
    }


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

    /**
     * 获得两个数组的差异。array1和array2的顺序不一样，结果不一样
     * @param array1
     * @param array2
     * @returns {Array}
     */
    static arrayDiff(array1, array2) {
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
    static getOneDiffFromArrays(arrRecommend, arrDisplayed) {
        for (let rv of arrRecommend) {
            if (!arrDisplayed.includes(rv)) {
                return rv;
            }
        }
    }

    /**
     * 从标记的定义提取数组
     * @param markedDefinition
     * @returns {Array}
     */
    static getArrayFormMarkedDefination(markedDefinition) {
        let split_definition = markedDefinition.split("^ND_KNOWLEDGE_ND^");
        let result = [];
        for (let _index = 0; _index < split_definition.length; _index++) {
            let item = split_definition[_index];
            result.push(item);
            if (_index < split_definition.length - 1) {
                result.push("^ND_KNOWLEDGE_ND^");
            }
        }
        return result;
    }

    /**
     * 精度加法
     * @param arg1
     * @param arg2
     * @returns {number}
     */
    static accAdd(arg1, arg2) {

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
    static getObjectClass(obj) {
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
    static autoRunGeneratorFunc(gen) {
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

    /**
     * 为数字添加1。比如为0.1加0.1，为1加1，为0.09加0.01
     * @param value
     * @returns {*}
     */
    static numberAddLittleOne(value) {
        if (!value) {
            return value;
        }

        let num = new String(value).split('.');
        if (num.length > 1) {
            let v = '';
            for (let i = 0; i < num[1].length - 1; i++) {
                v += '0';
            }
            v = `0.${v}1`;
            return this.accAdd(Number(value), Number(v));
        } else {
            return Number(value) + 1;
        }
    }

    /**
     * 获取时间戳给服务器
     * @returns {number}
     */
    static getTimezone() {
        var timezone = -parseInt(new Date().getTimezoneOffset() / 60, 10);
        timezone = timezone > 0 ? '+' + timezone : timezone + '';
        return timezone;
    }


    /**
     * 获得考勤月
     * @returns {string}
     * @constructor
     */
    static getAttendanceMonth() {
        const moment = require('moment');
        let now = moment().add(-1, 'months').format('YYYY-MM-DD');
        let nowArr = now.split('-');
        let year = parseInt(nowArr[0]);
        let month = parseInt(nowArr[1]);

        if (month === 12 && nowArr[2] >= 21) {
            year += 1;
        }
        if (nowArr[2] >= 21) {
            month += 1;
            if (month > 12) {   //如果加起来后的月份>12，那么设置为1月。（先前的时候，年份已经+1了）
                month = 1;
            }
        }
        month = month < 10 ? '0' + month : month;
        return `${year}${month}`
    }

    static getToday() {
        const moment = require('moment');
        return moment(new Date()).format('YYYY-MM-DD');
    }

    static getDayBeforeToday(beforeDay) {
        const moment = require('moment');
        return moment().add(beforeDay, 'days').format('YYYY-MM-DD');
    }

    static getYesterday() {
        return this.getDayBeforeToday(-1);
    }

    static getCurrentMonday() {
        const moment = require('moment');
        return moment().isoWeekday(1).format('YYYY-MM-DD');
    }

    //往前推算几周的数据
    static preWeek(value, weeks) {
        const moment = require('moment');
        let begin_date = moment(value).subtract('days', 7 * weeks).format('YYYY-MM-DD');
        let end_date = moment(value).subtract('days', 1).format('YYYY-MM-DD');
        return {begin_date, end_date};
    }

    static nextWeek(value, weeks) {
        const moment = require('moment');
        let temp = moment(value).add('days', 7 * weeks).format('YYYY-MM-DD');
        let end_date = moment(temp).subtract('days', 1).format('YYYY-MM-DD');
        return {end_date};
    }

    //往前推算一周的数据
    static preOneWeek(value, week) {
        const moment = require('moment');
        let begin_date = moment(value).subtract('days', 7 * week).format('YYYY-MM-DD');
        let end_date = moment(value).subtract('days', 7 * (week - 1)).format('YYYY-MM-DD');
        return {begin_date, end_date};
    }

    //nd考勤月计算
    static currentMonth(value) {
        const moment = require('moment');
        let beginStr = moment(value, 'YYYY-MM').startOf('month').add(20, 'days').subtract(1, 'months');
        let begin_date = new Date(beginStr).Format('yyyy-MM-dd');
        let endStr = moment(value, 'YYYY-MM').add(19, 'days');
        let end_date = new Date(endStr).Format('yyyy-MM-dd');
        return {begin_date, end_date}
    }

    /**
     * 替换掉值中的 - _ . ! ~ * ' ( ) 为URL编码
     * @param value
     * @returns {*}
     */
    static replaceASCIIToURL(value) {
        value = value.replace(/\'/g, '%27');
        value = value.replace(/#/g, '%23');
        value = value.replace(/\?/g, '%3f');
        value = value.replace(/&/g, '%26');
        return value;
    }

}

export default GeneralUtil

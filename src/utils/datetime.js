/**
 * @module datetime
 * @author crossjs <liwenfu@crossjs.com>
 */
var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var MONTH_NAMES_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var DAY_NAMES_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss';

var datetime;

function zeroPad(m, n) {
    n || (n = 2);
    m = '' + m;
    n -= m.length;

    while (n--) {
        m = '0' + m;
    }

    return m;
}

function isLeap(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function parseVal(timestamp, pattern) {
    pattern || (pattern = DATETIME_FORMAT);

    var tArr = timestamp.split(/\D+/);
    var fArr = pattern.split(/[^yMdhmsiED]+/);

    var y, M, d, h, m, s, i;
    var map = {};

    for (i = 0; i < fArr.length; i++) {
        map[fArr[i]] = parseInt(tArr[i], 10);
    }

    y = map.yyyy || map.yy || 1970;
    M = map.MM || map.M || 0;
    // d = map.dd || map.d || 0;
    if (map.dd === 0 || map.d === 0) {
        d = 0
    } else {
        d = map.dd || map.d || 1;
    }
    h = map.hh || map.h || 0;
    m = map.mm || map.m || 0;
    s = map.ss || map.s || 0;
    i = map.ii || map.i || 0;

    return new Date(y < 1900 ? y + 1900 : y, M - 1, d, h, m, s, i);
}

function parseDate(timestamp, pattern) {
    if (typeof timestamp === 'function') {
        return timestamp(pattern);
    }

    if (timestamp) {

        if (timestamp.constructor === Date) {
            return timestamp;
        }

        // UNIX TIME
        if (/^-?\d+$/.test(timestamp)) {
            return new Date(+timestamp);
        }

        // ISO-8601
        // 2015-04-22T02:32:27.068+0000
        // if (/^\d{4}(\-\d{2}){2}T\d{2}(:\d{2}){2}\.\d{3}[+-]\d{4}$/.test(timestamp)) {
        //   // replace for IE (IE does not support hhmm but hh:mm)
        //   return Date.fromISO(timestamp.replace(/([+-]\d{2})(\d{2})/, '$1:$2'));
        // }

        if (/^\d{4}(\-\d{2}){2}T\d{2}(:\d{2}){2}(\.\d{3})?[+-]\d{4}$/.test(timestamp)) {
            return Date.fromISO(timestamp.replace(/([+-]\d{2})(\d{2})/, '$1:$2'));
        }
        if (/^\d{4}(\-\d{2}){2}T\d{2}(:\d{2}){2}(\.\d{3})?[+-]\d{2}:\d{2}$/.test(timestamp)) {
            return Date.fromISO(timestamp);
        }
        if (/^\d{4}(\-\d{2}){2}T\d{2}(:\d{2}){2}(\.\d{3})?[zZ]$/.test(timestamp)) {
            return Date.fromISO(timestamp.replace(/[zZ]/, '+00:00'));
        }

        // string
        return parseVal(timestamp, pattern);
    } else {

        if (typeof timestamp === 'undefined') {
            // now
            return new Date();
        }

        // 1970-01-01 ...
        return new Date(0);
    }
}

/**
 * @class
 * @param {Date|Number|String} [timestamp] 任意表示时间日期的数据
 * @param {String} [pattern]   时间格式
 */
var DateTime = function (timestamp, pattern) {
    this.date = parseDate(timestamp, pattern);
    this._zone = this.date.getTimezoneOffset();
    this._offset = this._zone - new Date().getTimezoneOffset();
    this.pattern = pattern || DATETIME_FORMAT;
};

DateTime.prototype = {

    constructor: DateTime,

    /**
     * 返回月份名
     */
    MMMM: function () {
        return datetime.MONTH_NAMES[this.M() - 1];
    },

    /**
     * 返回月份名缩写
     */
    MMM: function () {
        return datetime.MONTH_NAMES_ABBR[this.M() - 1];
    },

    /**
     * 返回星期名
     */
    EEEE: function () {
        return datetime.DAY_NAMES[this.D()];
    },

    /**
     * 返回星期名缩写
     */
    EEE: function () {
        return datetime.DAY_NAMES_ABBR[this.D()];
    },

    // TODO: 一年中的第几周
    EE: function () {
        return '';
    },

    // TODO: 一月中的第几周
    E: function () {
        return '';
    },

    /**
     * 返回一周中的第几天（0-6）
     */
    D: function () {
        return this.date.getDay();
    },

    /**
     * 返回年份，四位数字
     */
    yyyy: function () {
        return this.date.getFullYear();
    },

    /**
     * 返回年份，减去1900
     */
    yy: function () {
        return this.date.getYear();
    },

    /**
     * 返回月份（01-12）
     */
    MM: function () {
        return zeroPad(this.M());
    },

    /**
     * 返回月份（1-12）
     */
    M: function () {
        return this.date.getMonth() + 1;
    },

    /**
     * 返回日期（01-31）
     */
    dd: function () {
        return zeroPad(this.d());
    },

    /**
     * 返回日期（1-31）
     */
    d: function () {
        return this.date.getDate();
    },

    /**
     * 返回小时（00-23）
     */
    hh: function () {
        return zeroPad(this.h());
    },

    /**
     * 返回小时（0-23）
     */
    h: function () {
        return this.date.getHours();
    },

    /**
     * 返回分钟（00-59）
     */
    mm: function () {
        return zeroPad(this.m());
    },

    /**
     * 返回分钟（0-59）
     */
    m: function () {
        return this.date.getMinutes();
    },

    /**
     * 返回秒数（00-59）
     */
    ss: function () {
        return zeroPad(this.s());
    },

    /**
     * 返回秒数（0-59）
     */
    s: function () {
        return this.date.getSeconds();
    },

    /**
     * 返回毫秒数（000-999）
     */
    ii: function () {
        return zeroPad(this.i(), 3);
    },

    /**
     * 返回毫秒数（0-999）
     */
    i: function () {
        return this.date.getMilliseconds();
    },

    /**
     * 返回时差（相对 UTC）
     */
    zone: function () {
        return this._zone;
    },

    /**
     * 返回时差（相对当前）
     */
    offset: function () {
        return this._offset;
    },

    /**
     * 返回是否闰年
     * @return {Boolean}
     */
    isLeap: function () {
        return isLeap(this.yyyy());
    },

    /**
     * 增加指定数量指定单位的时间
     * @param {String} unit     年月日时分秒
     * @param {Number} distance 增加数量
     * @return {DateTime}
     */
    add: function (unit, distance) {
        switch (unit) {
            case 'y':
                this.date.setFullYear(+this.yyyy() + distance);
                break;
            case 'M':
                this.date.setMonth(+this.M() + distance - 1);
                break;
            case 'd':
                this.date.setDate(+this.d() + distance);
                break;
            case 'h':
                this.date.setHours(+this.h() + distance);
                break;
            case 'm':
                this.date.setMinutes(+this.m() + distance);
                break;
            case 's':
                this.date.setSeconds(+this.s() + distance);
                break;
            case 'i':
                this.date.setMilliseconds(+this.i() + distance);
                break;
            default:
                break;
        }

        return this;
    },

    /**
     * 返回指定格式的字符串，同 toString
     * @param  {String} [pattern] 时间格式
     * @return {String}
     */
    format: function (pattern) {
        return this.toString(pattern);
    },

    /**
     * 返回 Date 对象
     * @return {Date}
     */
    toDate: function () {
        return this.date;
    },

    /**
     * 返回时间戳，精确到毫秒
     * @return {Number}
     */
    toNumber: function () {
        return this.date.getTime();
    },

    /**
     * 返回指定格式的字符串
     * @param  {String} [pattern] 时间格式
     * @return {String}
     */
    toString: function (pattern) {
        var that = this;

        return (pattern || this.pattern).replace(/y+|M+|d+|h+|m+|s+|i+|E+|D+/g, function ($0) {
            return that[$0]()
        });
    }

};

datetime = function (timestamp, pattern) {
    return new DateTime(timestamp, pattern);
};

datetime.isLeap = isLeap;

datetime.MONTH_NAMES = MONTH_NAMES;
datetime.MONTH_NAMES_ABBR = MONTH_NAMES_ABBR;
datetime.DAY_NAMES = DAY_NAMES;
datetime.DAY_NAMES_ABBR = DAY_NAMES_ABBR;

// compatible with ie8
// iso-8601
(function () {
    var D = new Date('1970-01-01T00:01:01+00:01');
    if (!D || +D !== 1000) {
        Date.fromISO = function (s) {
            var day;
            var tz;
            var rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/;
            var p = rx.exec(s) || [];
            if (p[1]) {
                day = p[1].split(/\D/);
                for (var i = 0, L = day.length; i < L; i++) {
                    day[i] = parseInt(day[i], 10) || 0;
                }
                day[1] -= 1;
                day = new Date(Date.UTC.apply(Date, day));
                if (!day.getDate()) {
                    return NaN;
                }
                if (p[5]) {
                    tz = (parseInt(p[5], 10) * 60);
                    if (p[6]) {
                        tz += parseInt(p[6], 10);
                    }
                    if (p[4] === '+') {
                        tz *= -1;
                    }
                    if (tz) {
                        day.setUTCMinutes(day.getUTCMinutes() + tz);
                    }
                }
                return day;
            }
            return NaN;
        }
    }
    else {
        Date.fromISO = function (s) {
            return new Date(s);
        }
    }
})()

module.exports = datetime;

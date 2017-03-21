/**
 * Created by guanzhenxing on 2017-02-14.
 */
/**
 * 对tasks进行顺序执行
 * tasks是一个promise对象函数数组
 * 示例：
 *  function getXXX(){return Promise(34)}
 *  let arr = [
 *      function func(){return getXXX()},
 *      ()=>{return getXXX()}
 *  ]
 *  runInSequence(arr);
 */
export function runInSequence(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }

    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());

}

/**
 * 对tasks进行并行执行
 * tasks是一个promise对象函数数组
 * 示例：
 *  function getXXX(){return Promise(34)}
 *  let arr = [
 *      function func(){return getXXX()},
 *      ()=>{return getXXX()}
 *  ]
 *  runInConcurrent(arr);
 */
export function runInConcurrent(tasks) {
    return Promise.all(tasks.map(function (v) {
        try {
            return v();
        } catch (e) {
            return Promise.reject(e);
        }
    }));
}

/**
 * 对tasks进行最大并发数执行
 * tasks是一个promise对象函数数组，
 * max是并发的最大数
 * 示例：
 *  function getXXX(){return Promise(34)}
 *  let arr = [
 *      function func(){return getXXX()},
 *      ()=>{return getXXX()}
 *  ]
 *  runInMaxConcurrent(arr,2);
 */
export function runInMaxConcurrent(tasks, max) {
    var w = [];
    for (var i = 0; i < max; ++i) w.push([]);
    tasks.forEach(function (promise, n) {
        w[n % max].push(promise);
    })
    var seqs = w.map(function (v) {
        return function () {
            return runInSequence(v)
        }
    })
    return runInConcurrent(seqs).then(function (res) {
        var w = new Array(res.reduce(function (r, v) {
            return r + v.length
        }, 0));
        var len = res.length;
        for (var i = 0; i < len; ++i) {
            for (var j = 0; j < res[i].length; ++j) {
                w[i + (j * len)] = res[i][j];
            }
        }
        return w;
    })
}
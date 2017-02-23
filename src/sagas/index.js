/**
 * single entry point to start all Sagas at once
 * Created by guanzhenxing on 2017-02-23.
 */

/**
 * 创建一个rootSaga的Generator函数
 * @returns {rootSaga}
 */
function createRootSaga() {
    return function* rootSaga() {
        yield []
    }
}

export default createRootSaga();
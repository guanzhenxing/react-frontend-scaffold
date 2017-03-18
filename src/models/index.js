/**
 * 所有的的sagas都在此处汇合
 * Created by guanzhenxing on 2017-02-23.
 */

/**
 * 创建一个rootSaga的Generator函数
 * @returns {rootSaga}
 */

import auth from './auth';

function createRootSaga() {
    return function* rootSaga() {
        yield [
            auth()
        ]
    }
}

export default createRootSaga();

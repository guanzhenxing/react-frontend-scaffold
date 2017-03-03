/**
 * 所有的的sagas都在此处汇合
 * Created by guanzhenxing on 2017-02-23.
 */

/**
 * 创建一个rootSaga的Generator函数
 * @returns {rootSaga}
 */

import todos from './todos'

function createRootSaga() {
    return function* rootSaga() {
        yield [
            todos()
        ]
    }
}

export default createRootSaga();
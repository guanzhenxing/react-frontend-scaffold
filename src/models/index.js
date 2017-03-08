/**
 * 所有的的sagas都在此处汇合
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


//在这边进行业务逻辑处理 （独立到另一个文件中）
// import {call, put, takeEvery}  from 'redux-saga/effects'
//
// export default function*() {
//     yield [
//         // takeEvery(types.ADD_TODO, addTodoSaga),
//         // takeEvery(types.EDIT_TODO, editTodoSaga),
//         // takeEvery(types.DELETE_TODO, deleteTodoSaga)
//     ]
// }
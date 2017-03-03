/**
 * 在这边进行业务逻辑处理
 * Created by guanzhenxing on 2017-03-03.
 */

import {call, put, takeEvery}  from 'redux-saga/effects'

import * as repositories from '../repositories/todos'
import * as actions from '../actions/TodoActions';

import * as types from '../constants/ActionTypes';

function* addTodoSaga(text) {
    yield put({type: types.ADD_TODO_FETCH}) //发起一个fetch action
    const resp = yield call(repositories.addTodo, text) //请求数据
    yield put(actions.addTodoSuccess(resp)) //成功时候
}

export default function*() {
    yield [
        takeEvery(types.ADD_TODO, addTodoSaga)
    ]
}

/**
 * 在这边进行业务逻辑处理
 * Created by guanzhenxing on 2017-03-03.
 */

import {call, put, takeEvery}  from 'redux-saga/effects'

import * as repositories from '../repositories/todos'
import * as actions from '../actions/TodoActions';

import * as types from '../constants/ActionTypes';

function* addTodoSaga(text) {
    yield put({type: types.ADD_TODO_FETCH}); //发起一个fetch action
    try {
        const resp = yield call(repositories.addTodo, text); //请求数据
        yield put(actions.addTodoSuccess(resp)); //成功时候
    } catch (err) {
        yield put(actions.addTodoFailure(err)); //失败的时候
    }
}


function* editTodoSaga(id, text) {
    yield put({type: types.EDIT_TODO_FETCH});
    try {
        const resp = yield call(repositories.editTodo, id, text);
        yield put(actions.editTodoSuccess(resp)); //成功时候
    } catch (err) {
        yield put(actions.editTodoFailure(err));
    }
}

function* deleteTodoSaga(id) {
    yield put({type: types.DELETE_TODO_FETCH});
    try {
        const resp = yield call(repositories.deleteTodo, id);
        yield put(actions.deleteTodo(resp)); //成功时候
    } catch (err) {
        yield put(actions.deleteTodoFailure(err));
    }
}


export default function*() {
    yield [
        takeEvery(types.ADD_TODO, addTodoSaga),
        takeEvery(types.EDIT_TODO, editTodoSaga),
        takeEvery(types.DELETE_TODO, deleteTodoSaga)
    ]
}

/**
 * Created by guanzhenxing on 2017-03-03.
 */

import {call, put,}  from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as repositories from '../repositories/todos'
import * as actions from '../actions/TodoActions';

import * as types from '../constants/ActionTypes';

function* addTodoSaga(text) {
    const resp = yield call(repositories.addTodo, text)
    yield put(actions.addTodoSuccess(resp))
}

export default function*() {
    yield [
        takeEvery(types.ADD_TODO, addTodoSaga)
    ]
}

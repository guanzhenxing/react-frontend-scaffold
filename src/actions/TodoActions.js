/**
 * Created by guanzhenxing on 2017-03-03.
 */

/**
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 *
 * Created by guanzhenxing on 2017-02-24.
 */
import * as types from '../constants/ActionTypes';


export const completeTodo = id => ({type: types.COMPLETE_TODO, id});
export const completeAll = () => ({type: types.COMPLETE_ALL});
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});

export const addTodo = text => ({type: types.ADD_TODO, text});
export const addTodoSuccess = text => ({type: types.ADD_TODO_SUCCESS, text});
export const addTodoFailure = error => ({type: types.ADD_TODO_FAILURE, error});

export const editTodo = (id, text) => ({type: types.EDIT_TODO, id, text});
export const editTodoSuccess = (resp) => ({type: types.EDIT_TODO_SUCCESS, id: resp.id, text: resp.text});
export const editTodoFailure = error => ({type: types.EDIT_TODO_FAILURE, error});

export const deleteTodo = id => ({type: types.DELETE_TODO, id});
export const deleteTodoSuccess = id => ({type: types.DELETE_TODO_SUCCESS, id});
export const deleteTodoFailure = error => ({type: types.DELETE_TODO_FAILURE, error});

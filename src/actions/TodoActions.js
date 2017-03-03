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

export const addTodo = text => ({type: types.ADD_TODO, text});
export const deleteTodo = id => ({type: types.DELETE_TODO, id});
export const editTodo = (id, text) => ({type: types.EDIT_TODO, id, text});
export const completeTodo = id => ({type: types.COMPLETE_TODO, id});
export const completeAll = () => ({type: types.COMPLETE_ALL});
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});


export const addTodoSuccess = text => ({type: types.ADD_TODO_SUCCESS, text});
/**
 * 系统全局的reducer
 * Created by guanzhenxing on 2017-03-08.
 */

import {fromJS} from 'immutable';

import {
    FETCH,
    SUCCESS,
    ERROR,
} from '../constants/actionType';

const initialState = fromJS({
    loading: false,
    error: null,
    success: false
});

function appReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH:
            return state.set('loading', true).set('error', null).set('success', false);
        case SUCCESS:
            return state.set('loading', false).set('error', null).set('success', true);
        case ERROR:
            return state.set('loading', false).set('error', action.error).set('success', false);
        default:
            return state;
    }
}
export default appReducer;
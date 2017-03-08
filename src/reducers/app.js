/**
 * Created by guanzhenxing on 2017-03-08.
 */

import {fromJS} from 'immutable';

import {
    LOAD_REPO_SUCCESS,
    LOAD_REPO_FETCH,
    LOAD_REPO_ERROR,
} from '../constants';

const initialState = fromJS({
    loading: false,
    error: null,
    success: false
});

function appReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_REPO_FETCH:
            return state.set('loading', true).set('error', null).set('success', false);
        case LOAD_REPO_SUCCESS:
            return state.set('loading', false).set('error', null).set('success', true);
        case LOAD_REPO_ERROR:
            return state.set('loading', false).set('error', action.error).set('success', false);
        default:
            return state;
    }
}
export default appReducer;
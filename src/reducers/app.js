/**
 * Created by guanzhenxing on 2017-02-09.
 */

import {fromJS} from 'immutable';

// The initial state of the App
const initialState = fromJS({
    loading: false,
    error: false,
    success: false,
});

function app(state = initialState, action) {

    switch (action.type) {
        default:
            return state;
    }

}

export default app;
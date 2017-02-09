/**
 * Created by guanzhenxing on 2017-02-09.
 */
import {handleActions} from 'redux-actions'
export default handleActions({
    FETCH_DATA: (state, action) => {
        console.log(action)
        return {
            ...state,
            ...action.payload
        }
    }
}, {
    data: ''
})
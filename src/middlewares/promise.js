/**
 * 处理promise的redux中间件
 * 使用redux-actions + redux-thunk + 此中间件（redux-promise的替代品）
 * Created by guanzhenxing on 2017-02-08.
 */
import _ from 'lodash';
/**
 * 是否是flux-standard-action
 * @param action
 * @returns {boolean|*}
 */
export function isFSA(action) {
    return (
        _.isPlainObject(action) &&
        (_.isString(action.type) || _.isSymbol(action.type)) &&
        Object.keys(action).every(isValidKey)
    );
}
function isValidKey(key) {
    return [
            'type',
            'payload',
            'error',
            'meta',
        ].indexOf(key) > -1;
}
/**
 * 是否是错误
 * @param action
 * @returns {boolean}
 */
export function isError(action) {
    return action.error === true;
}

function isPromise(val) {
    return val && typeof val.then === 'function';
}

export default function promiseMiddleware({dispatch}) {
    return next => action => {

        if (!isFSA(action)) {   //如果不是标准的flux action
            return isPromise(action) ? action.then(dispatch) : next(action);
        }

        const {type, payload} = action;
        if (payload && isPromise(payload)) {
            dispatch({
                type,
                meta: {
                    state: 'PENDING'
                }
            });
        }


        return isPromise(payload) ? payload.then(
                result => dispatch({
                    ...action,
                    payload: result,
                    meta: {
                        state: 'SUCCESS',
                    }
                }),
                error => {
                    dispatch({
                        ...action,
                        payload: error,
                        error: true,
                        meta: {
                            state: 'FAILURE',
                        }
                    });
                    return Promise.reject(error);
                }
            ) : next(action);
    };
}

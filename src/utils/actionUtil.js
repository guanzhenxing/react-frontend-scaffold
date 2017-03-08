/**
 * Created by guanzhenxing on 2017-03-08.
 */

/**
 * 创建Action体
 * @param type
 * @param payload
 * @param error
 * @param meta
 * @returns {{type: *, payload: *, error: *, meta: *}}
 */
export function createAction(type, payload, error, meta) {
    return {
        type,
        payload,
        error,
        meta
    }
}

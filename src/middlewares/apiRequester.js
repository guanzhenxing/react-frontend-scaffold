/**
 * 处理API请求中间件。
 * 使用样例：
 *function exampleAction() {
 *   return {
 *       [REQUEST_API]: {
 *           types: ['ON_REQUEST', 'ON_SUCCESS', 'ON_FAILURE'],
 *           service: () => { return new Promise.resolve(168) },
 *           onSuccess: (response) => { return response },
 *           onFailure: (error) => { return error },
 *      }
 *   }
 *}
 * Created by guanzhenxing on 2017-01-25.
 */
export const REQUEST_API = Symbol('Request API');
export default store => next => action => {
    const callAPI = action[REQUEST_API];
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    const {types, service, onSuccess, onFailure} = callAPI;

    if (typeof service !== 'function') {
        throw new Error('Expected a function as service.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[REQUEST_API];
        return finalAction
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({type: requestType}));

    return service().then(
        response => {
            onSuccess && onSuccess(response);
            next(actionWith({
                response,
                type: successType
            }));
        },
        error => {
            onFailure && onFailure(error);
            next(actionWith({
                type: failureType,
                error: error.message || 'Something bad happened'
            }));
        }
    )

}

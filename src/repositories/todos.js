/**
 * Created by guanzhenxing on 2017-03-03.
 */


export const addTodo = (text) => {
    return Promise.resolve('TODO:' + text.text);
}
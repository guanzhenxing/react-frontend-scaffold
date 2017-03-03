/**
 * 所有的数据请求都可以写在这边
 * Created by guanzhenxing on 2017-03-03.
 */


export const addTodo = (text) => {
    return Promise.resolve('TODO:' + text.text);
}
/**
 * 每个action都有一个匹配的type，这个type和reducer中的相对应。
 * 为了避免在actions和reducers之间产生奇怪的错误，我们在此处定义type。
 * type的前缀为：yourProject/YourComponent。
 *
 * 使用格式如下：
 * export const YOUR_ACTION_CONSTANT = 'yourProject/YourContainer/YOUR_ACTION_CONSTANT';
 *
 * Created by guanzhenxing on 2017-02-24.
 */

export const FETCH = 'scaffold/App/FETCH';
export const SUCCESS = 'scaffold/App/SUCCESS';
export const ERROR = 'scaffold/App/ERROR';

export const LOGIN = 'informatizition/login/LOGIN'; //登录
export const LOGIN_FETCH = 'informatizition/login/LOGIN_FETCH'; //登录时候的Fetching
export const LOGIN_SUCCESS = 'informatizition/login/LOGIN_SUCCESS'; //登录成功
export const LOGIN_ERROR = 'informatizition/login/LOGIN_ERROR'; //登录失败
export const LOGIN_CLEAN_ERROR = 'informatizition/login/LOGIN_CLEAN_ERROR'; //清除错误
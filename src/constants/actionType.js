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

export const LOGIN = 'informatizition/auth/LOGIN'; //登录
export const LOGIN_FETCH = 'informatizition/auth/LOGIN_FETCH'; //登录时候的Fetching
export const LOGIN_SUCCESS = 'informatizition/auth/LOGIN_SUCCESS'; //登录成功
export const LOGIN_ERROR = 'informatizition/auth/LOGIN_ERROR'; //登录失败
export const LOGIN_CLEAN_ERROR = 'informatizition/auth/LOGIN_CLEAN_ERROR'; //清除错误
export const LOGOUT = 'informatizition/auth/LOGOUT'; //退出

export const LOAD_DICT = 'informatizition/dict/LOAD_DICT';  //加载字典
export const LOAD_DICT_SUCCESS = 'informatizition/dict/LOAD_DICT_SUCCESS';  //加载字典成功
export const LOAD_DICT_ERROR = 'informatizition/dict/LOAD_DICT_ERROR';  //加载字典失败

export const LOAD_DICT_ARR = 'informatizition/dict/LOAD_DICT_ARR';  // 以列表的形式加载字典
export const LOAD_DICT_ARR_SUCCESS = 'informatizition/dict/LOAD_DICT_ARR_SUCCESS';  //以列表的形式加载字典成功
export const LOAD_DICT_ARR_ERROR = 'informatizition/dict/LOAD_DICT_ARR_ERROR';  //以列表的形式加载字典错误

export const LOAD_REPORTS = 'informatizition/reports/LOAD_REPORTS'; //加载报表
export const LOAD_REPORTS_SUCCESS = 'informatizition/reports/LOAD_REPORTS_SUCCESS'; //加载报表成功
export const LOAD_REPORTS_ERROR = 'informatizition/reports/LOAD_REPORTS_ERROR'; //加载报表错误

export const LOAD_REPORTS_WORK_DAYS = 'informatizition/reports/LOAD_REPORTS_WORK_DAYS'; //加载报表工作天
export const LOAD_REPORTS_WORK_DAYS_SUCCESS = 'informatizition/reports/LOAD_REPORTS_WORK_DAYS_SUCCESS';//加载报表工作天成功
export const LOAD_REPORTS_WORK_DAYS_ERROR = 'informatizition/reports/LOAD_REPORTS_WORK_DAYS_ERROR';//加载报表工作天错误

export const STORE_ADVANCE_FILTER = 'informatizition/reports/STORE_ADVANCE_FILTER'; //保存高级搜索过滤条件

export const LOAD_TEAM = 'informatizition/dict/LOAD_TEAM';  //加载t20team
export const LOAD_TEAM_SUCCESS = 'informatizition/dict/LOAD_TEAM_SUCCESS';  //加载t20team成功
export const LOAD_TEAM_ERROR = 'informatizition/dict/LOAD_TEAM_ERROR';  //加载t20team错误

export const SAVE_TEAM = 'informatizition/team/SAVE_TEAM';
export const UPDATE_TEAM_SUCCESS = 'informatizition/team/UPDATE_TEAM_SUCCESS';
export const INSERT_TEAM_SUCCESS = 'informatizition/team/INSERT_TEAM_SUCCESS';
export const SAVE_TEAM_ERROR = 'informatizition/team/SAVE_TEAM_ERROR';

export const DELETE_TEAM = 'informatizition/team/DELETE_TEAM';
export const DELETE_TEAM_SUCCESS = 'informatizition/team/DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_ERROR = 'informatizition/team/DELETE_TEAM_ERROR';

export const GET_TEAM_DETAIL = 'informatizition/team/GET_TEAM_DETAIL';
export const GET_TEAM_DETAIL_SUCCESS = 'informatizition/team/GET_TEAM_DETAIL_SUCCESS';
export const GET_TEAM_DETAIL_ERROR = 'informatizition/team/GET_TEAM_DETAIL_ERROR';







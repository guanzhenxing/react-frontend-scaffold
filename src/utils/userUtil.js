/**
 * Created by guanzhenxing on 2016-12-22.
 */
import DispatchUtil from './dispatchUtil';
// import APIPath from './APIPath';
const authUtil = require('./authUtil');
import {runInSequence, runInConcurrent} from './promiseUtil';
import GeneralUtil from './generalUtil';
import {getCurrentHost, getCurrentUC} from './configUtil';
/**
 * 用户工具类
 */
class UserUtil {

    /**
     * 获得单个用户信息
     * @param uid
     * @returns {Promise}
     */
    getUserInfo(uid) {
        if (sessionStorage[uid]) {
            let user = JSON.parse(sessionStorage[uid]);
            return Promise.resolve(user);
        } else {
            let dispatchParam = {
                protocol: 'https',
                api: '/users/{user_id}',
                ver: 'v0.93',
                host: getCurrentUC().host,
                vars: {"user_id": uid},
                module: 'UC'
            };
            return new DispatchUtil().dispatch(dispatchParam).then(user => {
                sessionStorage[uid] = JSON.stringify(user);
                return user;
            }).catch(err => {
                sessionStorage[uid] = JSON.stringify({'user_id': uid});
                return uid;
            });

        }
    }

    getUserInfoList(userIds) {
        let tasks = [];
        let self = this;
        for (let userId of userIds) {
            let task = () => {
                return self.getUserInfo(userId);
            };
            tasks.push(task);
        }
        return runInConcurrent(tasks);
    }


    /**
     * 搜索用户
     * @param query
     * @returns {*}
     */
    getUsers(query) {
        let vOrgId = authUtil.getAuth('user_info', 'org_exinfo', 'v_org_id');
        let orgId = authUtil.getAuth('user_info', 'org_exinfo', 'org_id');
        let userId = authUtil.getAuth('user_info', 'user_id');
        if (!orgId) {
            return Promise.resolve({items: []});
        }
        if (!query) {
            return Promise.resolve({items: []});
        }
        // 过滤 label
        if (/[\s\(\)\']/.test(query)) {
            return Promise.resolve({items: []});
        }

        query = GeneralUtil.replaceASCIIToURL(query);

        if (vOrgId) {   //存在虚拟组织的情况下
            return new DispatchUtil().dispatch({
                protocol: 'https',
                api: '/virtual_organizations/{v_org_id}/organizations/{org_id}/orgnodes/{node_id}/users/actions/search?$offset={$offset}&$limit={$limit}&name={name}&user_id={user_id}',
                ver: 'v0.93',
                host: getCurrentUC().host,
                vars: {
                    v_org_id: vOrgId,
                    v_org_id: orgId,
                    node_id: 0,
                    $offset: 0,
                    $limit: 10,
                    user_id: userId,
                    name: query
                },
                module: 'UC'
            });
        } else {
            return new DispatchUtil().dispatch({
                protocol: 'https',
                api: '/organizations/{org_id}/orgnodes/{node_id}/users/actions/search?$offset={$offset}&$limit={$limit}&name={name}',
                ver: 'v0.93',
                host: getCurrentUC().host,
                vars: {
                    org_id: orgId,
                    node_id: 0,
                    $offset: 0,
                    $limit: 10,
                    name: query
                },
                module: 'UC'
            });
        }
    }

    /**
     * 获得格式化后的用户信息
     * @param uid
     * @returns {Promise.<TResult>}
     */
    getFormatUserInfo(uid) {
        return this.getUserInfo(uid).then(user => {
            user.label = this._translateUser(user).label;
            return user;
        }).catch(e => {
            return null;
        });
    }

    /**
     * 重新组装user，根据user_id获得real_name(user_id)
     *
     * @param data 通常是来自服务器的数据, { items: [数据1, ……] }
     * @param userIdFileName 对象中存储用户id的key
     * @returns {Promise.<TResult>}
     */
    setUserInfo(data, userIdFileName) {
        let self = this;
        let _all = data.items.map(item => {
            return function () {
                function _getUserInfo(item) {
                    let userIds = item[userIdFileName] && item[userIdFileName].toString().split(',') || '';
                    return self.getUserInfoList(userIds).then(users => {
                        users.forEach((user, index) => {
                            if (user instanceof Object) {
                                users[index] = self._translateUser(user).label;
                            }
                        });
                        item.user = users.toString();
                        return item
                    })
                }

                return _getUserInfo(item)
            };
        });
        return runInSequence(_all).then(res => {
            return {
                items: res,
                count: data.count
            }
        })
    }

    /**
     * 替换掉用户的信息。将“用户id”替换成“用户名(用户ID)”格式
     * @notice 和 setUserInfo 不同，replaceUserInfo 会直接替换到对象中存储用户id的value
     *          这个接口通常被用在报表中
     * @see UserUtil:setUserInfo
     */
    replaceUserInfo(data, userIdFileName) {
        let self = this;
        let items = data.items;
        let _all = items.map(item => () => {
            return (item => {

                let userIds = item[userIdFileName] && item[userIdFileName].toString().split(',') || '';
                if (!userIds) {
                    item.user = userIds.toString();
                    return Promise.resolve(item);
                }
                return self.getUserInfoList(userIds).then(users => {
                    users.forEach((user, index) => {
                        if (user instanceof Object) {
                            users[index] = self._translateUser(user).label;
                        }
                    });
                    item[userIdFileName] = users.toString();
                    return item
                })
            })(item)
        });
        return runInSequence(_all).then(res => {
            return Object.assign({}, data, {items: res || []});
        })
    }

    replaceUserInfos(item, userIdFileName) {
        let self = this;
        let userIds = item[userIdFileName] && item[userIdFileName].toString().split(',') || '';
        if (!userIds) {
            item.user = userIds.toString();
            return Promise.resolve(item);
        }
        return self.getUserInfoList(userIds).then(users => {
            users.forEach((user, index) => {
                if (user instanceof Object) {
                    users[index] = self._translateUser(user).label;
                }
            });
            item[userIdFileName] = users.toString();
            return item
        })
    }

    /**
     * 翻译user
     * @param user
     * @returns {{nick_name: *, user_name: *}}
     * @private
     */
    _translateUser(user) {
        let data = {
            'user_id': user['user_id'],
            'nick_name': user['nick_name'],
            'user_name': user['user_name']
        }
        let oe = user['org_exinfo'];
        if (oe) {
            if (oe['real_name']) {
                data['org.real_name'] = oe['real_name']
            }
            if (oe['org_user_code']) {
                data['org.org_user_code'] = oe['org_user_code']
            }
        }
        data.label = this.getUserLabel(data);
        return data;
    }

    /**
     * 获得用户的label
     * @param user
     * @returns {string}
     * @private
     */
    getUserLabel(user) {

        let name = (user['org.real_name'] || user['nick_name']);
        let id = (user['user_name'] ? user['user_name'].replace(/@.+$/, '') : user['org.org_user_code']);
        if (id) {
            return name + ' (' + id + ')';
        } else {
            return name;
        }
    }

    /**
     * 自动替换用户信息
     * @param response
     * @private
     */
    async autoReplaceUserInfo(response) {
        let fields = response.fields;
        for (let field of fields) {
            if (field.type === 'uid') {
                await this.replaceUserInfo(response, field.name);
            }
        }
        return response;
    }


}

export default UserUtil;
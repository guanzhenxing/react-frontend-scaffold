/**
 * Created by guanzhenxing on 2016-12-22.
 */


class LocalStorageUtil {


    /**
     * 获得用户信息
     * @returns {{}}
     */
    getUserInfo() {
        let auth_auth = localStorage['AUTH-AUTH'];
        if (!auth_auth) {
            return {};
        }
        let userInfo = JSON.parse(auth_auth);
        return userInfo.value;
    }

    /**
     * 获得tokens
     * @returns {{}}
     */
    getTokens() {
        let auth_tokens = localStorage['AUTH-TOKENS'];
        if (!auth_tokens) {
            return {};
        }
        let tokens = JSON.parse(auth_tokens);
        return tokens.value;
    }


    /**
     * 删除
     */
    delete() {
        delete localStorage['AUTH-AUTH'];
        delete localStorage['AUTH-TOKENS'];
    }

    /**
     * 设置表格每页大小
     * @param value
     */
    setPageSize(value) {
        localStorage.pageSize = value;
    }

    /**
     * 获得表格每页大小
     * @param dictName
     */
    getPageSize() {
        return Number(localStorage.pageSize) || 20;
    }


}
export default LocalStorageUtil;
/**
 * Created by guanzhenxing on 2017/3/21.
 */

import {encryptPassword} from '../utils/nd/password-util';
import {getCurrentUC} from  '../utils/config-util';
import {request, doGet} from "../utils/fetch-util";
import BaseRepository from './BaseRepository';
export default class AuthRepository extends BaseRepository {


    getToken(username, password) {
        let user = {
            login_name: username,
            password: encryptPassword(password)
        };
        let url = `${getCurrentUC().url}/tokens`;
        return request(url, user, 'POST', null, false);
    }

    getUserInfo(tokens) {
        let userId = tokens['user_id'];
        let url = `${getCurrentUC().url}/users/${userId}`;
        return doGet(url);
    }


}
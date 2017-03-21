/**
 * Created by guanzhenxing on 2017-03-20.
 */

import {getCurrentHost} from './configUtil';
import DispatchUtil from './dispatchUtil';

export function searchDepartment(value, level) {
    let dispatchParam = {
        protocol: 'http',
        api: '/departments?levels={levels}&name={name}',
        ver: 'v0.1',
        host: getCurrentHost().target,
        vars: {"name": value, "levels": level},
        module: "ndproject"
    }
    return new DispatchUtil().dispatch(dispatchParam).catch(err => {
        return null;
    });

}
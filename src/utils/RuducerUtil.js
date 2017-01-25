/**
 * reducer工具类
 * Created by guanzhenxing on 2017-01-25.
 */

class ReducerUtil {

    /**
     * 更新对象
     * @param oldObject 旧的对象
     * @param newValues 新的对象
     * @returns {*} 合并以后的对象
     */
    static updateObject(oldObject, newValues) {
        return Object.assign({}, oldObject, newValues);
    }

    /**
     * 更新数组中的对象
     * @param array 要更新的数组
     * @param newValues 新的值
     * @param compareField 比对字段
     */
    static updateItemInArray(array, newValues, compareField) {
        const updatedItems = array.map(item => {
            if (item[compareField] !== newValues[compareField]) {
                return item;
            }
            return this.updateObject(item, newValues);
        });
        return updatedItems;
    }

    /**
     * 给数组添加一个对象
     * @param array
     * @param item
     * @returns {Array|*|string|Array.<T>}
     */
    static addItemToArray(array, item) {
        return array.concat(item);
    }

    /**
     * 删除某个元素
     * @param array
     * @param index
     * @returns {Array}
     */
    static removeItemFromArray(array, index) {
        let _array = Array.from(array);
        _array.splice(index, 1);
        return _array;
    }

}
export default ReducerUtil


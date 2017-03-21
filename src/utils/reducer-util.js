/**
 * reducer工具
 * Created by guanzhenxing on 2017-01-20.
 */

/**
 * 更新对象
 * @param oldObject 旧的对象
 * @param newValues 新的对象
 * @returns {*} 合并以后的对象
 */
export function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

/**
 * 更新数组中的对象
 * @param array
 * @param newValues
 * @param compareField
 * @param updateItemCallback
 * @returns {Array}
 */
export function updateItemInArray(array, newValues, compareField) {
    const updatedItems = array.map(item => {
        if (item[compareField] !== newValues[compareField]) {
            return item;
        }
        return updateObject(item, newValues);
    });
    return updatedItems;
}

/**
 * 给数组添加一个对象
 * @param array
 * @param item
 * @returns {*|Array|Array.<T>|string|Observable|WordArray}
 */
export function addItemToArray(array, item) {
    return array.concat(item);
}

/**
 * 删除某个元素
 * @param array
 * @param index
 * @returns {Array.<*>}
 */
export function removeItemFromArray(array, index) {
    let _array = Array.from(array);
    _array.splice(index, 1);
    return _array;
}


/**
 * 批量删除元素
 * @param array
 * @param indexs
 * @returns {Array.<*>}
 */
export function removeItemsFromArray(array, selectedsIndex) {
    let _array = Array.from(array);
    selectedsIndex.map(index =>{
        _array.splice(index, 1);
    })
    return _array;
}

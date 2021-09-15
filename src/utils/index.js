export const isFalsy = val => val === 0 ? false : !val
// 在一个函数里，改变传入的对象本身的不好的
export const cleanObject = (obj) => {
    let result = {...obj}
    Object.keys(result).forEach(k => {
        const val = result[k]
        if (isFalsy(val)) {
            delete result[k]
        }
    })
    return result
}

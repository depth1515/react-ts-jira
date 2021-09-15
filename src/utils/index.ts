import {useEffect, useState} from "react";

/**
 * 0 是有效的值 排除0
 * @param val
 * @returns {boolean|boolean}
 */
export const isFalsy = (val: unknown) => val === 0 ? false : !val

// 在一个函数里，不应该改变传入的对象本身，而是拷贝一份返回正确的值
export const cleanObject = (obj: object) => {
    let result = {...obj}
    Object.keys(result).forEach(k => {
        // @ts-ignore
        const val = result[k]
        if (isFalsy(val)) {
            // @ts-ignore
            delete result[k]
        }
    })
    return result
}

export const useMount = (callback : () => void) => {
    useEffect(() => {
        callback();
    // eslint-disable-next-line
    }, []);
}


// 使用泛型规范类型
export const useDebounce = (val: unknown, delay?: number): any => {
    const [debouncedValue, setDebouncedValue] = useState(val)
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timer = setTimeout(() => {
            setDebouncedValue(val)
        }, delay)
        // 每次在上一个useEffect处理以后执行
        return () => clearTimeout(timer)
    }, [val, delay]);
    return debouncedValue
}

import qs from "qs"
import {logout} from "../auth-provider";
import {useAuth} from "../context/auth-context";

export const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    data?: object;
    token?: string;
}

//? axios 和 fetch 的表现不一样，axios可以直接在返回状态不为 2xx, 3xx 的时候抛出异常

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await logout()
                window.location.reload()
                return Promise.reject({
                    message: '请重新登录'
                })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

// js 的 typeof 是在ruantime的时候运行的。
// return typeof 1 === 'number


export const useHttp = () => {
    const {user} = useAuth()
    // return ([endpoint, config] : [string, Config]) => http(endpoint, {...config, token: user?.token})

    // TS 中的 typeof 是在静态环境运行的
    // TODO  TS Utility Types
    // Utility Types 的用法： 用泛型传入其他类型， 用Utility type对这个类型进行某种操作
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}

// 联合类型
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 123131

let jackFavoriteNumber

// 类型别名  这种情况下 interface没法替代type
type FavoriteNumber = string | number
let roseFavoriteNumber: FavoriteNumber = '6'

// interface 和 类型别名 区别 定义联合类型 交叉类型

// interface 没法实现 Utility type

type Person = {
    name: string,
    age: number
}

// const xiaoMing: Person = { name: 'xiaoming' }
const xiaoMing: Partial<Person> = {
    name: 'xiaoMing'
}

// 有 age 没 name
const shenmi1: Omit<Person, 'name'> = {
    age: 11
}

const shenmi2: Omit<Person, 'name' | 'age'> = {
    age: 11
}

// Partial 的实现
type Partial<T> = {
    [P in keyof T]?: T[P]
};

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

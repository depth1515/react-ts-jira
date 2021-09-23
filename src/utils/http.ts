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

export const useHttp = () => {
    const {user} = useAuth()
    // return ([endpoint, config] : [string, Config]) => http(endpoint, {...config, token: user?.token})

    // TODO TS操作符
    return (...[endpoint, config] : Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}

import React from 'react'
import {SearchPanel} from "./search";
import {List} from "./list";
import {useState, useEffect} from "react";
import './index.css'
import {cleanObject} from "../../utils";
import qs from 'qs'
// 自动化切换环境变量
const apiUrl = process.env.REACT_APP_API_URL

export const PersonsListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const [users, setUsers] = useState([])

    const [list, setList] = useState([])

    useEffect(() => {
        // qs.stringify 转object => key=val&key=val
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
            if (res.ok) {
                setList(await res.json())
            }
        })
    }, [param]);

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if (res.ok) {
                setUsers(await res.json())
            }
        })
    }, []);


    return <div className={"container"}>
        <SearchPanel users={users} setUsers={setUsers} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}

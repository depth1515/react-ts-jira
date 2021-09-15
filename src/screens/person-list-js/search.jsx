import React from 'react'

export const SearchPanel = ({param, setParam, users, setUsers}) => {

    return <form>
        <div>
            <input type="text" value={param.name} onChange={ e => setParam({
                ...param,
                name: e.target.value
            })}/>
            <select value={param.personId} onChange={ e => setParam({
                ...param,
                personId: e.target.value
            }) } name="" id="">
                <option value="">负责人</option>
                {
                    users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)
                }
            </select>
        </div>
    </form>
}

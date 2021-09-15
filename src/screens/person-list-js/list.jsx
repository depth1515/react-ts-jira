import React from 'react'
export const List = ({list, users}) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(p => <tr key={p.id}>
                    <td>{p.name}</td>
                    {/* undefined.name */}
                    <td>{users.find(u => u.id === p.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}

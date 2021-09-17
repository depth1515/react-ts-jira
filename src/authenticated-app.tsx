import React from "react";

import {PersonsListScreen} from "./screens/person-list-ts";
import {useAuth} from "./context/auth-context";

export const AuthenticateApp = () => {
    const { logout } = useAuth()
    return <>
        <button onClick={logout}>登出</button>
        <PersonsListScreen/>
    </>
}

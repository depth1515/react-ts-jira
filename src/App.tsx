import React from "react";
import "App.css";
import { PersonsListScreen } from "./screens/person-list-ts";
import { LoginScreen } from "./screens/login";
import { useAuth } from "./context/auth-context";
import { UnAuthenticatedApp } from "./unauthemticated-app";
import { AuthenticateApp } from "./authenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/*<PersonsListScreen/>*/}
      {/*  <LoginScreen/>*/}
      {user ? <AuthenticateApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;

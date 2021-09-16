import React from 'react';
import 'App.css';
import {PersonsListScreen} from "./screens/person-list-ts";
import {LoginScreen} from "./screens/login";

function App() {
  return (
    <div className="App">
      {/*<PersonsListScreen/>*/}
        <LoginScreen/>
    </div>
  );
}

export default App;

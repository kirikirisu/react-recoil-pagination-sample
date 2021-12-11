import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Users } from "./User";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Users />
      </RecoilRoot>
    </div>
  );
}

export default App;

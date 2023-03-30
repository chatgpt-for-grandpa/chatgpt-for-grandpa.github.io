import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Chat from "./chat";

function App() {
  return (
    <div className="App container-md">
      <h1>聊天机器人</h1>
      <Chat />
    </div>
  );
}

export default App;

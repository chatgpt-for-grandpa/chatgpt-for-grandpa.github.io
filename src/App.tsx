import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import ProjectIntro from "./project_info";
import Chat from "./chat";

function App() {
  return (
    <Container fluid="md" className="App pt-4">
      <h1>聊天机器人</h1>
      <ProjectIntro />
      <Chat />
    </Container>
  );
}

export default App;

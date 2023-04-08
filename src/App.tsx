import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.scss";
import ProjectIntro from "./project_info";
import Tabs from "./tabs";

function App() {
  const [fontSize, setFontSize] = useState(1);
  const fontSizeClasses = ["font-sm", "", "font-lg", "font-xl"];
  const [isSwitching, setIsSwitching] = useState(false);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  return (
    <div className={`App${isSwitching ? " other-ui" : ""}`}>
      <Nav
        variant="tabs"
        defaultActiveKey="#"
        className="my-2"
        onSelect={(ek) => setIsSwitching(ek !== "#")}
      >
        <Nav.Item>
          <Nav.Link href="https://www.13042332817.top/chat-student">
            暗黑界面
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://www.13042332817.top/chat-main">
            成年友好界面
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#">青春界面</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container fluid="md" className={fontSizeClasses[fontSize]}>
        <h1>聊天机器人</h1>
        <ProjectIntro />
        <Row>
          <Col xs={12} md={2}>
            <Form.Label style={{ height: 30 }}>字体大小：</Form.Label>
          </Col>
          <Col xs={12} md={4}>
            <Form.Range
              min={0}
              max={3}
              step={1}
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </Col>
        </Row>
        <Tabs />
      </Container>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import ProjectIntro from "./project_info";
import Tabs from "./tabs";

function App() {
  const [fontSize, setFontSize] = useState(1);
  const fontSizeClasses = ["font-sm", "", "font-lg", "font-xl"];

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  return (
    <Container fluid="md" className={`App pt-4 ${fontSizeClasses[fontSize]}`}>
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
  );
}

export default App;

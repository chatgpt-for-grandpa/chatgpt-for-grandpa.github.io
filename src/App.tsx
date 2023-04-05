import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import ProjectIntro from "./project_info";
import Tabs from "./tabs";

const MAIN_ADDRESS: string = process.env.REACT_APP_MAIN_ADDRESS || "";

const NOT_MAIN_ADDRESS: boolean =
  !!MAIN_ADDRESS && MAIN_ADDRESS !== window.location.origin;

const REDIRECT_FROM: string | null = new URLSearchParams(
  window.location.search
).get("redirect_from");

function App() {
  const [fontSize, setFontSize] = useState(1);
  const fontSizeClasses = ["font-sm", "", "font-lg", "font-xl"];
  const [showAlert, setShowAlert] = useState(true);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  return (
    <>
      {showAlert && (
        <>
          {NOT_MAIN_ADDRESS && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              最新地址为
              <Alert.Link href={MAIN_ADDRESS}>{MAIN_ADDRESS}</Alert.Link>
              ，当前地址可能不再更新。
            </Alert>
          )}
          {REDIRECT_FROM && (
            <Alert
              variant="warning"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              本项目地址变更为<b>{MAIN_ADDRESS}</b>
              ，现已自动跳转到新地址。可返回原地址
              <Alert.Link href={`${REDIRECT_FROM}?no_redirect=1`}>
                {REDIRECT_FROM}
              </Alert.Link>
              查看历史对话。欢迎分享新地址。
            </Alert>
          )}
        </>
      )}
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
    </>
  );
}

export default App;

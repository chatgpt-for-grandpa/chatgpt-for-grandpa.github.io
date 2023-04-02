import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Chat from "./chat";
import Draw from "./draw";

function Tabs() {
  const [active, setActive] = useState("chat");

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) setActive(eventKey);
  };
  return (
    <>
      <Nav variant="tabs" activeKey={active} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="chat">对话</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="draw">画图</Nav.Link>
        </Nav.Item>
      </Nav>

      {active === "chat" && <Chat />}
      {active === "draw" && <Draw />}
    </>
  );
}

export default Tabs;

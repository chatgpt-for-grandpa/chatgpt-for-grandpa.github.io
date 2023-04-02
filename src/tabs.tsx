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

      <div hidden={active !== "chat"}>
        <Chat />
      </div>
      <div hidden={active !== "draw"}>
        <Draw />
      </div>
    </>
  );
}

export default Tabs;

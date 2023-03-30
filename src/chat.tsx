import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./chat.scss";

interface Message {
  role: string;
  content: string;
  uuid: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const history = JSON.parse(localStorage.chat_history || "[]");
    setMessages(history);
  }, []);

  const saveHistory = (ms: Message[]) => {
    localStorage.chat_history = JSON.stringify(ms);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input) {
      return;
    }
    const newMessage: Message = {
      role: "user",
      content: input,
      uuid: uuidv4(),
    };
    let currMessages = [...messages, newMessage];
    setMessages(currMessages);
    setInput("");

    try {
      const response = await fetch("https://www.13042332817.top/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const answer = await response.text();
      const botResponse: Message = {
        role: "assistant",
        content: answer,
        uuid: uuidv4(),
      };

      currMessages = [...currMessages, botResponse];
      setMessages(currMessages);
      saveHistory(currMessages);
    } catch (error) {
      setErrorMessage(`出错了: ${error}`);
      setMessages(messages);
      setInput(input);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message) => {
          return (
            <div className="message-wrapper d-flex" key={message.uuid}>
              {message.role === "user" && <div className="spacer" />}
              <div
                className={`message message__${message.role} border rounded my-2 p-2`}
              >
                {message.content}
              </div>
              {message.role !== "user" && <div className="spacer" />}
            </div>
          );
        })}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="chat-form d-flex align-items-end my-3">
        <div className="ms-4 flex-grow-1">
          <textarea
            className="form-control"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={5}
            placeholder="输入消息，可使用ctrl+回车发送"
          />
        </div>
        <button
          type="button"
          className="btn btn-success send-button"
          onClick={handleSubmit}
          disabled={!input}
        >
          发送
        </button>
      </div>
    </div>
  );
}

export default Chat;

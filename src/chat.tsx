import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { v4 as uuidv4 } from "uuid";
import TextWithCode from "./text_with_code";
import "./chat.scss";
import { BotSelfIntro, ExampleHistory } from "./consts";

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
    const history = JSON.parse(localStorage.chat_history || ExampleHistory);
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
    const botMessage = {
      role: "assistant",
      content: "",
      uuid: uuidv4(),
    };

    setMessages([...messages, newMessage, botMessage]);
    setInput("");
    setErrorMessage("");

    try {
      const response = await fetch("https://www.13042332817.top/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: [...messages, newMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let result = null;
      do {
        // eslint-disable-next-line no-await-in-loop
        result = await reader.read();
        const partText = decoder.decode(result.value);
        botMessage.content += partText;
        setMessages([...messages, newMessage, botMessage]);
      } while (result && !result.done);

      saveHistory([...messages, newMessage, botMessage]);
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
      <div className="message p-3 mb-4 border">
        <p>{BotSelfIntro}</p>
      </div>
      <div className="messages">
        {messages.map((message) => {
          return (
            <div
              className={`message message__${message.role} border rounded my-3 p-2`}
              key={message.uuid}
            >
              {message.content ? (
                <TextWithCode text={message.content} />
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <div className="error-message text-danger text-center">
          {errorMessage}
        </div>
      )}
      <div className="chat-form d-flex align-items-end py-3">
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
